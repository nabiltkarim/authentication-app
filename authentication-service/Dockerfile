# build development stage
FROM node:16.13.1-buster As development
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --only=development

COPY . ./

RUN npm run build

# production stage
FROM node:16.13.1-buster-slim As production

ENV PATH /app/node_modules/.bin:$PATH
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /app/dist ./dist

ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait ./
RUN chmod +x /app/wait

ENV PORT=3000
ENV JWT_SECRET=
ENV MONGO_URI=

EXPOSE 3000
CMD ["node", "dist/main"]