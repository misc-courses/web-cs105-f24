---
title: "CS 312 - Practical Eight"
date: "2019-10-29"
dueDate: "2019-11-01 5p"
path: "/practicals/practical08"
template: "assignment"
name: "Practical 8"
published: false
---

In this practical you will adapt a simple memory-backed server for Simplepedia to use a RDBMS backend. We will test our implementation against the SQLite file-based database, but by using the [Knex library](http://knexjs.org). The same code would also work with MySQL or PostgreSQL (Heroku, for instance, provides PostgreSQL).

#### Goals

- Gain familiarity with RDBMS-backed servers, Knex, SQLite, and the Objection ORM library.
- Implement model validations as an example of aspect-oriented programming (AOP).
- Employ code generators. Code generation (like with CRA) is very a helpful feature for working with complex libraries (that, for example, expect specific files in specific directories).

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/k66Epe6q) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install` inside the root directory of the newly cloned repository.

1. Make sure that you have installed `sqlite3` as described in [Getting Started](../resources/getting_started).

## Setup Knex

Knex is both a library and a command line tool (usable via `npx`). Install Knex and the database clients (for SQLite 3 and PostgreSQL):

```
npm install --save knex sqlite3 pg
```

Initialize Knex with `npx knex init`. This will create a configuration file named `./knexfile.js`.

Remove the descriptions of the staging and production servers. Edit the file to look like the snippet below. You are configuring a SQLite-based `test` environment (using a specific seed and database file), an SQLite-based `development` environment and a `production` configuration using PostgreSQL. You won't need to use the production configuration today, but you would use something similar when deploying to Heroku (e.g., for your project).

```javascript
module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./simplepedia-test.db",
    },
    useNullAsDefault: true,
    seeds: {
      directory: "./seeds/test",
    },
  },

  development: {
    client: "sqlite3",
    connection: {
      filename: "./simplepedia.db",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: true,
  },
};
```

## Make a Knex Migration

Recall that migrations are how we automatically configure the database. Each migration has two parts, the "up" function which makes the desired changes to the database, e.g. create a table or add a column, and the "down" function which reverts those changes. For SQLite, running the migration will also create the database file if it doesn't exist.

Create a skeleton for a migration with `npx knex migrate:make load-articles`. This command will create a new folder called `migrations`, in which you will find your new migration file (note the date in the file name so the current state of the database schema can be tracked). You will need to fill in the `exports.up` (which should create your table) and `exports.down` (which should delete or "drop" the table) using the Knex [schema builder API](http://knexjs.org/#Schema).

In the database, you want to create a table named `Article` with the four columns that correspond to the Article properties. Recall from the programming assignments that the four properties are: `id`, `title`, `extract`, and `edited`. The `id` field should be of type `increments`, an auto-incrementing integer, ensuring that each article has a unique id number (Knex automatically sets the `increments` column as the primary key). The remaining columns should be `string` or `text` as shown below. The difference between `string` and `text` is the intended size: `string` is typically of shorter, fixed, length, while `text` implies a longer, variable-length, string. The actual implementation will depend on the underlying database (e.g. SQLite has only variable length strings). Refer to Film Explorer for an example [migration](https://github.com/csci312a-s19/film-explorer/blob/master/server-sqlite/migrations/20180125140716_movie-db.js).

<!-- Do we provide them the schema or make them work from the example? -->

```javascript
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function (knex, Promise) {
  return knex.schema.createTable("Article", (table) => {
    table.increments("id");
    table.string("title");
    table.text("extract");
    table.string("edited");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("Article");
};
```

When defining the schema, you can specify additional constraints on the columns (as chained methods). What additional constraints should exist on the articles? Can there be articles with identical titles? Can the edited time be null? Add additional constraints to your schema.

<hidden-block message="View the schema">

```javascript
table.increments("id");
table.string("title").unique().notNullable();
table.text("extract");
table.string("edited").notNullable();
```

</hidden-block>

Once you have completed your migration, run any [unperformed migrations](http://knexjs.org/#Migrations) (in this case just one) with the following command. Note we are explicitly specifying the environment (and thus the database that should be modified).

```
npx knex migrate:latest --env development
```

The migration should have created a `simplepedia.db` file. To check out the current schema, open the database with the SQLite client application via `sqlite3 simplepedia.db` and execute `.schema` at the interpreter prompt. You should see the schema for your new `Article` table (as well as a `knex` table that `knex` added to keep track of migrations -- don't tinker with this). To get of the `sqlite3` command line, type <kbd>Ctrl+D</kbd> or `.exit`.

_The `sqlite3` client accepts two different types of commands. You can type raw `SQL` statements to interact with the database directly, or you have a small collection of system commands for working with the client. The system commands all start with a dot (like `.schema`). You can get a full list of these commands with `.help`._

## Seeding the Article Data

"Seeding" is the process of pre-populating databases. It is worth noting that we frequently do not need to do this. If you are making a blog, online market, scheduling tool, etc, your content comes dynamically from your users. Even Simplepedia could conceptually be started "clean". However, seeding will frequently be used for testing.

### Create the Seed File

Seed files are short scripts that populate the database. Create a skeleton seed file with:

```javascript
npx knex seed:make load-articles --env development
```

The above command should have created a `seeds/load-articles.js` file. Modify that file to read in the article from the `seed.json` file and insert it into the database. For variety (and simplicity), we will use Node's synchronous file I/O interface this time. Update the code generated by Knex to look like the below:

```javascript
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex, Promise) {
  const contents = fs.readFileSync("seed.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, colName: "rowValue1" },
        { id: 2, colName: "rowValue2" },
        { id: 3, colName: "rowValue3" },
      ]);
    });
};
```

Modify the `exports.seed` function by changing `table_name` to match your table name (i.e. `Article`).

If you followed the directions above, the column names in the database match the property names of the objects in the `data` Array. Those objects can be passed directly to the `insert` function (the database itself will generate the `id` property). However, we have too much data to just pass the array to `insert`, instead we need to use Knex's [`batchInsert` utility](http://knexjs.org/#Utility-BatchInsert) to insert the article in blocks (in this case in blocks of 100 articles).

```javascript
exports.seed = function (knex, Promise) {
  const contents = fs.readFileSync("seed.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("Article")
    .del()
    .then(() => knex.batchInsert("Article", data, 100));
};
```

### Run the Seed

Run the seed with `npx knex seed:run --env development` to populate your database. Now reopen your database with the SQLite3 command-line tool via `sqlite3 simplepedia.db`. Execute the following command in the SQLite interpreter to view the first 10 articles.

_A note about SQLite grammar: the semi-colon is required, but the keywords in SQL are not case-sensitive. You will frequently see them in all caps, but the parser will accept them either way._

```sql
select * from Article limit 10;
```

While you have the interpreter open, experiment with a few SQL queries. How could you query for just the article with `id` of 11, or all the articles with titles that start with 'C' (and thus would be shown in the 'C' section of the Simplepedia client? Specifically what `where` conditions would you use in your query?

<hidden-block message="View queries">

```sql
select * from Article where id = 11;
select * from Article where title like 'C%';
```

</hidden-block>

## Update the Server

### Connect to the database

Before you can update the routes in `routes.js` to use the database, you need to initialize Knex. Do so in `routes.js` by `require`ing the Knex configuration and use that configuration to initialize the `knex` package itself. Note the common pattern in which we use `process.env.NODE_ENV` to specify the environment (e.g. `production`, `development`, etc.) or default to `development`.

```javascript
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);
```

### Update the GET '/articles' Route

In order to fetch all of the articles, you want to perform a select [query with Knex](http://knexjs.org/#Builder). If you don't give the function any arguments, it is the equivalent of `SELECT *`, which returns all the columns. As with the queries described earlier, the Knex Query builder [creates a Promise](http://knexjs.org/#Interfaces-Promises). The function you provide to `then()` should take one argument, the array of results. You can send this array back to the client directly with `response.send()` as shown below (Express automatically sets the status code and content-type).

```javascript
knex("Article")
  .select()
  .then((rows) => {
    response.send(rows);
  }, next);
