FROM node:10 AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


CMD ["npm", "run", "start" ,"start:dev"]