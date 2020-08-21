---
path: "/lectures/lecture7-rest"
title: "Lecture 7 - Rest"
name: "Lecture 7 - Rest"
date: "2019-10-01"
published: false
---

## Obtaining application state

It is unusual to embed data directly in an application is we did in the initial
versions of Simplepedia and the standalone Film Explorer. More typical is to
fetch the data as needed from a server with an AJAX request (Asynchronous
JavaScript and XML) and persist new or changed data by sending it back to the
server (also via AJAX). AJAX is a technique (with multiple underlying
implementations) to request data from a remote resource in the background
without reloading the webpage.

## Modifying application state

The next feature we want to add to the Film Explorer is the ability to add our
own ratings, i.e.

"As a user, I want to rate the movies myself so that I can record and review my
opinion of the movie"

As we saw in class, FilmExplorer already supports this, but the data is
currently ephemeral; if I restart the application, it is lost. If I want the
rating to persist I will need store those updates somewhere - the server.

Implementing this kind of interaction motivates us to learn about client-server
architectures, HTTP, REST (and REST APIs).

## Client-Server

Web applications are _client-server_ (vs. peer-to-peer) and generally
_request-response_ (vs. push, although there are push technologies via
WebSocket).

Client-Server is a design pattern:

- The client enables users to interact with data
- The server waits for and respond to requests for many clients

### Underlying protocols

Recall that TCP/IP provides an abstraction of a reliable stream between IP
nodes (addressed by by four octets, e.g. 127.0.0.1). TCP ports enable multiple
applications on the same node to use TCP/IP concurrently and independently.
These are logical not physical ports. Many protocols have specified
"well-known" ports (e.g. 22 for SSH), enabling clients to make connections just
knowing the IP address (doesn't mean those services are provided on every
server).

Hypertext Transfer Protocol (HTTP) is a request-response protocol for the Web.
An HTTP request includes:

- The request method (GET, POST, etc.)
- Uniform Resource Identifier (URI)
- The HTTP protocol version understood by the client
- Headers (extra information about request, e.g. the kind of response
  accepted)

While the HTTP response from server includes:

- Protocol version and status code (2\*\* OK, 3\*\* resource moved, 4\*\*
  forbidden, etc., 5\*\* error)
- Headers
- Body

The HTTP methods or verbs are:

- GET: Request a resource. Form fields can be sent as the query parameters.
- HEAD: Similar to GET, but just the response headers
- POST: Send data to the server. Unlike GET, the data is transmitted in the
  request body rather than as part of the URL. What is done with the data is up
  to the server. The response may be a new resource, or just a status code.
- PUT: Similar to POST, expect that PUT is intended to create or modify the
  resource at the specified URL, while POST creates or updates a subordinate
  resource.
- DELETE: Delete the specified resource
- PATCH: Partial replacement of a resource, as opposed to PUT which specifies
  complete replacement.

### REST

REST (Representational State Transfer) is an architectural style rather than a
standard. The main idea is that the URI names a resource(s) _and_ operation,
not the page. A RESTful API observes 6 constraints listed in Fielding's 2000
dissertation. By observing these constraints applications gain valuable
features such as improved performance and scalability.

- Client-server
- Stateless:
  > each request from client to server must contain all of the information
  > necessary to understand the request, and cannot take advantage of any
  > stored [session] context on the server. Session state is therefore kept
  > entirely on the client.
- Cache:
  > data within a response to a request [must] be implicitly or explicitly
  > labeled as cacheable or non-cacheable
- Uniform interface: A RESTful URI is self-contained, i.e. includes an
  identification of the resource and what to do. If we have representation of a
  resource, we have enough information to modify it (including delete that
  resource). Responses may include hyperlinks to discover additional RESTful
  resources (termed Hypermedia As The Engine Of Application State or HATEOAS).
- Layered system: Each component can't see beyond the immediate next layer,
  enable intermediate layers to support load-balancing and other optimizations.
- Code on demand: Servers can extend client by transmitting executable code
  (e.g. JavaScript)

A more approachable definition might be... a RESTful API uses the URI to
identify and interact with resources. The URI is typically the "noun" and the
HTTP method the "verb". More specifically:

1. The API is expressed as actions on specific resources (identified in the URI
   itself, i.e. the URI is self-contained)
1. Use HTTP verbs as actions (in line with their meaning in HTTP specification)
1. Responses can include hyperlinks to discover additional RESTful resources
   (HATEOAS)

<!-- https://martinfowler.com/articles/richardsonMaturityModel.html -->

### An API for films

Consider the movies in our Film Explorer. They have an `id`, a `title` and several other properties. What are some ways that we could request a film(s)?

```
GET /films/135397
GET /api/v2/films/135397
GET /films?title=Jurassic+World
```