```

### Running your Express Server

Now that you are using the seeded database, you no longer need the `articles` initialization code in `index.js`. Simplify the server startup in `index.js` to just:

```javascript
/* eslint-disable no-console */
const http = require("http");
const { app } = require("./routes");

const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log("Listening on port %d", server.address().port);
```

You can start your server in the usual way (`npm start`), or you can use `npm watch`, which will launch the `nodemon` tool. This will give you the hot loading behavior you were familiar with from using `create-react-app`.

Test your newly created route with curl or via the browser at <http://localhost:3001/api/articles>.

```
curl http://localhost:3001/api/articles
```

You should see a long array of articles.

## Enable Testing

The skeleton includes a simple test suite using the [SuperTest](https://github.com/visionmedia/supertest) library, like you implemented in a previous [practical](practical-server.html). You will need to update this test suite to work with Knex.

1. Export the `knex` object from `routes.js` instead of `articles` so that it can be used in the testing functions) and import it in `routes.test.js` (again instead of `articles`).
1. Take a look at `routes.test.js`. Notice that in the `beforeEach` function, the test suite resets the `article` object to a consistent state. We want to do the same by rolling back the database (invoking all the "down" functions in the migrations), then migrating and seeding the test database anew before each test. That way the database is always in a known, "clean", state and the tests are Independent and Repeatable (recall FIRST). Replace the `beforeEach` function and add an `afterEach` function like shown below:

   ```javascript
   beforeEach(() => {
     return knex.migrate
       .rollback()
       .then(() => knex.migrate.latest())
       .then(() => knex.seed.run());
   });

   afterEach(() => {
     return knex.migrate.rollback();
   });
   ```

   The Jest test runner automatically sets `NODE_ENV=test`; thus Knex will use the test database you defined in `knexfile.js` (not the development database you just seeded). Note the simpler `./seeds/test/load-articles.js` script. In test mode the database is just seeded with a single article. This is just one example of how being able to define different database environments is a very helpful feature of Knex.

Now run the tests with `npm test`. The test the GET '/articles' route you implemented you should pass but most every other test should not.

Many of the failures are related to validation. You could successfully implement the Simplepedia API just using Knex. However, you would need to duplicate any validation code and use Knex's "low level" query interface. Instead, we will implement the server using the [Objection.js](https://vincit.github.io/objection.js/) ORM.

## Switching to the Objection ORM

### Creating the Model

Install the package `npm install --save objection` and create a
`models/Article.js` file with the following:

```javascript
/* eslint-disable camelcase */
const { Model } = require("objection");

