FROM node:18-alpine

WORKDIR /server

COPY package*.json ./



COPY . .

VOLUME [ "/data" ]

RUN npm run build

CMD ["npm", "start"]