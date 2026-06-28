#!/bin/bash

VERSION=$npm_config_rollback_version

if [ -z "$VERSION" ]; then
  echo ""
  echo "Usage: npm run rollback --rollback-version=<commit-hash-or-number>"
  echo ""
  echo "  --rollback-version=1        → revert to the most recent previous build"
  echo "  --rollback-version=2        → revert to 2 builds ago"
  echo "  --rollback-version=abc1234  → revert to a specific commit hash"
  echo ""
  echo "Run 'npm run deploy:history' to see available builds."
  exit 1
fi

# If VERSION is a number, resolve it to a commit hash from gh-pages history
if [[ "$VERSION" =~ ^[0-9]+$ ]]; then
  COMMIT=$(git log origin/gh-pages --oneline | sed -n "${VERSION}p" | awk '{print $1}')
  if [ -z "$COMMIT" ]; then
    echo "No build found at position $VERSION. Run 'npm run deploy:history' to see available builds."
    exit 1
  fi
  echo "Rolling back to build #$VERSION (commit: $COMMIT)..."
else
  COMMIT=$VERSION
  echo "Rolling back to commit $COMMIT..."
fi

git push origin "$COMMIT":gh-pages --force

if [ $? -eq 0 ]; then
  echo ""
  echo "Rollback successful! GitHub Pages will update in a few seconds."
else
  echo ""
  echo "Rollback failed. Make sure the commit hash/number is correct."
  exit 1
fi
