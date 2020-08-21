---
title: "CS 312 - Practical Nine"
date: "2019-11-12"
dueDate: "2019-11-13 5p"
path: "/practicals/practical09"
template: "assignment"
name: "Practical 9"
published: false
---

In this practical you will adapt a simple memory-backed server for Simplepedia to use a MongoDB backend. The goals for this practical are to gain familiarity
with MongoDB and MongoDB-backed servers.

#### Goals

- Gain familiarity with a noSQL database (in this case MongoDB).
- Get more experience thinking about and working with back-end code.

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/Eh52oxMJ) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install` inside the root directory of the newly cloned repository.

1. You will need to have the MongoDB server installed. If you don't, instructions for installing MongoDB are included in the class ["Getting Started"](../resources/getting-started) page.

1. Install (and save as a dependency) the `mongodb` package with `npm install --save mongodb`.

_Notice that the skeleton repository includes a NPM "postinstall" action that automatically creates a `./data` directory to store your MongoDB database. This is another example of using automation to improve our development and operations processes. Manually creating the `data` directory (or any manual step for that matter) just creates opportunities for the process to go awry._

## Starting the Server

MongoDB uses a YAML [configuration file](https://docs.mongodb.com/manual/reference/configuration-options/) to set the data directory, port, etc.. The skeleton includes a `mongod.conf` file with the following parameters:

```
net:
  port: 5000
storage:
  dbPath: ./data
```

The command to start the `mongod` process (the database server) is `mongod --config mongod.conf` (but don't run it just yet).

I would like you to practice adding automation to your project. In `package.json`, add a new line to the "scripts" section:

```
"mongo:start": "mongod --config mongod.conf"
```

This adds a new script that can be run with `npm run mongo:start`. There is no meaning to the ':' in the name, it is just a convenient way to provide a common "namespace" to our commands.

Go ahead and start the database server. It will need its own terminal window, because you will leave the database server running in that terminal window for all of the subsequent steps (you can only use the database when the server is running).

## Seeding the Article data

Unlike the RDBMS-server, we can directly seed the database from the JSON data file using the `mongoimport` utility (command below). Note that this works because `seed.json` is setup as JSON array, i.e. `[{...}, {...}, ...]`. The command looks like this (but, again, don't just run it):

```
mongoimport --host localhost:5000 --db simplepedia --collection articles --jsonArray seed.json
```

Add a new script called `mongo:seed` that runs this command. (Obviously, if you are running `mongod` somewhere other than the default location, you will need to update the hostname and port).

We will add one more command: `mongo:purge`, which you can set to `mongo localhost:5000/simplepedia --eval "db.dropDatabase()"`.

These two scripts are dangerously destructive -- one loads a large amount of data into the database and the other one clears out all of the data. Use with care.

_If this database was higher stakes, we would add some guards to make sure the user didn't run these by accident._

Now, combine these together into one script that performs both actions:

```
"mongo:init": "npm run mongo:purge; npm run mongo:seed; "
```

## Explore the Database

Connect to the database with the `mongo` client (<kbd>Ctrl+D</kbd> to exit):

```
mongo localhost:5000
```

The `mongo` shell environment is essentially a JavaScript interpreter with additional commands for manipulating the database(s). Invoke `show dbs` to list the databases and `use simplepedia` to set the current database. Once you have set the database, invoke `show collections` to show the available collections.

The MongoDB [documentation](https://docs.mongodb.com/manual/) is pretty good. However, if you are more familiar with SQL (as I am), the [SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/) is particularly useful (if it is all new to you, this page is still useful since it is essentially a listing of short examples of common operations -- just ignore the SQL side).

Explore the database. For example to query for all the articles:

```
db.articles.find()
```

Note that every article now has an automatically generated `_id` field. We will return to that in a moment.

To find the article titled 'Ikoga':

```
db.articles.find({"title": "Ikoga"})
```

To find all the articles that begin with 'U':

```
db.articles.find({"title":{$regex: /^u/i }})
```

`/^u/i` is a Regular Expression that _case insensitively_ matches all strings
that begin with 'u'. The '^' indicates the start of the field, and the 'i' on the end says to be case insensitive.

To update the 'Ikoga' article, we could write something like this:

```
db.articles.updateOne({'title':'Ikoga'}, {$set: {'extract': 'A small village'}})
```

If you search for it again, you will see that the article's extract has changed. The syntax of this is a little strange. The first argument is a query that will accept anything `find` will. The second argument is the update command, which must include an [update operator](https://docs.mongodb.com/manual/reference/operator/update/) (in this case `$set`). The `$set` update works like `Object.assign` in that any fields we specify will be changed (or added, if they don't already exist).

This barely scratches the surface of possible queries. Consult the [documentation](https://docs.mongodb.com/manual/tutorial/query-documents/) for the full range of possibilities.

_Note: There are subtle differences between the `mongo` shell tool and the `node` driver that you will use for the server. Stay on your toes and try to pay attention to which documentation you are looking at._

## Update the Express Server

### Connect to the database

Before you can update the routes to use the database, you need to connect to the database. There are a number of different patterns we could follow, but we will stick to the pattern of opening the database before we start the server and then hanging on to the open database connection rather than re-opening it every time we need to consult with it.

Replace the initialization code in `index.js` with the following. Here we use the `MONGODB_URI` environment variable, if defined (e.g. on Heroku), or default to `'mongodb://localhost:5000/simplepedia`, to create the connection. As before, to ensure that we can successfully handle requests, we don't start the Express server until we are connected to the database (i.e. when the callback is invoked).

