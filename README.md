# Developing With Docker

This demo app shows a simple user profile app set up using

- index.html with pure js

- nodejs backend with express module

- mongodb for data storage

All components are docker-based

## With Docker

### To start the application

`First docker pull mongo && docker pull mongo-express`

#### Step 1: Create docker network

`docker network create mongo-network`

#### Step 2: Start Mongodb

```

docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo

```

#### Step 3: Start mongo-express

```

docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express

```

_NOTE: creating docker-network in optional. You can start both containers in a default network. In this case, just emit `--net` flag in `docker run` command_

Step 4: open mongo-express from browser

http://localhost:8081

Step 5: create `user-account` _db_ and `users` _collection_ in mongo-express

Step 6: Start your nodejs application locally - go to `app` directory of project

`yarn or npm install`
`yarn start or npm start`

Step 7: Access your nodejs application UI from browser
http://localhost:3000

## Docker Compose

To avoid all the above mess, just create a `yaml` file. Following code goes into `docker-compose.yaml` file.

```
version: "3.8"
services:
	mongodb:
		image: mongo
		environment:
			- MONGO_INITDB_ROOT_USERNAME=admin
			- MONGO_INITDB_ROOT_PASSWORD=admin
		ports:
			- "27017:27017"
	mongo-express:
		image: mongo-express
		environment:
			- ME_CONFIG_MONGODB_ADMINUSERNAME=admin
			- ME_CONFIG_MONGODB_ADMINPASSWORD=admin
			- ME_CONFIG_MONGODB_SERVER=mongodb
		ports:
			- "8081:8081"
		restart: unless-stopped
```

#### To start the application

`docker-compose -f docker-compose.yaml up -d`
_You can access the mongo-express under `localhost:8081` from your browser_

> Check localhost:8081 for MongoDB GUI.

## Creating Image (Dockerfile)

All the commands inside the `dockerfile` gets executed in the docker container, _they won't affect our local machine_.

##### Basic Docker File

```
FROM  node:19-alpine3.15

ENV  MONGO_DB_USERNAME=admin  \
	 MONGO_DB_PWD=admin

RUN  mkdir  -p  /home/app

COPY  .  /home/app

CMD  [  "node","/home/app/server.js"  ]
```

`FROM`: From the image

`ENV` : env variables

`RUN` : Make a new folder in container

`COPY` : Copy the current local machine files into the destination

`CMD` : Run that command

Now run `docker build -t my-app:0.0 .` to build the image

Run `docker run my-app:0.0` to start the app

### Some Extra Commands

`docker ps -a` to view all containers.

`docker rm CONTAINER_ID` to delete the container.

`docker images` to view all images.

`docker rmi IMAGE_ID` to remove the image.

`docker logs CONTAINER_ID` to view all logs.
