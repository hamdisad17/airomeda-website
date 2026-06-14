#!/usr/bin/env bash
# Sunucu-içi deploy: public repodan çeker, build eder, release'i etkinleştirir,
# PM2'yi yeniden başlatır. GitHub Actions / firewall / SSH anahtarı GEREKMEZ.
# Hostinger "Browser terminal"de çalıştır:
#   curl -fsSL https://raw.githubusercontent.com/hamdisad17/airomeda-website/main/scripts/server-deploy.sh | sudo bash
set -euo pipefail

APP=/var/www/airomeda
TS=$(date +%Y%m%d%H%M%S)
REL="$APP/releases/${TS}-srv"
BUILD="/tmp/airo-build-${TS}"
OWNER=$(stat -c %U "$APP" 2>/dev/null || echo deploy)

echo "== airomeda sunucu-içi deploy =="
echo "   hedef sahibi: $OWNER | node: $(node -v 2>/dev/null || echo YOK) | npm: $(npm -v 2>/dev/null || echo YOK)"

if ! command -v node >/dev/null; then echo "✗ Sunucuda node yok — durduruldu."; exit 1; fi
if ! command -v git  >/dev/null; then echo "▶ git kuruluyor…"; apt-get update -y >/dev/null && apt-get install -y git >/dev/null; fi

echo "▶ 1/5 Public repo çekiliyor…"
rm -rf "$BUILD"
git clone --depth 1 https://github.com/hamdisad17/airomeda-website.git "$BUILD"
cd "$BUILD"

echo "▶ 2/5 Bağımlılıklar + build (FastPay dahil)…"
export NEXT_PUBLIC_SITE_URL=https://airomeda.com
export NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADMLK5Y7hZdJmlAn
npm ci
npm run build

echo "▶ 3/5 Release hazırlanıyor: $REL"
mkdir -p "$REL/.next"
cp -a .next/standalone/. "$REL"/
cp -a .next/static "$REL/.next/static"
[ -d public ] && cp -a public "$REL/public"
cp -a ecosystem.config.cjs "$REL/ecosystem.config.cjs"
ln -sfn "$APP/shared/.env.production" "$REL/.env.production" || true
chown -R "$OWNER":"$OWNER" "$REL" 2>/dev/null || true

echo "▶ 4/5 current değiştiriliyor + PM2 reload ($OWNER)…"
ln -sfn "$REL" "$APP/current"
chown -h "$OWNER":"$OWNER" "$APP/current" 2>/dev/null || true
sudo -u "$OWNER" bash -lc "pm2 reload '$APP/current/ecosystem.config.cjs' --update-env || pm2 start '$APP/current/ecosystem.config.cjs'" \
  || pm2 reload "$APP/current/ecosystem.config.cjs" --update-env \
  || pm2 start "$APP/current/ecosystem.config.cjs"
# eski release'leri temizle (son 5 kalsın)
( cd "$APP/releases" && ls -1tr | head -n -5 | xargs -r rm -rf ) || true
rm -rf "$BUILD"

echo "▶ 5/5 Sağlık & FastPay kontrolü…"
sleep 4
curl -sf -o /dev/null -w "   /api/health           : %{http_code}\n" https://airomeda.com/api/health || true
curl -sf -o /dev/null -w "   /tr/hizmetler/fastpay : %{http_code}\n" https://airomeda.com/tr/hizmetler/fastpay || true
echo "✅ Deploy tamamlandı — FastPay canlıda!"
