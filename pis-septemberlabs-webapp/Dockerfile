FROM node:14.10-alpine

ENV APP_HOME pis-septemberlabs-webapp
ENV APP_HOME /app/$APP_HOME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json ./
COPY yarn.lock ./
COPY ./src ./src/
COPY ./public ./public/
COPY .env .env
COPY build.sh build.sh

ARG ENV
RUN yarn install
RUN chmod +x build.sh && ./build.sh

EXPOSE $PORT