class Article extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Article";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        extract: { type: "text" },
        edited: { type: "string" },
      },
    };
  }
}

module.exports = Article;
```

The `jsonSchema` function specifies the properties of the model using the [JSON Schema specification](https://spacetelescope.github.io/understanding-json-schema/index.html). With just this schema you can implement additional validation, such as numerical limits, etc., beyond what is possible with just SQL. You can further customize the [validation methods](https://vincit.github.io/objection.js/#custom-validation) if needed.

### Using the Model to create Queries

To use your newly created Model, require the necessary modules in `routes.js` and bind your Objection models to the Knex instance (so that the models can execute queries against the database).

```javascript
const { Model, ValidationError } = require("objection");
const Article = require("./models/Article");

// Bind all Models to a knex instance.
Model.knex(knex);
```

Update your GET '/articles' query to use your Model instead of Knex like shown below. The [default query](https://vincit.github.io/objection.js/#fetch-queries) fetches all the articles from the database.

```javascript
// Notice the "next" argument to the handler
app.get("/api/articles", (request, response, next) => {
  Article.query().then((rows) => {
    response.send(rows);
  }, next); // <- Notice the "next" function as the rejection handler
});
```

Your server should now successfully return all of the articles. Rerun your tests. The "GET" test should still be passing. You may see warnings like below; these can be ignored in this context.

```
(node:21446) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 start listeners added. Use emitter.setMaxListeners() to increase limit
```

Notice the inclusion of `next` as an argument in the route handler and an as argument to the `then` function. The second (often unused) argument to [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) is the rejection handler. Thus `next` will get invoked with the `Error` object as an argument if the Promise is rejected. Doing so triggers Express to [invoke the error handling middleware](https://expressjs.com/en/guide/error-handling.html) added at the end of `routes.js`. This another example of Aspect-Oriented Programming in action. Instead of including explicit error handling in each route, e.g. something like `.catch(err => response.sendStatus(500))`, we can implement that error handling once and use it for all routes.

Now update the rest of the handlers to work with your newly created `Article` model. The relevant [Objection.js query methods](https://vincit.github.io/objection.js/api/query-builder/) will likely be `insertAndFetch`, `deleteById` and `updateAndFetchById`. These will all need to be called on a query (`Article.query().insertAndFetch(...)`) like shown above, not on the raw model (`Article`). All of your routes should be similar and have just a few lines of code. Those methods will require one or more arguments, e.g. the article you will be inserting into the database or the Id of the article you want to delete.

Rerun your tests and make sure that the _basic_ operations of `GET`, `POST`, `PUT`, and `DELETE` all pass (the first one of each test suite).

One feature missing in the skeleton is validating the `id` property on PUT request. As you may have encountered in the Simplepedia assignments, the `id` of object sent in the PUT request must match the URL. We will need to check that requirement is satisfied by writing code in our route handler (that validation isn't a feature of Objection). Use [de-structuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [spreading](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to "split out" just the `id` property like shown below.

```javascript
const { id, ...updatedArticle } = request.body;
```

You can now test if the `id` in the request and in the URL parameter match before proceeding with the update, e.g.

```javascript
// request.params.id is a string, and so needs to be converted to an integer before comparison
if (id !== parseInt(request.params.id, 10)) {
  throw new ValidationError({
    statusCode: 400,
    message: "URL id and request id do not match",
  });
}
// Now update the database entry
```

### Refining Your Validations

With all the routes in place, most, but not all, of the tests should pass. The remaining failing test should be testing what happens if an article is created without an `extract` field.

Since the `id` mismatch validation check depended on both the route and the data, we needed to implement it in the route handler. But this test is just about data integrity, thus it is best addressed in the Model. Modify the `Article` model to include a suitable default (thus fixing that issue everywhere an `Article` instance might be created) making the test pass (i.e., add a `default` field to the `extract` property as described in the JSON Schema [documentation](https://json-schema.org/understanding-json-schema/reference/generic.html)).

We would like our server to be even more robust. At present, we allow any string for the `edited` time, but we should really only allow valid dates. Write a test for an invalid date, and then add to the validation to introduce the necessary constraint. Check out the JSON Schema [documentation](https://json-schema.org/understanding-json-schema/reference/string.html) for strings for relevant examples.

<hidden-block message="Show an example">

First create a possible test for an invalid `edited` time:

```javascript
test("Should reject article with invalid edited time", () => {
  return request(app)
    .post("/api/articles")
    .send({ title: "A title", edited: "4" })
    .expect(400);
});
```

and then add the corresponding constraint in the schema to make that test pass:

```javascript
edited: { type: 'string', format: 'date-time' },
```

</hidden-block>

## Use Your New Server

When you are all done, you can use your newly implemented server with the Simplepedia client you implemented in assignment 4! Start the server you just created for this practical. In another terminal, update the proxy field in the `package.json` file _of your assignment 4 solution_ to point to `http://localhost:3001` (instead of basin). Then start your assignment 4 solution. You should be able to load, create and edit articles just as did before!

