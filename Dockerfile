FROM node:20-alpine

LABEL maintainer="Some Dev"

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm i