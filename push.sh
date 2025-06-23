#!/bin/sh

set -e

VERSION_FILE="version.txt"
VERSION=$(cat "$VERSION_FILE")

# POSIX-compliant version split
IFS='.' read MAJOR MINOR PATCH <<EOF
$VERSION
EOF

bump_patch() {
    NEW_PATCH=$((PATCH + 1))
    echo "$MAJOR.$MINOR.$NEW_PATCH" > "$VERSION_FILE"
    echo "✅ Bumped version to $MAJOR.$MINOR.$NEW_PATCH"
}

if [ $# -eq 0 ]; then
    echo "❌ Please provide a commit message: make push your commit message"
    exit 1
fi

COMMIT_MESSAGE="$*"

git add .
git commit -m "$COMMIT_MESSAGE"

bump_patch

NEW_VERSION=$(cat "$VERSION_FILE")
git tag "v$NEW_VERSION"
git push
git push origin "v$NEW_VERSION"

echo "🚀 Successfully pushed with version $NEW_VERSION"
