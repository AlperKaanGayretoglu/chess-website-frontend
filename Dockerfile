FROM registry.gitlab.com/alperkaangayretoglu/chess-website-frontend/base:latest as builder
WORKDIR /usr/local/app

COPY ./ ./

RUN npm run build


FROM node:14-alpine

EXPOSE 3000
WORKDIR /usr/local/app

COPY --from=builder \
    /usr/local/app/out \
    ./out

CMD [ "npm", "start" ]
