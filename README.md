# MEAN Auth Skeleton

## Demo:

https://qwalo.com/
https://express-server-mjje.onrender.com/api

## Description:

The MEAN Auth Sekeleton is a starter project for full-stack web applications. The project has a client and a server side. It comes with authentication and (server-side) session management. I chose to build it using the MEAN stack (MongoDB, Express, Angular & Node) because they are widely used languages and have been around for a very long time (relative to the industry).

## Features

- Authentication **without third-party solutions**.
- Session management done by the server-side.
- Working `register`, `login`, `logout` built-in.
- Fast and easy MongoDB connection setup (just replace the connection string in `.env.development.local` with yours.)
- It works out of the box (after editing the `.env.development.local` file).

## How to run the client and server:

Clone the project (contains both the client and server directories):

```bash
git clone https://github.com/iamgreenintro/mean-auth-skeleton.git
```

**Important:** Before doing anything, please install the dependencies for each project!
You can do so by navigating to the `client` and `server` directories and running the following command in each directory:

```bash
npm install
```

**After installing the dependencies for each project we can navigate back to the root directory.**

To run the web application (Angular client-side):

```bash
npm run client
```

To run the server (Express server-side):

```bash
npm run server
```
