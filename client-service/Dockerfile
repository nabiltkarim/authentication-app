# development stage
FROM node:14-alpine AS builder

WORKDIR /usr/src/app/client-service

COPY package*.json ./

RUN npm install

EXPOSE 8080

ENV REACT_APP_AUTHENTICATION_API=

CMD ["npm", "start"]