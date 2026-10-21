#!/usr/bin/env bash
# Rebuilds the live site from the code already checked out in /var/www/kamglobalai-com.
# Called by GitHub Actions after git reset --hard origin/main. Does not touch backend/.env.
set -euo pipefail

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:${PATH:-}"

cd /var/www/kamglobalai-com

npm install --omit=dev --prefix backend
npm install --prefix frontend
npm run build --prefix frontend

if pm2 describe kamglobal-backend >/dev/null 2>&1; then
  pm2 restart kamglobal-backend --update-env
else
  pm2 start ecosystem.config.cjs --env production
fi
pm2 save
