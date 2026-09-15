#!/bin/bash
#
# Copies the static export into the document root. Called by .cpanel.yml.
#
# Builds here when the server has Node, and falls back to a build committed to
# the repository when it does not. The build comes first: cPanel keeps the
# checkout between deploys, so a leftover out/ from last time is stale by
# definition and must not be mistaken for a fresh one.
#
# Usage: cpanel-deploy.sh /home/user/public_html

set -euo pipefail

DEPLOYPATH="${1:?Document root missing — pass it as the first argument}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO"

echo "==> Deploying $REPO -> $DEPLOYPATH"

if ! command -v npm >/dev/null 2>&1; then
  # cPanel's "Setup Node.js App" puts node in a virtualenv under ~/nodevenv
  # and keeps it off the deploy shell's PATH; the most recent one is as good
  # a guess as any when several apps exist.
  ACTIVATE="$(ls -1t "$HOME"/nodevenv/*/*/bin/activate 2>/dev/null | head -1 || true)"
  if [ -n "$ACTIVATE" ]; then
    echo "==> Activating Node from $ACTIVATE"
    # shellcheck disable=SC1090
    source "$ACTIVATE"
  fi
fi

if command -v npm >/dev/null 2>&1; then
  echo "==> Building with $(node --version) / npm $(npm --version)"
  rm -rf out
  npm ci --no-audit --no-fund
  npm run build
elif [ -f out/index.html ]; then
  echo "==> No npm here; using the build committed to the repository"
else
  echo "!!! npm is not available on this server and there is no out/ in the repo."
  echo "!!! Either enable Node.js in cPanel, or build on your machine with"
  echo "!!!   npm run build"
  echo "!!! then remove out/ from .gitignore and commit it."
  exit 1
fi

if [ ! -f out/index.html ]; then
  echo "!!! The build produced no out/index.html — nothing to deploy."
  exit 1
fi

mkdir -p "$DEPLOYPATH"

# Hashed asset filenames accumulate forever otherwise. The rest of the document
# root is left alone, so cgi-bin, .well-known and anything else cPanel keeps
# there survives a deploy.
rm -rf "${DEPLOYPATH:?}/_next"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --omit-dir-times --no-perms out/ "$DEPLOYPATH/"
else
  cp -R out/. "$DEPLOYPATH/"
fi

echo "==> Done: $(find "$DEPLOYPATH" -maxdepth 1 -name '*.html' | wc -l) pages at the document root"
