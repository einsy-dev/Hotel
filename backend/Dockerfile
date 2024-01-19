FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

VOLUME [ "/data" ]

RUN npm run build

CMD ["npm", "start"]