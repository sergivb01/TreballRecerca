FROM node:8
LABEL maintainer "Sergi Vos Bosch <me@sergivb01.me>"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080

CMD [ "npm", "start" ]
