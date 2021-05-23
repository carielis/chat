FROM node:12 AS builder

WORKDIR /usr/client/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]