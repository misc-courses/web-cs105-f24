---
title: "CS 312 - Practical Seven"
date: "2019-10-17"
dueDate: "2019-10-18 5p"
path: "/practicals/practical07"
template: "assignment"
name: "Practical 7"
published: true
---



#### Goals
- Implement a simple Node+express server
- Practice combining create-react-app (CRA) with server-side code
- Learn how to test a server API

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/AXK2Ng3s) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install`. Note that there are three `package.json` files in the skeleton. One in the root (or "top-level") directory, as well as one in the client directory and one in the server directory. You should run `npm install` in all three locations. You can do so by changing directories or by using the "prefix" option for `npm`, e.g. from the root directory

    ```
    npm install
    npm install --prefix client
    npm install --prefix server
    ```

    *We will do most of our work inside of the `server` directory, so when we add files or install new packages, make sure you do it in this directory (or with that prefix) unless otherwise noted.*

    **Windows Users:** There appears to be an [error](https://stackoverflow.com/q/50653324) using the `prefix` argument on Windows. Instead of using `prefix` you will need to manually change to the client and server directories.

## Overview
We are going to use `express` to create a series of routes that implement the Film Explorer API.

Note that we have moved the `films.json` file into the server. Our server will use "in memory" data storage. In other words, when the server is started, it will read in the contents of `films.json`, and store it in a `Map` with the `id` as the key and the film object as the value. Changes (i.e., ratings), will be made to this local copy of the data providing the appearance of persistence, but if the server is restarted, the server will return to the original copy of the data. For proper persistence, we will require some form of database, which we will discuss in a few weeks. 

## Serving films with Express

To make testing and development easier, we will create our routes in a dedicated file. We have called this file `routes.js`. This file has a basic skelton in place. The `express` module has been imported with `const express = require('express');` and an `express` instance called `app` has been created. You will also see that we have a `Map` object called `films`, which will be our in memory data store. Finally, at the bottom of the file, we are exporting both `app` and `films` so that they can be used in other files.

Now we can create the route that fetches all of the films (put this *before* the exports):

```JavaScript
    app.get('/api/films', (request, response) => {
      response.send(Array.from(films.values()));
    });
```

*Why the different module syntax? Node's module support, based on the CommonJS standard (CJS), preceded the module syntax in ES6. ES6 module syntax (ESM) is coming to Node (but is only partially implemented). We can use the Babel transpiler to convert ESM to CJS, but that is one more piece of infrastructure we need to setup. For simplicity, we will stick to `require` and `module.exports` for Node-based servers.*

### Loading the film collection

Reading in the collection of films will take a moment, and we don't want to start the server until the data is prepared. The main server code will be placed in `index.js`. If you open that file, you will see that we have imported `app` and `films`, and provided the code to start a server directly from the `express` instance (note that this has the same effect as the approach [in the notes](../lectures/lecture11-servers) that used the `http` module explicitly).


To read in `films.json`, we  will use the `fs` (file system), `path`, and `util` modules, so add these imports as well:

```JavaScript
const fs = require('fs');
const path = require('path');
const util = require('util');
```

To read in the file, we will use the [`fs.readFile`](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfile_path_options_callback) function. If you read the documentation, you will see that `readFile` is an "old-school" asynchronous function. It uses a callback instead of returning a promise. We will use `util.promisify` to create a new `readFile` function that returns a promise. 

```JavaScript
const readFile = util.promisify(fs.readFile);
```

Now we can read in the file:

```JavaScript
readFile(path.join(__dirname, 'films.json'))
  .then((contents)=>{
    // Parse the data
  
    // Load it into the films map
  
    // Start the server
    const server = app.listen(process.env.PORT || 3001);
    console.log('Listening on port %d', server.address().port);
  })
  .catch((err)=>{
    console.error(err);
  })
