FROM node:19-alpine3.15

ENV MONGO_DB_USERNAME=admin \ 
    MONGO_DB_PWD=admin


RUN mkdir -p /home/app

COPY . /home/app

CMD [ "node","/home/app/server.js" ]
