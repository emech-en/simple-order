#!/bin/bash

D_IMAGE_NAME=emech/simple-order
COMMIT_SSH=$(echo "$TRAVIS_COMMIT" | cut -c1-7)
TAGS=()

if [[ "$TRAVIS_BRANCH" = "develop" ]]; then
  TAGS+=("$D_IMAGE_NAME:dev-lates $D_IMAGE_NAME:commit-$COMMIT_SSH")
elif [[ "$TRAVIS_BRANCH" = "master" ]]; then
  PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
  TAGS+=("$D_IMAGE_NAME:latest" "$D_IMAGE_NAME:$PACKAGE_VERSION" "$D_IMAGE_NAME:commit-$COMMIT_SSH")
fi

TAGS_ARGS=$(printf -- "-t %s " "${TAGS[@]}")

echo "------------------------------------"
echo "BULDING DOCKER IMAGES: docker build $TAGS_ARGS ."
echo "------------------------------------"
docker build $TAGS_ARGS .
echo ""
echo ""
echo ""
echo "------------------------------------"
echo "SHOWING DOCKER IMAGES: docker images"
echo "------------------------------------"
docker images

for t in "${TAGS[@]}"; do
    docker push "${t}"
done
