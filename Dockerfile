FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend
COPY . /frontend
RUN npm install
RUN npm rebuild node-sass
