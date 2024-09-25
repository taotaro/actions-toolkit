#!/bin/bash

# Fail on errors
set -e

# Docker build arguments placeholder
DOCKER_BUILD_ARGS=""

# Find all environment variables starting with CONFIG_MAP_
for var in $(env | grep '^CONFIG_MAP_' | cut -d= -f1); do
    value=$(printenv "$var")
    if [ -n "$value" ]; then
        # Remove the 'CONFIG_MAP_' prefix from the variable name
        stripped_var_name=$(echo "$var" | sed 's/^CONFIG_MAP_//')
        # Append the stripped variable to Docker build arguments
        DOCKER_BUILD_ARGS="$DOCKER_BUILD_ARGS --build-arg $stripped_var_name=$value"
        echo "Added build argument: --build-arg $stripped_var_name=$value"
    fi
done

docker buildx build --platform linux/amd64 $DOCKER_BUILD_ARGS -t "$FINAL_IMAGE_URL" -f "$PROJECT_ROOT_DIR/Dockerfile" --push .

echo "Docker build completed and image pushed."