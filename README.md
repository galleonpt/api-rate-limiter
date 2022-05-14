# Technologies used to build this project:

- [Docker](https://www.docker.com)
- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Yarn](https://yarnpkg.com/)

# Requirements to run the API:

- [Docker](https://www.docker.com) installed

# Installation

After you have Docker installed yout should do the following steps:

- Clone the project

```bash
  git clone git@github.com:galleonpt/outvio.git <folder_name>
```

- Go to the project directory

```bash
  cd <folder_name>
```

- Run to start all containers:

```bash
  docker-compose up -d
```

If you want to know when the API is ready to be used run the command bellow and see a message like **Server on!**

```bash
  docker logs -f --tail 50 app_outvio
```

- After that you are ready to use the API.

# API Endpoints Documentation

I recommend using [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download) to see the API working. During development I used insomnia.

### Base url

```bash
  http://localhost:3333
```

---

## Public route

**Endpoint**

```bash
  POST /public
```

**Response**

```json
{
	"route": "/public",
	"amountOfRequests": number, //Number of requests made until ttl resets
	"ttl": number //Time-to-live in seconds
}
```

---

## Private route

**Endpoint**

```bash
  POST /private
```

## Note

- To use this route you need do set a jwt token on headers. To do that got to [jwt site](https://jwt.io//) and create a token with the same secret key that is on "src/config/config.ts"

**Response**

```json
{
	"route": "/private",
	"amountOfRequests": number, //Number of requests made until ttl resets
	"ttl": number //Time-to-live in seconds
}
```

---

# Contributing

Contributions are always welcome!

If you want to contribute you **must**:

- Clone the project
- Create a branch and code what you want
- Commit your code
- Push it
- Create a pull request

---

# Start Guide

When you clone the repository you will have the following folder architecture:

```
src
├── @types
│    └── express
│        └── index.d.ts
│── config
│   └── config.ts
├── middlewares
│   └── ensureAuthenticated.ts
│   └── rateLimiter.ts
├── app.ts
├── redis-client.ts
├── routes.ts
└── server.ts

```

At the root of the project you will have **src** folder witch is where all the code is developed.

Inside **src** we have 3 folders:

- <u>@types</u>: where we can add properties to express objects;
- <u>config</u>: folder where all config variables are;
- <u>middlewares</u>: here is where all middlewares used on the endpoints are.
