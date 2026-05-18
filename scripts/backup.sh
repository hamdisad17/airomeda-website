#!/usr/bin/env bash
# Airomeda VPS backup script.
# Snapshots the files PM2 / nginx / SQLite need to restore service:
#   /var/www/airomeda/shared          (env + leads.db + any uploads)
#   /etc/nginx/sites-available/airomeda
#   /etc/letsencrypt/live/airomeda.com (cert metadata only — keys regenerable)
#
# Output: /var/backups/airomeda/airomeda-YYYY-MM-DD-HHMMSS.tar.gz
# Optional upload to S3 / Cloudflare R2 when AWS_* envs are set.
#
# Recommended crontab (run as root or via sudo):
#   0 3 * * 1  /var/www/airomeda/current/scripts/backup.sh >/var/log/airomeda-backup.log 2>&1
#
# Restore: see deploy/RESTORE.md

set -euo pipefail

BACKUP_DIR=${BACKUP_DIR:-/var/backups/airomeda}
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}
STAMP=$(date -u +%Y-%m-%d-%H%M%S)
ARCHIVE="${BACKUP_DIR}/airomeda-${STAMP}.tar.gz"

mkdir -p "${BACKUP_DIR}"

# Build the archive. --ignore-failed-read keeps the run going if a path
# is missing on this host (e.g. nginx config managed elsewhere).
tar --ignore-failed-read -czf "${ARCHIVE}" \
  /var/www/airomeda/shared \
  /etc/nginx/sites-available/airomeda \
  /etc/letsencrypt/live/airomeda.com 2>/dev/null || true

chmod 600 "${ARCHIVE}"
echo "✓ local backup: ${ARCHIVE} ($(du -h "${ARCHIVE}" | cut -f1))"

# Optional remote upload — only when S3 envs are present.
if [[ -n "${AWS_ACCESS_KEY_ID:-}" && -n "${AWS_SECRET_ACCESS_KEY:-}" && -n "${BACKUP_S3_BUCKET:-}" ]]; then
  if command -v aws >/dev/null 2>&1; then
    aws s3 cp "${ARCHIVE}" "s3://${BACKUP_S3_BUCKET}/$(basename "${ARCHIVE}")" \
      ${BACKUP_S3_ENDPOINT:+--endpoint-url "${BACKUP_S3_ENDPOINT}"}
    echo "✓ remote upload: s3://${BACKUP_S3_BUCKET}/$(basename "${ARCHIVE}")"
  else
    echo "⚠ aws CLI not installed — skipping remote upload"
  fi
fi

# Prune local archives older than retention window.
find "${BACKUP_DIR}" -name 'airomeda-*.tar.gz' -mtime "+${RETENTION_DAYS}" -delete
echo "✓ pruned local archives older than ${RETENTION_DAYS} days"
