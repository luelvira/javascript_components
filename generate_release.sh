#!/usr/bin/env bash

# This script generates a release of the current project.
# It will create a new tag and push it to the remote repository.
# It will also create a new release on GitHub.
# The script will fail if the current branch is not master or if the working directory is not clean.
# The script will also fail if the tag already exists.
# The script will also fail if the release already exists.

# Check if the current branch is master
if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
    echo "The current branch is not master."
    exit 1
fi

# Check if the working directory is clean
if ! git diff-index --quiet HEAD --; then
    echo "The working directory is not clean."
    exit 1
fi

# Get the version number
# The version number is the last part of the current tag
# If there is no tag, the version number is 0.0.0
# The version number is incremented by 1
# The version number is prefixed with a v

# check if th version is mayor, minor or patch
if [  "$1" == "mayor" ]; then
    POS=1
elif [  "$1" == "minor" ]; then
    POS=2
elif [  "$1" == "patch" ]; then
    POS=3
else
    echo "The version number is not valid."
    exit 1
fi


VERSION=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -z "$VERSION" ]; then
    VERSION="0.0.0"
fi
VERSION=$(echo "$VERSION" | sed 's/^v//')
VERSION=$(echo "$VERSION" | awk -v pos=$POS -F. '{$pos = $pos + 1;} 1' | sed 's/ /./g')
VERSION="V$VERSION"

# Check if the tag already exists
if git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "The tag $VERSION already exists."
    exit 1
fi

# Update the version number in package.json
# The version number is updated in the version field
if type "jq" > /dev/null; then
    jq --arg version "$VERSION" '.version = $version' package.json > package.json.tmp && mv package.json.tmp package.json
else
    echo "jq is not installed."
    exit 1
fi

# Add the changes to git
git add package.json
git commit --amend --no-edit

# Create the tag
git tag "$VERSION"

# Push the tag to the remote repository
git push origin "$VERSION"

# Create the distribution files
rm -rf dist
npm run build
pushd dist
tar -czf jscomponents.$VERSION.tar.gz *.js*
zip -r jscomponents.$VERSION.zip *.js*
popd



