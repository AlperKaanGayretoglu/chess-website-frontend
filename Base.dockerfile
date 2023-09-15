FROM node:14-alpine

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install
