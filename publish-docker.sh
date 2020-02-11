#!/bin/bash

echo "\$1 = $1"
if [[ "$1" = "" ]]; then
  echo "EMPTY"
  fi

D_IMAGE_NAME=emech/simple-order
COMMIT_SSH=$(echo "$TRAVIS_COMMIT" | cut -c1-7)
TAGS=

if [ "$1" = "develop" ]; then
  TAGS="-t $D_IMAGE_NAME:dev-lates -t $D_IMAGE_NAME:dev-b$TRAVIS_BUILD_NUMBER-$COMMIT_SSH"
elif [ "$1" = "master" ]; then
  TAGS="-t $D_IMAGE_NAME:lates -t $D_IMAGE_NAME:$COMMIT_SSH"
elif [ "$1" = "" ]; then
  TAGS="-t $D_IMAGE_NAME:$TRAVIS_TAG"
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
