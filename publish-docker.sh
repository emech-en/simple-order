#!/bin/bash

D_IMAGE_NAME=emech/simple-order
COMMIT_SSH=$(echo "$TRAVIS_COMMIT" | cut -c1-7)
TAGS=

if [[ "$TRAVIS_BRANCH" = "develop" ]]; then
  TAGS="-t $D_IMAGE_NAME:dev-lates -t $D_IMAGE_NAME:dev-b$TRAVIS_BUILD_NUMBER-$COMMIT_SSH"
elif [[ "$TRAVIS_BRANCH" = "master" ]]; then
  PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
  TAGS="-t $D_IMAGE_NAME:lates -t $D_IMAGE_NAME:$PACKAGE_VERSION"
fi

echo "------------------------------------"
echo "BULDING DOCKER IMAGES: docker build $TAGS ."
echo "------------------------------------"
docker build $TAGS .
echo ""
echo ""
echo ""
echo "------------------------------------"
echo "SHOWING DOCKER IMAGES: docker images"
echo "------------------------------------"
docker images
