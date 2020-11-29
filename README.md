[![txt-zoom](https://github.com/dtn1999/typescript-prima-postgres-backend/workflows/t-zoom/badge.svg)](https://github.com/dtn1999/typescript-prima-postgres-backend/actions)
![html5 and css3 image](How_to_Become_a_Back_End_Developer.jpg)

# TXT-Zoom

The goal if this application is to showcase a real-world scenario of an application using Prisma. the following aspects of Prisma

* Data modeling
* CRUD
* Aggregations
* API layer Validation
* Testing
* Authentication
* Authorization
* Github actions for CI/CD

## Data model

The development of this project is driven by the database schema (also known as the data model). The schema is first designed to represent the following concepts:

* User: this can be a host or a participant, or both. The role of the user is determined through their association with a meeting.
* Meeting : represent a meeting that can have multiple participants but just one host. Each user can be associated with multiple * Meetings either as a HOST or as a PARTICIPANT.
* MeetingRegistration: associate each participants with a meeting/meetings he is interested into
* MeetingRoom: each meating has a room , which will be accessible by the participants only when the host will open it. Also , each room is accessible just by providing the roomEntryId and the password of the room

## Tech Stack

* Backend
    * PostgreSQL
    * Node.js
    * Prisma
    * TypeScript
    * Jest
    * Hapi.js

* Frontend (comming soon)
   * web : React Js && Redux
   * mobile : React Native && apollo client

## How to use

```
# hier are the steps to run the code on your desktop

$ git clone https://github.com/dtn1999/typescript-prima-postgres-backend

$ cd typescript-prima-postgres-backend
$ cd prima  # to add your .env file 
# postgresql server location 
# DATABASE_URL=postgresql://USERNAME:PWD@HOST:PORT/DB_NAME  
# if you want to user anotgher dbms service
# 1- go in schema.prisma
# 2- change:  db.provider = "name of the dbms" (for more details go to the prisma official website)
# once previous steps are completed
$ cd ..
$ npm run migrate:up # to initialize your data base
$ npm install # or yarn install 
$ npm start   # yarn start 
```

## Todo

- [x] Data modeling
- [x] CRUD
- [x] Aggregations
- [x] API layer Validation
- [x] Testing (not complete yet)
- [x] Authentication
- [x] Authorization
- [x] Github actions for (Texting : see badge above)
- [ ]  chatroom 
- [ ]  dicussion during chatroom
- [ ]  frontend web
- [ ]  frontend mobile
