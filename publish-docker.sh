#!/bin/bash

echo ""
echo ""
echo "------------------------------------"
echo "LOGIN TO DOCKER HUB"
echo "------------------------------------"
echo "$DOCKER_PASS" | docker login -u emech --password-stdin || exit 1

D_IMAGE_NAME=emech/simple-order
COMMIT_SSH=$(echo "$TRAVIS_COMMIT" | cut -c1-7)
TAGS=()

if [[ "$TRAVIS_BRANCH" == "develop" ]]; then
  TAGS+=("$D_IMAGE_NAME:dev-lates" "$D_IMAGE_NAME:commit-$COMMIT_SSH")
elif [[ "$TRAVIS_BRANCH" == "master" ]]; then
  PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
  TAGS+=("$D_IMAGE_NAME:latest" "$D_IMAGE_NAME:$PACKAGE_VERSION" "$D_IMAGE_NAME:commit-$COMMIT_SSH")
fi

TAGS_ARGS=$(printf -- "-t %s " "${TAGS[@]}")

echo ""
echo ""
echo "------------------------------------"
echo "BULDING DOCKER IMAGES: docker build $TAGS_ARGS ."
echo "------------------------------------"
# shellcheck disable=SC2086
docker build ${TAGS_ARGS} .

echo ""
echo ""
echo "------------------------------------"
echo "SHOWING DOCKER IMAGES: docker images"
echo "------------------------------------"
docker images

echo ""
echo ""
echo "------------------------------------"
echo "PUSHING DOCKER IMAGES"
echo "------------------------------------"
for t in "${TAGS[@]}"; do
  echo "docker push $t"
  echo "------------------------------------"
  docker push "${t}"
done
