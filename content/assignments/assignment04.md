---
title: "CS 312 - Assignment Four"
date: "2019-10-07"
dueDate: "2019-10-18 5p"
path: "/assignments/assignment04"
template: "assignment"
name: "Assignment 4"
published: false
---

#### Goals

- Learn how to incorporate REST server interaction into your app
- Experience refactoring to fit changing requirement

## Prerequisites

1.  Click the GitHub classroom [link](https://classroom.github.com/a/90MqMJ5L)[^availability] and then clone the repository GitHub classroom creates to your local computer as you did in previous assignments.
2.  Update the author information in the `package.json` file
3.  Install the package dependencies with `npm install`

        When you install the dependencies you may get warnings like below. These can safely be ignored.

        ```
        npm WARN ts-pnp@1.0.0 requires a peer of typescript@* but none is installed. You must install peer dependencies yourself.
        npm WARN jest-styled-components@6.3.1 requires a peer of styled-components@^2.0.0 || ^3.0.2 but none was installed.
        ```

    Once you have the dependencies installed you can start the development server with `npm start`. Employ good Git practices by creating a working branch for your features.

## Background

This assignment mirrors [the REST practical](../practicals/practical03) in which you converted FilmExplorer to use a server for data persistence. You will be transitioning Simplepedia over to server-maintained data management. You will also add functionality to the client to allow articles to be deleted.

### The server

You will be communicating with a server running on basin at `http://basin.cs.middlebury.edu:3042`. The REST interface can be found at `/api/articles`, which can be optionally followed by an id.

The server API looks like this (`:id` indicates a parameter that should be replaced with a valid article `id`):

| Endpoint            | Command | Action                                                                                                             |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| /api/articles       | GET     | Fetch the entire article collection as an array                                                                    |
| /api/articles       | POST    | Add a new article to the collection (the new article should be provided as the JSON-encoded request body)          |
| /api/articles/_:id_ | PUT     | Update the article with `id` of _:id_ (entire updated article should be provided as the JSON-encoded request body) |
| /api/articles/_:id_ | DELETE  | Remove the article with `id` of _:id_                                                                              |

In the case of both PUT and POST, the server will send back the new article. On DELETE the server will not send back anything, just the response status.

**Note that you will now all be sharing one central data store! By all means test thoroughly, but be mindful of others (i.e. don't delete all the articles). The server will refresh hourly with the seed data, but try not to corrupt it in between refreshes (and post on Piazza if it becomes too much of a mess). If you break the server, you break it for everyone...**

The server implements server-side validations and will respond with an error (HTTP status code 400 or 500) if your request or data is ill-formed or otherwise invalid. An example of the latter is creating an article with a duplicate title. We suggest keeping the browser developer tools open while working on the assignment to monitor your requests and the corresponding responses.

<!-- Maybe error handling should be added? -->

## Assignment

### Part 1: Prepare for REST by doing some refactoring

Simplepedia currently uses a Map to provide you with the experience of using the data structure and to make it a little easier to reason about sections.

The server, however, will be sending you a flat array of the documents. Rather than using my function to convert that list into an Immutable Map, you are going to simplify and convert it to an [Immutable List](https://immutable-js.github.io/immutable-js/docs/#/List/List).

This change will ripple down to IndexBar, which will now need to do some more work to figure out the sections and corresponding titles.

To start this process, change the state and effect hooks in `App` so that `collection` is a `List` derived directly from the seed data (e.g., `setCollection(Immutable.List(data))).

Do the necessary refactoring to `App` and `IndexBar` to restore browsing. Don't worry yet about adding and editing -- there will be additional changes to be made there.

### Part 2: Load the data from the server

Just as we did with the Film Explorer, switch from getting the data from the local copy and instead fetch it from the server. Note that the articles your receive from the server will have a new `id` property. You should use these as a more reliable unique identifier in your code (e.g. for the `key` property in `IndexBar`).

### Part 3: Handle edits and additions

Rewrite `handleEditorReturn()` so that it handles edits and additions. This will require a little bit of restructuring of the code. Currently, the only difference between an edit and an addition is that if we are editing, we delete the old version first. When using REST, updates and additions are two different functions (note that we expect you to do this properly and not just issue a `DELETE` command).

As with the Film Explorer example, you will tell the server about the new or updated article, and the server should return a copy of the article back to you. You then want to add the article into the collection, removing the old one if it exists. As the collection is now a state object, you should replace, not modify, the collection for the state change.

### Part 4: Add a Delete button

Next to the Edit button, add a "Delete Article" button that deletes the current article. All of the caveats about communicating with the server and updating the state apply here as well. Write a new instance method on the `App` component to handle this.

For the Delete button, you should practice TDD. Start by writing some new tests that would fail and then write code to make the tests pass. Place your tests in `App.test.js` in a test suite called "Delete unit tests" (this test suite has been created at the bottom of `App.test.js` for you).

### Finishing up

To earn full points for code organization and style your submission should not have ESLint warnings or errors when run with `npm run lint` (or `npx eslint .`). Remember than you can fix many errors automatically with `npm run lint -- --fix` (although since ESLint can sometimes introduce errors during this process, we suggest committing your code before running "fix" so you can rollback any changes). As described in the README, the assignment skeleton includes the Prettier package and associated hooks to automatically reformat your code to a consistent standard when you commit. Thus do not be surprised if your code looks slightly different after a commit.

Submit your assignment by pushing your changes to the GitHub classroom via `git push --all origin` and then submitting your repository to Gradescope. You can submit (push to GitHub and submit to Gradescope) multiple times. The last submission before the deadline will be the one graded.

Portions of your assignment will undergo automated grading. Make sure to follow the specifications exactly, otherwise the tests will fail (even if your code generally works as intended). Use the provided test suite (run with `npm test`) to get immediate feedback on whether your code follows the specification (remember that the provided tests are not exhaustive, and an application that passes all of these tests is not guaranteed to be correct). Because of the increased complexity of a React application, Gradescope can take minutes to run all of the tests. Thus you will be more efficient testing locally and only submitting to Gradescope when you are confident your application meets the specification.

### Grading

| Points | Criteria                                   |
| ------ | ------------------------------------------ |
| 5      | Conversion of collection to array          |
| 5      | Loads collection from the server           |
| 5      | Updates articles on the server             |
| 5      | Adds articles to the server                |
| 5      | Deletes articles from the server           |
| 5      | Tests for delete functionality             |
| 5      | Code organization, design, comments, style |

### FAQ

##### Do I need to implement unit testing?

Yes! As with previous assignments, the skeleton includes some unit tests to assist you in your development and to ensure that the grading scripts can automatically test your submission. We are also asking you to practice TDD design when you add your delete button.

##### What if the tests and assignment specification appear to be in conflict?

Please post to Piazza so that we can resolve any conflict or confusion ASAP.

[^availability]: Assignment 4 starts with the solution to Assignment 3. The link will be available after the assignment 3 due date.
