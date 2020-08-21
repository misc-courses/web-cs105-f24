---
path: "/lectures/lecture11-servers"
title: "Lecture 11 - Servers"
name: "Lecture 11 - Servers"
date: "2019-10-17"
published: false
---

# Implementing the REST API

We are going to implement our server in Node. There is no requirement we do so. Since we are using HTTP as the interface any system that provides a HTTP server would do. We will use Node in this role so that we can use the same programming language on the server as we do on the client.

In particular we will use the increasingly popular MERN stack, MongoDB, Express, React and Node (this kind of naming was popularized with the "LAMP stack", Linux, Apache, MySql, and PHP, which was widely used in the earlier days of the Web).

Why use Node in this role? Node is not just a JavaScript interpreter. It implements an asynchronous event loop focused on I/O operations and series of modules for interacting with the file system, HTTP, DNS, etc... Like the browser, Node is single threaded, but achieves high throughput by maintaining high utilization. Long latency operations are asynchronous so that the main thread can continue with other work. This architecture does mean that computationally intensive operations can monopolize the main thread (the same can happen in the browser).

## Simple Node Server

Creating a HTTP server with Node is as simple as:

```javascript
const http = require("http");
const server = http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Don't Panic");
  })
  .listen(5042);
console.log("Listening on port %d", server.address().port);
```

`createServer` launches a HTTP server and invokes the supplied handler on any request. Note that here we ignore the request and always return the same response.