Note that the first two routes uniquely identifies a resource (i.e. a specific
movie) and could be part of a "RESTful" API. The third could identify a unique
movie, or not, if there are multiple movies with the same title. It is still
"RESTful" but may best describe a "listing" operation instead of a single
movie. The [Google Cloud Platform
Blog](https://cloudplatform.googleblog.com/2017/10/API-design-choosing-between-names-and-identifiers-in-URLs.html)
for instance recommends "Identifiers are for look-up. Names are for search."
Thus we could think of the third route as listing all movies with Jurassic
World as the (or in the) title.

In all cases the actions would be to read and return the specified data. In
what format? Could be HTML, JSON, etc. depending on the specification of the
request (via the `Accept` header).

### Example with Film Explorer

Film Explorer API (note we typically use the colon to identify parameters):

- GET `/api/films`: List all the films
- GET `/api/films/:id`: Read the film with with id == `:id`
- PUT `/api/films/:id`: Update the film with id == `:id` with the request body

#### CRUD(L)

The basic operations on a RESTful resource are typically abbreviated CRUD:
Create, Read, Update and Delete (along with List).

For the specific resource `/api/films/135397`:

- GET: Read a representation of the movie with id of 135397 (a GET operation shouldn't have side effects)
- PUT: Update the specified movie by replacing it entirely
- POST: Not used
- DELETE: Delete the specified movie
- PATCH: Update part of the specified movie

For the collection of resources '/movies':

- GET: List all the movies
- PUT: Update the collection of movies by replacing it entirely with another collection
- POST: Create a new movie in the collection and return its id (and perhaps other information)
- DELETE: Delete the collection

#### Non-CRUD operations?

Search? Think of the resource as the list of movies matching the query...

```
GET /films/search?q=Jurassic
```

What about "Add to my favorites" or "Add to shopping cart"? When it seems awkward to express an operation in terms of your existing resources, ask whether there is another resource type waiting to be defined.

<!--
https://gist.github.com/hjr3/2289546
https://github.com/alexpls/cart_rest_example
 -->

## REST and React

We can implement this fetch in a variety of container components. When and where exactly?

We are going to make use of React's other type of hook -- the [effect hook](https://reactjs.org/docs/hooks-effect.html).

At their simplest, effect hooks allow us to provide a function to be run after our component has rendered. In this case, we are fetching data from a remote server, so we need to show _something_ on the screen while this longer process happens. This adds a little bit of complexity because we need to consider how to render our component both with and without data.

```JavaScript
let filmContents = (<h2>Loading...</h2>);
if (films) {
  filmContents = (<FilmTableContainer
    films={films}
    ...
  />);
}
```

Normally, the effect hook will run every single time the component is rendered. For our purposes, we want a little bit more control. We can pass a second argument to the hook that is a list of props and state variables. React will only run the hook function if one of the values changes. If the array is left empty, the hook will run a single time.

### Asynchronous data access (and Promises)

There are several ways to request remote resources in JavaScript (all based on the same underlying technology). We will use the now widely available [`window.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) function. `fetch` has replaced `XMLHttpRequest` (XHR) in many settings.

`fetch()` has a number of options, but at its most basic, it is just `fetch(url)`. The return value is not the response, but a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) with which we can obtain that response.

Recall that the browser is event-based. A typical pattern is to launch an _asynchronous_ operation, such as a network request, in the background and supply a callback function to be invoked when the result is available. In the meantime the original function returns and execution continues (enabling the UI to remain responsive).

But when you need a callback inside a callback, the deeply nested structured (i.e. callbacks, inside callbacks, inside callbacks), like below, becomes difficult to reason about.

```
someAsyncOperation(someParams, (result, error) => {
  // Do something with the result or error
  newAsyncOperation(newParams, (result, error) => {
    // Do something more...
  });
});

```

Instead we can use a chain of Promises to "flatten" the nested callbacks:

```
someAsyncOperation(someParams)
.then((result) => {
  // Do something with the result
  return newAsyncOperation(newParams);
})
.then((result) => {
  // Do something more
})
.catch((error) => {
  // Handle error
});
```

From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

> A Promise is a proxy for a value not necessarily known when the promise is
> created. It allows you to associate handlers with an asynchronous action's
> eventual success value or failure reason. This lets asynchronous methods
> return values like synchronous methods: instead of immediately returning the
> final value, the asynchronous method returns a promise to supply the value at
> some point in the future.

Thus a Promise is one of three states:

1. Pending: Initial state, neither fulfilled or rejected
1. Fulfilled: The operation as has completed successfully
1. Rejected: The operation has failed.

A Promise has a `then` method that invokes the supplied callback when the Promise is _fufilled_ with a concrete value. That callback can return a new Promise, or if it returns a concrete value, that value will be wrapped in a fulfilled Promise. Alternately if there is an error or other failure, the Promise is _rejected_ and the reject function in the chain (supplied to the `catch` method here) is invoked. The `then` and `catch` methods return promises to facilitate the chaining we saw above.

If `fetch` succeeds, it resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object (an HTTP response), from which we can obtain the status of the response, the type, header, and contents (which can be accessed in a variety of formats).

```javascript
fetch("/api/films/")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    setFilms(data);
  })
  .catch((err) => console.log(err));
```

Why not just `setFilms(response.json())`? `response.json()` returns
a Promise that will resolve with the result of parsing the response as JSON (the parsing is an asynchronous operation). The second `then` function will be invoked when the `.json()` Promise resolves.

<!--
API design: https://www.gitbook.com/book/geemus/http-api-design/details
https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design#organize-the-api-around-resources
 -->
