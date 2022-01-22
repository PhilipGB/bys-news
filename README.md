# BigYoSpeck News API

## Built by Philip Burgess (https://github.com/BigYoSpeck)

## Description

Big Yo Speck News is a Node.js/Express based news API providing articles and commenting in JSON format using a PostgreSQL database.

You can access the API at: [Heroku](https://bys-news.herokuapp.com/api)

## Setting up / Installation Requirements

### Prerequisites

- Node.js LTS 16.13.x [Node.js](https://nodejs.org/en/)
- PostgreSQL 12.9 [psql](https://www.postgresql.org/)

### Dependencies

- dotenv 14.x [dotenv](https://www.npmjs.com/package/dotenv)
- express 4.x [express](https://www.npmjs.com/package/express)
- pg 8.x [node-postgres](https://www.npmjs.com/package/pg)
- pg-format 1.x [pg-format](https://www.npmjs.com/package/pg-format)

### Dev Dependencies

- jest 27.x [jest](https://www.npmjs.com/package/jest)
- supertest 6.x [supertest](https://www.npmjs.com/package/supertest)
- nodemon 2.x [nodemon](https://www.npmjs.com/package/nodemon)

### Cloning

- In your terminal:

        $ git clone https://github.com/BigYoSpeck/bys-news.git
        $ cd bys-news

## Running the Application

- Initialising in Node

        $ npm install

<!-- - Installing dependencies

        $ npm install dotenv
        $ npm install express --save
        $ npm install pg
        $ npm install pg-format -->

- Installing dev dependencies

        $ npm i -D jest
        $ npm i -D supertest
        $ npm i -D nodemon

You will need to create _two_ `.env` files for the app: `.env.test` and `.env.development`. Into `.env.test` add `PGDATABASE=<database_name_here>` with your choice of database name for both the dev and test environment.

There is a provided `db` folder with some data, a [setup.sql](./db/setup.sql) file and a `seeds` folder.

- Setup database

        $ npm run setup-dbs && npm run seed

## Testing the application

To run the provided tests

        $ npm t

To run the dev environment

        $ npm run dev

This can then be accessed at [http://127.0.0.1:9090/api](http://127.0.0.1:9090/api)

I recommend the Google Chrome extension [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) for inspecting the available endpoints.

## Available endpoints

```http
GET /api/topics
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/:comment_id
GET /api
GET /api/users
GET /api/users/:username
```

---

#### **GET /api/topics**

Responds with:

- an array of topic objects, each of which should have the following properties:
  - `slug`
  - `description`

---

#### **GET /api/articles/:article_id**

Responds with:

- an article object, which should have the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this

---

#### **PATCH /api/articles/:article_id**

Request body accepts:

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

Responds with:

- the updated article

---

#### **GET /api/articles**

Responds with:

- an `articles` array of article objects, each of which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this

Should accept queries:

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `topic`, which filters the articles by the topic value specified in the query

---

#### **GET /api/articles/:article_id/comments**

Responds with:

- an array of comments for the given `article_id` of which each comment should have the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` from the users table
  - `body`

---

#### **POST /api/articles/:article_id/comments**

Request body accepts:

- an object with the following properties:
  - `username`
  - `body`

Responds with:

- the posted comment

---

#### **DELETE /api/comments/:comment_id**

Should:

- delete the given comment by `comment_id`

Responds with:

- status 204 and no content

---

#### **GET /api**

Responds with:

- JSON describing all the available endpoints on your API, see the [endpoints.json](./endpoints.json) for an (incomplete) example.

---

#### **GET /api/users**

Responds with:

- an array of objects, each object should have the following property:
  - `username`

---

#### **GET /api/users/:username**

Responds with:

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

#### Copyright (c) 2022 Philip Burgess
