#!/bin/bash

# Fail on errors
set -e

pwd

# Docker build arguments placeholder
DOCKER_BUILD_ARGS=""

# Find all environment variables starting with CONFIG_MAP_
for var in $(env | grep '^CONFIG_MAP_' | cut -d= -f1); do
    value=$(printenv "$var")
    if [ -n "$value" ]; then
        # Append to Docker build arguments
        DOCKER_BUILD_ARGS="$DOCKER_BUILD_ARGS --build-arg $var=$value"
        echo "Added build argument: --build-arg $var=$value"
    fi
done

echo "docker buildx build --platform linux/amd64 -t $FINAL_IMAGE_URL -f ./Dockerfile$DOCKER_BUILD_ARGS --push ."

# Execute the Docker buildx build command
docker buildx build --platform linux/amd64 -t "$FINAL_IMAGE_URL" -f ./Dockerfile"$DOCKER_BUILD_ARGS" --push .

echo "Docker build completed and image pushed."