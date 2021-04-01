FROM node:10.19.0

WORKDIR  /app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./.env .
COPY ./tsconfig.json .

RUN npm install -g npm@7.6.3

RUN npm install

COPY ./src .

CMD [ "npm", "start" ]

EXPOSE 3000

