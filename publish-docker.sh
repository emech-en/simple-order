#!/bin/bash

D_IMAGE_NAME=emech/simple-order
COMMIT_SSH=$(echo "$TRAVIS_COMMIT" | cut -c1-7)
TAGS=

if [ "$1" = "develop" ]; then
  TAGS="-t $D_IMAGE_NAME:dev-lates -t $D_IMAGE_NAME:dev-b$TRAVIS_BUILD_NUMBER-$COMMIT_SSH"
fi

if [ "$1" = "master" ]; then
  TAGS="-t $D_IMAGE_NAME:lates -t $D_IMAGE_NAME:$COMMIT_SSH"
fi

if [ "$1" = "tag" ]; then
  TAGS="-t $D_IMAGE_NAME:$TRAVIS_TAG"
fi

docker build $TAGS .
docker images ls
