FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY index.js .
COPY startPage.html .

EXPOSE 3000

CMD ["node", "index.js"]