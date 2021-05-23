FROM node:10 AS builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

RUN npm install class-transformer

COPY . .

RUN npm run build


FROM node:10-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 4001 4000

CMD ["npm", "run", "start:prod"]