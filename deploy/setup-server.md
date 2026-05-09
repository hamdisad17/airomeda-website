# Hostinger VPS — first-time server setup

Run these once on a fresh Ubuntu 22.04+ KVM. Adjust paths and domains as needed.

## 1. System packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw
```

## 2. Node.js 24 (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should print v24.x
npm -v
```

## 3. PM2 (process manager)

```bash
sudo npm install -g pm2
pm2 startup systemd   # follow the printed sudo command
```

## 4. Application user + directories

```bash
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /var/www/airomeda/{releases,shared}
sudo mkdir -p /var/log/pm2
sudo chown -R deploy:deploy /var/www/airomeda /var/log/pm2

# Allow `deploy` user to reload nginx without password (optional, useful for CI)
echo "deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -s reload, /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/deploy-nginx
```

## 5. SSH key for `deploy` user (CI/CD)

Add the GitHub Actions deploy key (or your local public key) to `/home/deploy/.ssh/authorized_keys`:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh
echo "ssh-ed25519 AAAA... your-public-key" | sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys
sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
```

## 6. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 7. nginx config

Copy `deploy/nginx.conf.example` from this repo to `/etc/nginx/sites-available/airomeda` on the server, edit the `server_name` and SSL paths, then:

```bash
sudo ln -s /etc/nginx/sites-available/airomeda /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d airomeda.com -d www.airomeda.com
```

`certbot` updates the nginx config in place and sets up auto-renewal (`/etc/cron.d/certbot`).

## 9. First deploy (manual)

From this repo's root, after building locally:

```bash
npm ci
npm run build
rsync -az --delete \
  .next/standalone/ \
  deploy@<VPS_HOST>:/var/www/airomeda/releases/$(date +%Y%m%d%H%M%S)/

# On the server (or via SSH command):
ssh deploy@<VPS_HOST> '
  RELEASE_DIR=$(ls -td /var/www/airomeda/releases/*/ | head -1)
  ln -sfn $RELEASE_DIR /var/www/airomeda/current
  pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
'
```

After the first manual deploy, GitHub Actions handles subsequent deploys automatically — see `.github/workflows/deploy.yml`.

## 10. Environment variables

Place `.env.production` at `/var/www/airomeda/shared/.env.production` on the server. Each release will be symlinked to read from there:

```bash
sudo -u deploy nano /var/www/airomeda/shared/.env.production
```

Required keys (Plan 1):
- `NEXT_PUBLIC_SITE_URL=https://airomeda.com`

Add Plan 3 keys (SMTP / Turnstile / etc.) when those are wired.
