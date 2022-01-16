# syntax=docker/dockerfile:1
FROM node:latest as base

WORKDIR /home/node/app
COPY ./server/package*.json ./
RUN npm i
COPY ./server .

FROM base as production
ENV NODE_PATH=./server
RUN npm run build
CMD ["npm", "start"]