```

1. Parse `contents` into a JavaScript Array using `JSON.parse()`.
2. Populate the the films Map by iterating over the array. Recall that adding items to a Map is done with the `set(key, value)` function. In this case, the `key` will be the `id` of the film and the value will be the film itself.
3. Move the code that starts the server into the `then` clause so that it doesn't happen until after the data is loaded. 

### Test the server

If you run `npm start` in the top-level directory it will start both the client and the server at the same time (you that can test both). For now we are just focused on the server, so execute `npm start` in the server directory (or with the server prefix) to start just the server. You should see the server start listening on port 3001. Verify basic functionality by opening another terminal window and using the `curl` utility (may not be available on all platforms). `curl` is a command-line tool for performing HTTP (and other) requests. A GET request to "/api/films" should return all of the films. Alternatively, you can open <http://localhost:3001/api/films> in your browser.

```
$ curl http://localhost:3001/api/films
[{"adult":false,"backdrop_path":"/dkMD5qlogeRMiEixC4YNPUvax2T.jpg","genre_ids":[28,12,878,53],"id":135397,"original_language":"en","original_title":"Jurassic World","overview":"Twenty-two years after the events of Jurassic Park, Isla Nublar now features a fully functioning dinosaur theme park, Jurassic World, as originally envisioned by John Hammond.","release_date":"2015-06-12","poster_path":"/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg","popularity":46.567302,"title":"Jurassic World","video":false,"vote_average":6.9,"vote_count":2616},{"adult":false,"backdrop_path":"/sEgULSEnywgdSesVHFHpPAbOijl.jpg","genre_ids":[18,12,878],"id":286217,"original_language":"en","original_title":"The Martian","overview":"During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.","release_date":"2015-10-02","poster_path":"/AjbENYG3b8lhYSkdrWwlhVLRPKR.jpg","popularity":40.509541,"title":"The Martian","video":false,"vote_average":7.7,"vote_count":447},
...
```

### Serve a single film

For each route in the API, we will create a separate Express route. Add a second route to fetch individual films. Since this is another GET request, use `app.get` again, but this time the route is `'/api/films/:id'`. Note the `:id`. This creates a parameter that is accessible via `request.params.id`. This is read as a string, so we will convert it to an integer like this:

```JavaScript
const filmId = parseInt(request.params.id, 10);
```

Use `filmId` to lookup the film in the Map (use the `get()` method), and return it via `response.send()`.

Test this is working by checking some ids (e.g., <http://localhost:3001/api/films/11>).

### Updating the ratings

Our final route will be a PUT request to `'/api/films/:id'`. This accepts a film with changes (presumably a rating), and uses it to update the local copy. 

To make our lives easier, we will install a piece of middleware to help us parse request bodies (i.e. request bodies encoded as `'Content-type': 'application/json'`). 

1. Install the middleware package: `npm install --save body-parser` (if you are in server directory), or `npm install --save body-parser --prefix server` (if you are in the root directory). Don't forget the `--save` option to tell `npm` to record the dependency in the `package.json` file (so that when someone else installs your application they have all the dependencies). When you update the `package.json` file you will need to restart the application.

1. Require the package in `routes.js`: `const bodyParser = require('body-parser');`

1. Load the middleware into `app` before any of your routes (the order matters, Express executes routes and middleware in the order in which they are declared): 

    `app.use(bodyParser.json());`

1. Now, you can add the final route:

```JavaScript
    app.put('/api/films/:id', (request, response) => {
      const filmId = parseInt(request.params.id, 10);
      const newFilm = request.body; // read the modified film out of the request
      const mergedFilm = { ...films.get(filmId), ...newFilm}; // merge it with local copy
      films.set(mergedFilm.id, mergedFilm); // add the new film back into the collection
      response.send(mergedFilm); // return the new film to the user
    });
```

## Testing Your Server

There are several ways to test your server, both "informally" and "formally".

### "Informal" Testing with `curl` or the browser

As we showed above, some quick test can be done using `curl` or the browser. However, while `curl` does have the capability of issuing any kind of HTTP request, it quickly ceases to be the quick and easy choice when you are issuing PUT and POST requests. 

### "Informal" Testing with the Client Application

An obvious approach is to launch the client and see if all of its functionality is present. 

We have previously shown you how to set the proxy for a CRA development server so the application can interact with a different server. You will see that in the included Film Explorer client, we have already done this for you. We have also modified the `package.json` scripts in the root directory, so when you type `npm start`, it will launch both the CRA server and the Node server concurrently. Try this, you should have persistent ratings. 

Of course, this only works in some situations (such as this one where you are handed a fully formed client). In general, this can be problematic as you greatly increase the potential source of errors, so when something does go wrong, it will be difficult to track down what it was. 

### "Formal" Unit/Integration Testing with Jest

For a more formal approach, you can use Jest along with other libraries to test the Express server routes in a similar fashion.

For this project we added a library called [SuperTest](https://github.com/visionmedia/supertest), which is used for easily testing HTTP APIs.

#### Writing Tests

If you look in `routes.test.js`, you will find the start of a collection of tests. You will see our familiar testing pattern, in which you `define` a test suite, use the `beforeEach` "setup" function to create a consistent test environment (making the tests "Independent" and "Repeatable"), then execute a set of tests. Each of those tests executes some code, i.e. makes a HTTP request to the API, then makes a set of assertions about the response. In the code below there are examples of using Jest for assertions, and also using the features of the SuperTest library for assertions. Because SuperTest is designed for testing APIs it can be more concise.

Add the final test to check if the parameterized GET route functions properly. You can run the server tests with `npm test` (in the server directory) or `npm test --prefix server` (from the root directory):



## Deploy with Heroku

Our deployed application should not use the development server provided by `create-react-app`. Instead, we would like our new server to take over and serve not just the api, but the static files that make up the site as well. 

Our process will export our client into a `build` folder. We just need to tell the server where to find it and to use it as a source for routes it otherwise doesn't handle explicitly. We will do this with a piece of middleware and a new route.

```javaScript
// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}
```

This block checks if we are in a production environment. If we are, we st the `build` directory of the client as the source of static files, and then we add a path connecting the root path ("/") to the base file of our exported client (`index.html`). Add this before your other routes. You also need to import the `path` module: `const path = require('path');`. 

You are now ready to deploy your application to Heroku. When [getting started](getting_started.html), you should have signed up for a Heroku account and installed the command line tool.

Create your application via

```
heroku app:create
```

then push your application to Heroku to deploy your new color picker 

```
git push heroku master
```

and then open your newly deployed application

```
heroku open
```

The README file of the starter code includes more details of the changes to the repository that were made to support those simple commands.


## Finishing Up

1. Add and commit your changes to Github. *Make sure to add and commit the new files you created.*
1. Submit your repository to Gradescope

## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Unparameterized GET request works
&#x2713;/&#x2717; | Parameterized GET request works
&#x2713;/&#x2717; | PUT request works
&#x2713;/&#x2717; | Test for parameterized GET
&#x2713;/&#x2717; | Passes all ESLint checks (in both client and server)

