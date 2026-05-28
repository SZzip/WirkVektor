#!/usr/bin/env bash
# WirkVektor Deployment-Skript
# Baut die Site und spiegelt site/dist/ per SFTP auf das Hetzner Webhosting.
#
# Voraussetzungen lokal:
#   - Node + npm (für den Build)
#   - lftp (brew install lftp / apt install lftp)
#
# Verwendung:
#   1. SFTP-Zugangsdaten in .env.deploy ablegen (siehe .env.deploy.example)
#   2. ./deploy.sh         → Build + Upload
#      ./deploy.sh --dry   → Build + Mirror-Dry-Run (zeigt was übertragen würde)
#      ./deploy.sh --skip-build → nur Upload (dist/ muss existieren)

set -euo pipefail

cd "$(dirname "$0")"

# ---------- Env laden ----------
if [[ ! -f .env.deploy ]]; then
  echo "FEHLER: .env.deploy fehlt." >&2
  echo "       Kopiere .env.deploy.example nach .env.deploy und trage die Werte ein." >&2
  exit 1
fi
# shellcheck disable=SC1091
set -a; source .env.deploy; set +a

: "${SFTP_HOST:?SFTP_HOST nicht gesetzt}"
: "${SFTP_USER:?SFTP_USER nicht gesetzt}"
: "${SFTP_PASS:?SFTP_PASS nicht gesetzt}"
: "${SFTP_REMOTE_DIR:?SFTP_REMOTE_DIR nicht gesetzt}"

DRY=0
SKIP_BUILD=0
for arg in "$@"; do
  case "$arg" in
    --dry|--dry-run) DRY=1 ;;
    --skip-build)    SKIP_BUILD=1 ;;
    *) echo "Unbekanntes Argument: $arg" >&2; exit 2 ;;
  esac
done

# ---------- Build ----------
if [[ $SKIP_BUILD -eq 0 ]]; then
  echo "→ npm ci"
  npm ci --silent
  echo "→ npm run test"
  npm run test --silent
  echo "→ npm run build"
  npm run build
fi

if [[ ! -d dist ]]; then
  echo "FEHLER: dist/ fehlt nach Build." >&2
  exit 1
fi

# Source-Maps nicht hochladen
find dist -name '*.map' -delete

# ---------- Upload ----------
MIRROR_FLAGS="--reverse --delete --verbose --parallel=4 --exclude-glob=*.map"
if [[ $DRY -eq 1 ]]; then
  MIRROR_FLAGS="$MIRROR_FLAGS --dry-run"
  echo "→ DRY-RUN — es wird nichts geschrieben"
fi

echo "→ Spiegele dist/ → sftp://$SFTP_USER@$SFTP_HOST:$SFTP_REMOTE_DIR"

lftp -u "$SFTP_USER","$SFTP_PASS" "sftp://$SFTP_HOST" <<EOF
set sftp:auto-confirm yes
set ssl:verify-certificate yes
set net:max-retries 3
set net:reconnect-interval-base 5
mirror $MIRROR_FLAGS dist/ $SFTP_REMOTE_DIR
bye
EOF

echo "→ Fertig."
if [[ $DRY -eq 0 ]]; then
  echo "  Prüfen: https://wirkvektor.de"
fi
