#!/bin/sh

# Fail on errors
set -e

# Parse the input list of environment variables
echo "Parsing environment variables list: $INPUT_ENV_VARS"

DOCKER_BUILD_ARGS=""
for var in $(echo "$INPUT_ENV_VARS" | tr "," "\n"); do
    # Extract variable name and value from system environment
    value=$(printenv "$var")
    if [ -z "$value" ]; then
        echo "Warning: Environment variable $var is not set"
    else
        # Append build argument to the docker build command
        DOCKER_BUILD_ARGS="$DOCKER_BUILD_ARGS --build-arg $var=$value"
        echo "Added build argument: --build-arg $var=$value"
    fi
done

# Perform docker buildx build with the build arguments
echo "Running docker buildx build with arguments: $DOCKER_BUILD_ARGS"

docker buildx build --platform linux/amd64 -t "$FINAL_IMAGE_URL" -f ./Dockerfile "$DOCKER_BUILD_ARGS" --push .

echo "Docker build completed and image pushed."