#!/usr/bin/env bash
# Airomeda VPS bootstrap — run ONCE on a fresh Ubuntu 22.04+ Hostinger KVM as root.
# Usage:  curl -fsSL https://example/bootstrap-vps.sh | bash -s -- <DOMAIN> <CI_PUBLIC_KEY>
# Or paste the whole file then run:  bash bootstrap-vps.sh airomeda.com "ssh-ed25519 AAAA... github-actions-airomeda-deploy"

set -euo pipefail

DOMAIN="${1:?Domain required (e.g. airomeda.com)}"
CI_PUBKEY="${2:?CI public key required}"

echo "==> Bootstrapping Airomeda VPS for ${DOMAIN}"
echo "==> CI public key fingerprint:"
echo "${CI_PUBKEY}" | head -c 80; echo "..."

# 1. System packages -----------------------------------------------------------
echo "==> Updating apt and installing base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git nginx ufw rsync ca-certificates gnupg

# 2. Node.js 24 (LTS) ----------------------------------------------------------
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v24* ]]; then
  echo "==> Installing Node.js 24 via NodeSource"
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -y nodejs
fi
echo "==> Node $(node -v), npm $(npm -v)"

# 3. PM2 -----------------------------------------------------------------------
if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing PM2"
  npm install -g pm2
fi

# 4. Deploy user + directory layout -------------------------------------------
if ! id -u deploy >/dev/null 2>&1; then
  echo "==> Creating 'deploy' user"
  useradd -m -s /bin/bash deploy
fi

mkdir -p /var/www/airomeda/{releases,shared}
mkdir -p /var/log/pm2
chown -R deploy:deploy /var/www/airomeda /var/log/pm2

# 5. Add CI public key to deploy user -----------------------------------------
echo "==> Installing CI public key for 'deploy' user"
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
if ! grep -qF "${CI_PUBKEY}" /home/deploy/.ssh/authorized_keys; then
  echo "${CI_PUBKEY}" >> /home/deploy/.ssh/authorized_keys
fi

# 6. Sudoers rule so 'deploy' can reload nginx --------------------------------
cat >/etc/sudoers.d/deploy-nginx <<'SUDO'
deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -s reload, /bin/systemctl reload nginx
SUDO
chmod 440 /etc/sudoers.d/deploy-nginx

# 7. PM2 startup hook for deploy user ------------------------------------------
echo "==> Configuring PM2 to start on boot for 'deploy' user"
sudo -u deploy bash -c 'pm2 startup systemd -u deploy --hp /home/deploy 2>&1 | tail -1' \
  | grep -E '^sudo' | bash || true

# 8. UFW firewall --------------------------------------------------------------
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 9. nginx site ----------------------------------------------------------------
echo "==> Writing nginx config for ${DOMAIN}"
cat >/etc/nginx/sites-available/airomeda <<NGINX
upstream airomeda_app {
    server 127.0.0.1:3010;
    keepalive 16;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ { root /var/www/letsencrypt; }
    location / {
        proxy_pass http://airomeda_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
    }
    client_max_body_size 25M;
}
NGINX

ln -sf /etc/nginx/sites-available/airomeda /etc/nginx/sites-enabled/airomeda
rm -f /etc/nginx/sites-enabled/default
mkdir -p /var/www/letsencrypt
nginx -t
systemctl reload nginx

# 10. Let's Encrypt SSL --------------------------------------------------------
echo "==> Installing certbot and provisioning SSL for ${DOMAIN}"
apt-get install -y certbot python3-certbot-nginx
certbot --nginx --non-interactive --agree-tos -m "admin@${DOMAIN}" \
  -d "${DOMAIN}" -d "www.${DOMAIN}" || \
  echo "WARNING: certbot failed — likely DNS not pointing at this server yet. Re-run: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"

# 11. Placeholder .env.production ---------------------------------------------
if [ ! -f /var/www/airomeda/shared/.env.production ]; then
  cat >/var/www/airomeda/shared/.env.production <<ENV
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
ENV
  chown deploy:deploy /var/www/airomeda/shared/.env.production
  chmod 600 /var/www/airomeda/shared/.env.production
fi

echo ""
echo "============================================================"
echo "  ✅ Airomeda VPS bootstrap complete"
echo "============================================================"
echo "  Domain:        https://${DOMAIN}"
echo "  Deploy user:   deploy"
echo "  App dir:       /var/www/airomeda"
echo "  PM2 logs:      /var/log/pm2"
echo "  Env file:      /var/www/airomeda/shared/.env.production"
echo ""
echo "  Next: trigger your first deploy from GitHub Actions."
echo "============================================================"
