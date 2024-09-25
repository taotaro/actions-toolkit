#!/bin/bash

# Fail on errors
set -e

# Docker build arguments placeholder
DOCKER_BUILD_ARGS=""

# Find all environment variables starting with CONFIG_MAP_
for var in $(env | grep '^CONFIG_MAP_' | cut -d= -f1); do
    value=$(printenv "$var")
    if [ -n "$value" ]; then
        # Append to Docker build arguments
        DOCKER_BUILD_ARGS="$DOCKER_BUILD_ARGS --build-arg $var=\"$value\""
        echo "Added build argument: --build-arg $var=$value"
    fi
done

# Execute the Docker buildx build command
docker buildx build --platform linux/amd64 "$DOCKER_BUILD_ARGS" -t "$FINAL_IMAGE_URL" -f "$PROJECT_ROOT_DIR/Dockerfile" --push .

echo "Docker build completed and image pushed."