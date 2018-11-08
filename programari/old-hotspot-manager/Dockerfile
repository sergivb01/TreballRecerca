FROM node:8
LABEL maintainer "Sergi Vos Bosch <me@sergivb01.me>"
LABEL description "Controlador del hotspot - Treball de Recerca Sergi Vos Bosch."

WORKDIR /usr/src/app

COPY package*.json ./

#Not CMD, CMD are executed once image is ran
RUN npm install
COPY . .


EXPOSE 8080
CMD [ "npm", "start" ]