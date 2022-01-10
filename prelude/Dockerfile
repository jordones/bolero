# syntax=docker/dockerfile:1
FROM node:latest
COPY ./server .
RUN npm install --production
CMD ["npm", "start"]