## Finishing Up

1. Add and commit your changes to Github. _Make sure to add and commit the new files you created._
1. Submit your repository to Gradescope

## Grading

| Points            | Requirement                                              |
| ----------------- | -------------------------------------------------------- |
| &#x2713;/&#x2717; | Server passes all tests                                  |
| &#x2713;/&#x2717; | Can successfully create and migrate development database |
| &#x2713;/&#x2717; | Tests for (and handles) bad edited field                 |
| &#x2713;/&#x2717; | Passes all ESLint checks                                 |

## Extra

### Other Server Examples

Check out the more complicated [server](https://github.com/csci312a-s19/film-explorer/tree/master/server-sqlite) used by the Film Explorer. The latter demonstrates the use of simple associations in Objection.

<!-- A more complex set of associations (including users and ratings) is on a
[branch](https://github.com/csci312a-s18/film-explorer/tree/add-user/server-sqlite)
in the Film Explorer repository. -->

### Deploy to Heroku

By configuring a production PostgreSQL database, you can deploy your server to Heroku. Add the following properties to your `package.json` file:

```json
"engines": {
  "node": "10.15.x"
},
"cacheDirectories": [
  "node_modules"
],
```

and add the following script entry in `package.json`, `"heroku-postbuild": "npm install"`, to prepare your package for Heroku, then execute the following to create the Heroku application and provision the PostgreSQL database. The latter will define `process.env.DATABASE_URL` in the Heroku environment (which will be picked up by your Knex configuration).

```
heroku apps:create
heroku addons:create heroku-postgresql:hobby-dev
```

Commit all of your changes (don't forget to add the new files you created) and push your commit to Heroku to deploy your application with `git push heroku master`.

Once you have deployed you application, migrate and seed the database on Heroku with the following commands. `heroku run` executes the specified command in the context of your application on the Heroku servers.

```
heroku run 'npx knex migrate:latest'
heroku run 'npx knex seed:run'
```

_Project note: This practical creates just the server (i.e. just the `server` directory in your project skeleton); your project will have both a client and server directories. When performing the migration and seeding on Heroku for your projects, you will need Heroku to run the above commands in the server directory, i.e._

```
heroku run 'cd server && npx knex migrate:latest'
heroku run 'cd server && npx knex seed:run'
```

You should then be able to use curl to test the now deployed API (using the address reported by Heroku), e.g.

```
curl https://stark-inlet-57532.herokuapp.com/api/articles
```

You can test your backend without pushing to Heroku. The database Heroku
created for you is accessible from anywhere. Use `heroku config` to obtain the `DATABASE_URL` variable. Define that variable locally with `?ssl=true` appended, e.g.

```
export DATABASE_URL="postgres://...?ssl=true"
```

then start your server in production mode, e.g. `NODE_ENV=production npm start`.

Just like you directly accessed your SQLite database via the `sqlite3` client, you can do the same with your PostgreSQL database. Download and install one of the many PostgreSQL [clients](https://wiki.postgresql.org/wiki/PostgreSQL_Clients) and use the `DATABASE_URL` from Heroku for the connection information.
