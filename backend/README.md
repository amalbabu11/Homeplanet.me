# Run Backend

## Run with Native Environment

`make run`.

## Run with Docker

This document will help you to startup a docker image with this backend and run it. Please make sure your current working directory is the `backend`/ right now.

- `make docker` This helps you to construct a docker image.
- `make docker_run` This helps you to run the docker image. It creates a map from the working directory in the image to your current working directory. So please make sure your `pwd` correctly.

## Check in the Browser

Then you can open your browser and enter `127.0.0.1:8000`. The initial page occurs now.
