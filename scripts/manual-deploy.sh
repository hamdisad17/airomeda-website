#!/usr/bin/env bash
# Manual deploy from the VPS itself — bypasses GitHub Actions entirely.
# Use this when Actions are billing-blocked or otherwise unavailable.
#
# Run as the deploy user on the VPS (it owns /var/www/airomeda):
#
#   ssh deploy@76.13.42.4
#   bash /var/www/airomeda/current/scripts/manual-deploy.sh
#
# What it does (mirrors .github/workflows/deploy.yml):
#   1. Clone main into a temp build dir
#   2. npm ci + npm run build (Next.js standalone output)
#   3. Stage the standalone bundle in /var/www/airomeda/releases/manual-<ts>
#   4. Swap the 'current' symlink + reload PM2
#   5. Smoke check /api/health
#   6. Rollback to previous release on smoke-check failure
#   7. Prune older manual releases beyond the last 5
#
# Optional env overrides (set inline or in ~/.bashrc):
#   REPO_URL    Defaults to https://github.com/tahariftekin/airomeda-website.git
#   BRANCH      Defaults to main
#   APP_ROOT    Defaults to /var/www/airomeda
#   PUBLIC_HOST Defaults to airomeda.com

set -euo pipefail

# Default to SSH URL — repo is private. If a GitHub deploy key is
# configured (see deploy/SETUP_DEPLOY_KEY.md), this works without
# extra env. For HTTPS+PAT or temporarily-public-repo, override
# with REPO_URL=https://... when invoking the script.
REPO_URL=${REPO_URL:-git@github.com:tahariftekin/airomeda-website.git}
BRANCH=${BRANCH:-main}
APP_ROOT=${APP_ROOT:-/var/www/airomeda}
PUBLIC_HOST=${PUBLIC_HOST:-airomeda.com}

STAMP=$(date -u +%Y%m%d-%H%M%S)
RELEASE_NAME="manual-${STAMP}"
RELEASE_DIR="${APP_ROOT}/releases/${RELEASE_NAME}"
BUILD_DIR="/tmp/airomeda-build-${STAMP}"

# Capture previous release for rollback
PREV_RELEASE=$(readlink "${APP_ROOT}/current" 2>/dev/null || echo none)
echo "≡ previous release: ${PREV_RELEASE}"

cleanup() {
  rm -rf "${BUILD_DIR}"
}
trap cleanup EXIT

echo "≡ cloning ${REPO_URL} (${BRANCH}) into ${BUILD_DIR}"
git clone --depth 1 --branch "${BRANCH}" "${REPO_URL}" "${BUILD_DIR}"
cd "${BUILD_DIR}"

echo "≡ installing deps (npm ci)"
npm ci --no-audit --no-fund

echo "≡ building Next.js (standalone output)"
# Build-time public envs — match deploy.yml
export NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://${PUBLIC_HOST}}
# NEXT_PUBLIC_TURNSTILE_SITE_KEY is read from .env.production via PM2 at runtime,
# but it's also baked into the client bundle at build time — pick it up here:
if [ -f "${APP_ROOT}/shared/.env.production" ]; then
  set -a
  # shellcheck disable=SC1091
  . "${APP_ROOT}/shared/.env.production"
  set +a
fi
npm run build

echo "≡ staging release at ${RELEASE_DIR}"
mkdir -p "${RELEASE_DIR}/.next"
cp -r .next/standalone/. "${RELEASE_DIR}/"
cp -r .next/static "${RELEASE_DIR}/.next/static"
if [ -d public ]; then cp -r public "${RELEASE_DIR}/public"; fi
cp ecosystem.config.cjs "${RELEASE_DIR}/ecosystem.config.cjs"

# Symlink shared .env into the new release (PM2 picks it up via --env-file)
ln -sfn "${APP_ROOT}/shared/.env.production" "${RELEASE_DIR}/.env.production"

echo "≡ activating release"
ln -sfn "${RELEASE_DIR}" "${APP_ROOT}/current"
pm2 reload "${APP_ROOT}/current/ecosystem.config.cjs" --update-env 2>/dev/null \
  || pm2 start "${APP_ROOT}/current/ecosystem.config.cjs"

echo "≡ pruning old releases (keep last 5)"
cd "${APP_ROOT}/releases"
# shellcheck disable=SC2010
ls -1tr | head -n -5 | xargs -r rm -rf

echo "≡ smoke check /api/health"
ok=0
for i in 1 2 3 4 5; do
  status=$(curl -sfL -o /dev/null -w '%{http_code}' "https://${PUBLIC_HOST}/api/health" || echo 000)
  if [ "${status}" = "200" ]; then
    echo "  ✓ healthy (200)"
    ok=1
    break
  fi
  echo "  attempt ${i}: ${status} — retry in 5s"
  sleep 5
done

if [ "${ok}" != "1" ]; then
  echo "✗ smoke check failed"
  if [ "${PREV_RELEASE}" != "none" ] && [ -d "${PREV_RELEASE}" ]; then
    echo "≡ rolling back to ${PREV_RELEASE}"
    ln -sfn "${PREV_RELEASE}" "${APP_ROOT}/current"
    pm2 reload "${APP_ROOT}/current/ecosystem.config.cjs" --update-env
    echo "✗ deploy aborted, rolled back"
    exit 1
  fi
  echo "✗ no previous release to roll back to — manual intervention required"
  exit 1
fi

echo "✓ deploy complete: ${RELEASE_NAME}"
