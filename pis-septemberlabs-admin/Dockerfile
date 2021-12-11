FROM node:14.10-alpine

ENV APP_HOME pis-septemberlabs-admin
ENV APP_HOME /app/$APP_HOME
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY /src /src
COPY /public /public
COPY .env .env
EXPOSE $PORT
