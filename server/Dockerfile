# Step 1
## base image for Step 1: Node 10
FROM node:10 AS builder
WORKDIR /app

COPY package.json .
## Nest.js project를 build 한다
RUN npm install

## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
COPY . .


CMD ["npm", "run", "start", "start:dev"]