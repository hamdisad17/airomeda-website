# Disaster Recovery — Airomeda VPS

This document covers two recovery levels.

## Level 1 — application crash / bad release

Symptom: `airomeda.com` returns 5xx, `pm2 status` shows `errored`.

```bash
# 1. Check recent PM2 logs
pm2 logs airomeda-website --lines 100

# 2. List available releases
ls -lrt /var/www/airomeda/releases   # newest at bottom

# 3. Roll back to the previous good release
ln -sfn /var/www/airomeda/releases/<sha-N> /var/www/airomeda/current
pm2 reload /var/www/airomeda/current/ecosystem.config.cjs --update-env

# 4. Verify
curl -sI https://airomeda.com/tr | head -3
```

The deploy workflow keeps the last 5 releases, so up to 5 previous builds are recoverable here without touching backups.

---

## Level 2 — VPS lost / re-provisioning from scratch

Symptom: Hostinger snapshot restored from cold, or new VPS, or `/var/www/airomeda` is empty.

### Prerequisites

- Fresh Ubuntu 22.04+ VPS with sudo access
- A recent `airomeda-<date>.tar.gz` archive (from `scripts/backup.sh`) — locally or on S3
- SSH access from the GitHub Actions deploy key

### Steps

```bash
# 1. Run the bootstrap script (installs Node 24, PM2, nginx, certbot)
sudo bash /var/www/airomeda/current/deploy/bootstrap-vps.sh
# ...or, if you don't have the repo yet:
#   curl -sL https://raw.githubusercontent.com/tahariftekin/airomeda-website/main/deploy/bootstrap-vps.sh | sudo bash

# 2. Restore the backup tarball into / — it lays files back into
#    /var/www/airomeda/shared, /etc/nginx/sites-available/airomeda,
#    /etc/letsencrypt/live/airomeda.com
sudo tar -xzf airomeda-YYYY-MM-DD-HHMMSS.tar.gz -C /

# 3. Reload nginx + restart certbot renewal timer
sudo ln -sf /etc/nginx/sites-available/airomeda /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl restart certbot.timer

# 4. Trigger a deploy from GitHub Actions to rebuild /var/www/airomeda/current
#    Go to Actions → "Deploy to Hostinger VPS" → Run workflow → main
#    Or push an empty commit:
#       git commit --allow-empty -m "chore: restore deploy" && git push

# 5. Verify
curl -sI https://airomeda.com/tr | head -3
curl -s https://airomeda.com/api/admin/leads -u "$ADMIN_USER:$ADMIN_PASS" | jq '.total'
```

### Recovery time

End-to-end: roughly 20–30 minutes (bootstrap 10 min, restore 2 min, deploy 5 min, DNS propagation if domain moved).

### What is *not* in the backup

- `/var/www/airomeda/releases/` — bring back via deploy workflow
- `node_modules/` — rebuilt from `package-lock.json`
- TLS private key — certbot re-issues on first run (HTTP-01 challenge over port 80)
- PM2 process list — `pm2 startup` + `pm2 save` after first deploy

---

## Verifying backups work

Once a quarter, take the latest archive to a disposable VM and complete Level 2 against it. Don't trust a backup you haven't restored.

```bash
# On the test VM:
ssh ubuntu@test-vm
sudo tar -xzf airomeda-latest.tar.gz -C /tmp/restore-test
ls -la /tmp/restore-test/var/www/airomeda/shared
sqlite3 /tmp/restore-test/var/www/airomeda/shared/leads.db "SELECT COUNT(*) FROM leads;"
```

If `leads.db` opens and reports a sensible count, the backup is good.
