# VPS Deploy Key Setup

One-time setup so the VPS can `git clone` this private repo over SSH
when manual-deploy.sh runs. After this, deploys are a single command.

## Steps

```bash
# On the VPS, as the user that runs the deploys (root or deploy):

# 1. Generate an ed25519 keypair just for this repo
ssh-keygen -t ed25519 -f ~/.ssh/airomeda-deploy -N "" -C "vps-deploy"

# 2. Print the public key — copy the full single-line output
cat ~/.ssh/airomeda-deploy.pub

# 3. Add it as a Deploy Key in GitHub
#    https://github.com/tahariftekin/airomeda-website/settings/keys
#    → Add deploy key
#    Title:  VPS-<your-hostname>
#    Key:    (paste the line)
#    ❌ Do NOT check "Allow write access"  — read-only is enough
#    → Add key

# 4. Tell SSH to use this key for github.com
mkdir -p ~/.ssh && chmod 700 ~/.ssh
cat >> ~/.ssh/config <<'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/airomeda-deploy
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config

# 5. Verify
ssh -T git@github.com
# expected: "Hi tahariftekin/airomeda-website! You've successfully
#            authenticated, but GitHub does not provide shell access."
```

## Deploy command (after setup)

```bash
ssh deploy@<vps>
bash /var/www/airomeda/current/scripts/manual-deploy.sh
```

That's it. The script clones via SSH, builds Next.js, stages the
release, swaps the `current` symlink, reloads PM2, smoke-checks
`/api/health`, and auto-rolls-back on failure.

## Rotating the key

If the key is ever compromised:

```bash
# On the VPS:
rm ~/.ssh/airomeda-deploy ~/.ssh/airomeda-deploy.pub
# Remove the config block from ~/.ssh/config

# On GitHub:
#   Settings → Deploy keys → delete the entry

# Then re-run the setup above.
```

## Why not the GitHub Actions key?

The VPS already has a key under `VPS_SSH_PRIVATE_KEY` in GitHub Actions
secrets, but that one points the *other* way — GitHub → VPS. For the
VPS to read from GitHub it needs its own key, which is what this
document sets up.
