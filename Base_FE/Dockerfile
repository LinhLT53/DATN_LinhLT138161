FROM node:12.13.0-alpine as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install --save-dev webpack
RUN npm install --save-dev webpack-dev-server
CMD npm start