With this low-level interface we are responsible for everything: interpreting the request and building the entire response. As you expect there is an opportunity for frameworks that implement the common features of a web server. We will use [Express](https://expressjs.com), a "minimalist" routing oriented framework. There is a counterpart to Express in most server-side languages (e.g. Sinatra for Ruby and Flask for Python).

## Express

Recall two key constraints of [REST](https://en.wikipedia.org/wiki/Representational_state_transfer): uniform interface (of method and URI), and layered systems. In Express, these are reflected in the routing oriented interface (a Express application contains multiple `app.METHOD(PATH, HANDLER)` routes) and the middleware system. Express actually "has minimal functionality of its own: an Express application is essentially a series of middleware function calls" ([source](https://expressjs.com/en/guide/using-middleware.html)).

### Creating a simple server

A simple `index.js` implementing an Express server.

```javascript
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Don't Panic");
});

const server = http.createServer(app).listen(process.env.PORT || 5042);
console.log("Listening on port %d", server.address().port);
```

Express provides `response.send`, which automatically sends the headers, sets the correct content type, and calls `end()` (so it will only be called once during a response). It will even convert JavaScript objects to JSON for us! Note the route-centric interface with the handler for GET "/".

We can easily add additional routes, e.g.

```javascript
app.get("/about", (request, response) => {
  response.send("A simple server that does nothing at all");
});
```

### Middleware

We can extend our server with middleware to add functionality. For example, we will need to parse the JSON data sent to the server. We can add middleware to do so automatically.

First we install the package `npm install --save body-parser`, then incorporate the middleware:

```javascript
const bodyParser = require('body-parser');
...
app.use(bodyParser.json());
```

The middleware will automatically parse JSON request bodies and update the `request.body` property.

Another common middleware is `express.static` which serves static files (e.g. HTML files, CSS, etc.)

```javascript
app.use(express.static("/path/to/folder/of/static/assets"));
```

We would use that middleware to efficiently serve the static assets created in a [production build of CRA](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build). In the Film Explorer servers you will notice a recurring pattern in which the static middleware is used to serve assets like `index.html` when running in production mode.

### Middleware as a design pattern (and Aspect Oriented Programming)

The Express middleware is an example of a design pattern for implementing "cross cutting" concerns. Each middleware has access to the request, the response and the next middleware in the chain. Invoking `send` terminates the chain (and sends a response), while calling `next()` passes the request (and response) objects to the next middleware in the chain. With the middleware pattern we build up a complex application from many small transformations to the request (or response).

Moreover those transformations aren't applied to a single request (as in the request handlers above), but many different kinds of requests (hence "cross cutting concerns"). For example, in many applications most routes require the user to login. Instead of introducing this check in each route, we can do so with a middleware that will redirect all but a few specific un-authenticated requests to the login page.

"Cross cutting" concerns are those that affect many parts (or concerns) of a program not just one. Aspect Oriented Programming is a set of techniques to implement these "cross cutting" concerns while maintaining modularity and maintainability. We will see other examples of "cross cutting" concerns soon, notably in implementing validations for models (in the MVC sense).

### Parameterized Routes

We can parameterize the routes to extract resource IDs. Here are two example routes from Film Explorer. The colon indicates a parameter and those parameters can be accessed in the `request.params` object.

```javascript
app.get("/api/films", (request, response) => {
  response.send(Array.from(films.values()));
});

app.put("/api/films/:id", (request, response) => {
  const filmId = parseInt(request.params.id, 10);
  const newFilm = request.body;
  const mergedFilm = Object.assign({}, films.get(filmId), newFilm);
  movies.set(mergedFilm.id, mergedFilm);
  response.send(mergedFilm);
});
```

These callbacks implement the routes we described last time, i.e. there is a one-to-one mapping between the API and these handlers.

## What about the Model in Model-View-Controller Servers in action

The Express routes often function as the controller (in the MVC sense). What about the Model? In this context, the model is a film. There is no explicit model class, just a JavaScript object. And for such a simple application in which we are not persisting any changes (that is ratings don't persist through restarting the server), we might not need much more. But as we want to add features, we will quickly find that we could benefit from established design patterns and library support.

For example:

- How will we validate that a user's rating is between 0-5? Our client application restricts users to that range, but recall that the server exposes an API that can be used by others, not just our client. Anyone can make a PUT request (including by using JavaScript to modify the client application state), thus validation on the client alone is not (never) sufficient and we will also need to validate inputs on the server to ensure data integrity. This is important **Never trust the client (not even yours)!**. We can typically implement verification with a combination of schemas, which specify the types of properties in the model, and custom validation functions.
- How will we express associations between models (in a way that facilitates queries and updates). For example, a film can have many genres. Or in the future we can imagine a multi-user version of this application in which there are now multiple models: Users, Films and Ratings. Each user could have their own rating for a film.
- Our application may use different persistence tiers, i.e. different databases (SQLite3 in development, PostgreSQL in production). We would like our models to abstract away those differences.

[Object-relational Mapping (ORM)](https://en.wikipedia.org/wiki/Object-relational_mapping) libraries provide much of the above "cross-cutting" (or aspect oriented) functionality (the parts that are the same) and thus we will often use ORM libraries to implement our models. The choice of a specific library will often depend on what kind of database we plan to use (e.g. SQL vs. NoSQL). We will discuss those choices more in subsequent classes. For now we will focus on the data modeling itself.

### CRC and UML

[Class Responsibility Cards (CRC)](https://en.wikipedia.org/wiki/Class-responsibility-collaboration_card) are like User Stories but for classes. Each index card contains:

- On top of the card, the class name
- On the left, the responsibilities of the class
- On the right, the collaborators (other classes) with which this class interacts to fulfill its responsibilities

Like User Stories, using an index card limits complexity and helps designers focus on the essentials of the system. We have put together [an example](crc-cards.html) of using CRC cards to specify some aspects of FilmExplorer.

[Unified Modeling Language (UML)](https://en.wikipedia.org/wiki/Unified_Modeling_Language) is an older and more formalized approach to describing all of the artifacts in an object-oriented system. The UML specification is quite large, and we won't delve into it. however, it is certainly a widely used technique, and its diagraming features for [modeling classes and their relationships](https://en.wikipedia.org/wiki/Class_diagram) may provide you with additional ways to think about how to model the objects in your system.
