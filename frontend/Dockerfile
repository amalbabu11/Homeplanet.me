# modified from group FindAHome
FROM node:latest

# creates directory called app
WORKDIR /app

# add node package data from local directory to docker container
COPY package.json /app/
COPY package-lock.json /app/

# similar to npm install, install Nodejs modules that the project needs
RUN npm ci

# there may only be one CMD in a Dockerfile. 
# this sets the entrypoint of the container, 
# and it serves as a default exe for the container
CMD bash