We need to hang on to a reference to the database connection, which we extract from the URL. We are going to do something a little different this time and store the database connection in the `locals` field of the Express `app` object.

```javascript
/* eslint-disable no-console */
const http = require("http");
const url = require("url");
const { MongoClient } = require("mongodb");
const { app } = require("./routes");

const mongoURL =
  process.env.MONGODB_URI || "mongodb://localhost:5000/simplepedia";

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, database) => {
  if (err) {
    console.error(err);
  } else {
    const db = database.db(url.parse(mongoURL).pathname.slice(1)); // pass the db name to the express routes
    app.locals.db = db;

    const server = http.createServer(app).listen(process.env.PORT || 3001);
    console.log("Listening on port %d", server.address().port);
  }
});
```

Once you have made the above changes, you can delete the `articles` variable and the `get_unique_id` function from `routes.js` (also delete them from the `module.exports`). So that your code still runs, comment out the lines in your routes that refer to `articles`.

### Update the GET '/articles' Route

In order to fetch all of the articles, you want to perform a [`find` operation](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#find) on the 'articles' collection in the database (with no filters). The result is not the data itself but a cursor that you could use to obtain that data. Invoke the `toArray` method on the cursor to obtain all the data as an Array, as a Promise. The function you provide to `then()` should take one argument, the array of documents. You can send this array back to the client directly with `response.send()` as shown below (recall that Express automatically sets the status code and content-type).

```javascript
app.get("/api/articles", (request, response, next) => {
  // <- Notice the "next" argument to the handler
  // Notice that we extract the "db" variable from "app.locals"
  app.locals.db
    .collection("articles")
    .find()
    .toArray()
    .then((documents) => {
      response.send(documents);
    }, next); // <- Notice the "next" function as the rejection handler
});
```

### Running your Express Server

Start your Express server with `npm start`. In a separate terminal window, test your newly created route with curl as shown below (at this point you should have three terminal windows open: one with the MongoDB server running, one with your Express server running, and one where you are executing the `curl`
command):

```
curl http://localhost:3001/api/articles
```

_You can also open <http://localhost:3001/api/articles> in your browser instead of using curl._

You should see a long array of articles.

_If you are running the database server on a different port, e.g. 5005, on OSX/Linux you can use the `MONGODB_URI` environment variable to initialize your Express server appropriately, e.g.:_

```
MONGODB_URI="mongodb://localhost:5005/simplepedia" npm start
```

## Enable Testing

Take a look at `routes.test.js`. Following the suggested practice in the [Jest documentation](https://jestjs.io/docs/en/mongodb.html) we will use [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) to spin up in-memory MongoDB servers for testing. Run `npm install --save-dev mongodb-memory-server` to install that package as a development dependency.

The `beforeAll` function creates the database (once, before all tests in that file). The `beforeEach` and `afterEach` functions seed the database with a pair of sample articles in the 'articles' collection (and deletes all articles after each test). Note that the `insert` function automatically modifies its input object with the `_id` field (that is, it will actually modify the objects stored in `articles`).

The advantage of this approach for testing is that each test suite executes in a "fresh" and independent database instance, you don't need to manually start a separate server, and no additional configuration is required to run tests on Travis CI.

Run the tests with `npm test`. The test for the GET '/articles' route you implemented above should pass but most every other test should not. Let's update the remaining routes in a TDD approach.

## Implementing the Routes

Recall that the Simplepedia API looks like:

| Endpoint            | Command | Action                                                                                                             |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| /api/articles       | GET     | Fetch the entire article collection as an array                                                                    |
| /api/articles       | POST    | Add a new article to the collection (the new article should be provided as the JSON-encoded request body)          |
| /api/articles/_:id_ | PUT     | Update the article with `id` of _:id_ (entire updated article should be provided as the JSON-encoded request body) |
| /api/articles/_:id_ | DELETE  | Remove the article with `id` of _:id_                                                                              |

Implement the other three routes. As you do, pay attention to the code you are replacing. In some instance, you will want to preserve the functionality (i.e., the routes should still return the same values). In other instances, you may find that you can throw away the functionality (e.g., you no longer need to manually attach ids.).

Relevant query methods will be
[`insertOne`](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#insertOne),
[`deleteOne`](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#deleteOne)
and
[`findOneAndUpdate`](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#findOneAndUpdate).

### Gotcha #1

Make sure that you read the documentation carefully to figure out what you need to pass to the functions and what the return values are. For example, by default `findOneAndUpdate` returns the original article, not the newly updated article. Set the options appropriately to obtain the desired behavior.

### Gotcha #2

The three functions listed above take an optional callback. If you don't pass the callback, the functions return Promises, with the values that would have been passed to the callback available to the function you write in the `then()`. To learn about what about type the Promise will resolve to, click through to the documentation of the `callback` argument, e.g. [`insertOneWriteOpCallback`](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~insertOneWriteOpCallback) for `insertOne`. In the Promise version of the API we are using, there is no `error` argument, just the `result` argument (errors are handled by rejecting the Promise). In the case of `insertOne`, the result will be of type [insertOneWriteOpResult](http://mongodb.github.io/node-mongodb-native/3.3/api/Collection.html#~insertOneWriteOpResult) with the inserted document in the `ops` property (an array).

### Gotcha #3

Recall that `:id` parameters in the routes needs to be a unique identifier for for the article. Often this identifier is an integer, but in this case, the unique identifier we have is the automatically generated `ObjectID`, which is a binary object. This gets converted to a string when we take the value out of the database. However, we need to convert the string back to a proper binary `ObjectID` when we are communicating with the database.

Fortunately, we have a tool for converting from string to `ObjectID`: `ObjectID.createFromHexString()`. The `ObjectID.createFromHexString` method converts the string in the URL into the `ObjectID` object used by MongoDB and needed in the query. `ObjectID` is provided by the `mongodb` package, so it needs to be imported at the top of `routes.js` (I have already done this for you).

As an example of when you need to use this, when we update an article, we need to convert the `_id` back to `ObjectID` form so it is recognized by mongo. This is one way we could do this:

```javascript
const updatedArticle = {
  ...request.body,
  _id: ObjectID.createFromHexString(request.params.id),
};
```

### Gotcha #4

By default `findOneAndUpdate` doesn't return the updated article (notice in the options that `returnOriginal` defaults to `true`). Provide an options argument with that property set to `false` to force the driver to return the updated object.

### Validations

The basic query operations should resolve many of your test cases. However, queries alone will not address missing or non-unique fields. As discussed in lecture, we often use ORM libraries to implement validations in a DRY manner (via Aspect-Oriented Programming or AOP). For MongodDB, this is often the [Mongoose](http://mongoosejs.com) library.

However, for simplicity, you will just implement the necessary validations in the routes. For instance to define a default value for the `extract` and check if `edited` is defined, you could implement something like the following:

```javascript
const newArticle = { extract: "", ...request.body };

if (!newArticle.edited) {
  response.sendStatus(400);
  return;
}
```

The conditional will set the status to "bad request" and terminate the handler if the `edited` property is not defined (i.e. "falsy").

Preventing duplicate article titles is trickier. To know if an article title already exists, we would need to query the database before writing. We can certainly do so. However, it will be more efficient to create an [index](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/) on the article title that enforces uniqueness. For example the following was added the end of the Promise chain in `beforeAll` to create a "unique" index on the `title` field.

```javascript
.then(() => {
  db.collection('articles').createIndex(
    { title: 1 },
    { unique: true },
  );
});
```

The index is why the "Should reject article with duplicate title" tests are passing (or should be).

At this point all of your tests should be passing. However, we only added the index to the test database -- not the database that the server will actually use. To continue to automate all of the things, we will add another command to our `mongo:init` script that creates the index using the `mongo` command line tool.

```sh
 "mongo:init": "npm run mongo:purge; mongo localhost:5000/simplepedia --eval \"db.articles.createIndex({ title: 1 },{ unique: true })\"; npm run mongo:seed"
```

_Note that this validation will not work for UPDATE operations (i.e., `put`). If an update arrives without a title, the assumption will be that you want to use the old title. If this behavior is desirable or not will depend on how you are going to use it._

## When You Are Done

Theoretically, when you finish, you should be able to redirect the Simplepedia client you wrote in assignment 4 to interact with your new server. Unfortunately, it is not that simple. Because MongoDB uses `_id` instead of `id`, a number of things will fail in strange ways.

## Finishing Up

1. Add and commit your changes to Github. _Make sure to add and commit the new files you created._
1. Submit your repository to Gradescope.

## Grading

| Points            | Requirement              |
| ----------------- | ------------------------ |
| &#x2713;/&#x2717; | Basic routes work        |
| &#x2713;/&#x2717; | Validation tests pass    |
| &#x2713;/&#x2717; | Passes all ESLint checks |
