FROM node:current-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY index.js .
COPY startPage.html .

EXPOSE 3000

CMD ["node", "index.js"]