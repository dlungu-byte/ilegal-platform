#!/usr/bin/env bash
set -euo pipefail

cd ~/ilegal-platform

# variabile cu fallback
export DOMAIN_DOCS="${DOMAIN_DOCS:-docs.ilegal.ro}"
export WEB_IMAGE="${WEB_IMAGE:-ghcr.io/dlungu-byte/ilegal-platform-web:latest}"

# login la GHCR doar dacă avem credențiale (pentru pachete private)
if [[ -n "${GHCR_USER:-}" && -n "${GHCR_TOKEN:-}" ]]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
fi

# trage imaginea 'web' și pornește stack-ul cu override-ul de prod
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull web
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# afișează stările + health
docker compose ps
