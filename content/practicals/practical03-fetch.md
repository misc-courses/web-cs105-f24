---
title: "CS 312 - Practical Three"
date: "2019-10-01"
dueDate: "2019-10-02 5p"
path: "/practicals/practical03"
template: "assignment"
name: "Practical 3"
published: true
---



#### Goals

- Convert Film Explorer to use a RESTful API to fetch data
- Practice using `fetch` and Promises
- See how the CRA development server can be integrated with another content server during development.

Today, you will be converting the [standalone version of Film Explorer](https://github.com/csci312-f19/example-filmexplorer-standalone) to use `fetch` to load its data. 

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/nM5tWNjt) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install` inside the root
   directory of the newly cloned repository. 

    You may see warnings like the following. These can be ignored for this practical.
    ```
    npm WARN ts-pnp@1.0.1 requires a peer of typescript@* but none was installed.
    npm WARN jest-styled-components@6.3.1 requires a peer of styled-components@^2.0.0 || ^3.0.2 but none was installed.
    ```

1. Before you make any changes, create a feature branch named "use-fetch" to segregate your modifications from the master branch:

```
git checkout -b use-fetch
```

# Fetching Data with AJAX 

This version of Film Explorer, much like Simplepedia is making use of webpack to load the data via an `import` statement. 

```JavaScript
import filmData from './films.json';
```

While this works, it is atypical. It can cause long initial load times and worse, it means the user only works with a local version of the data, so changes don't persist (try rating a few films and then reloading the page). Your task today is to adapt the standalone Film Explorer to fetch its data from the Film Explorer API and persist the ratings.


## Proxying

You will be communicating with a server running on basin at
`http://basin.cs.middlebury.edu:5042`. The REST interface can be found at
`/api/films`, which can be optionally followed by an id. The full API is:

| Endpoint | Method	| Action |
| -------- | ------ | ------ | 
| /api/films | GET | Fetch the entire movie collection as a JSON array |
| /api/films/`id` |GET	| Fetch the movie with `id` as JSON |
| /api/films/`id` | PUT | Update the movie with `id` (the new JSON-serialized movie object should be in the request body) |


You can interact with this API directly in your browser by visiting <http://basin.cs.middlebury.edu:5042/api/films>, to see a full list of the movies, or <http://basin.cs.middlebury.edu:5042/api/films/11> to see the movie with an `id` of 11 (Star Wars). 

CRA supports [proxying](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#docsNav) API requests in development. That is, the development server (which you started with `npm start`) will proxy any requests that aren't for static assets to another port or server. This helps us mimic in development the typical production setup in which the React app is served from the same host and port as the back-end implementation, and thus you can write `fetch('/api/films')`
(instead of `fetch('http://basin.cs.middlebury.edu:5042/api/films')`).

To enable proxying to another server in development, you can add a `"proxy"` field to your `package.json` file, e.g.:

```json
"proxy": "http://basin.cs.middlebury.edu:5042"
```

Do this now. Remember that JSON key-value pairs need to be separated by commas. Thus depending where you add the above line among the top-level fields in your `package.json` file, you may need to add a comma before or after. Once you have updated the `package.json` file, start the development server with `npm start`. If you have already started the development server you will need to restart it anytime you make changes to the `package.json` file (the auto-reload for the development server or the test runner can't detect changes in `package.json`).

 You may see errors like this in the console:

 ```
 Could not proxy request /sockjs-node/086/t4nmjsb1/websocket from localhost:3000 to http://basin.cs.middlebury.edu:5042.
 ```

This seems to have something to do with the internals of the react development server and does not seem to actually effect the running of the application.

## Fetching the Films

Following the example in class, adapt the `FilmExplorer` component (in `FilmExplorer.js`) to fetch its data from the server API. Specifically:

**Step one**: Comment out the line `import filmData from './films.json';` as we will no longer load the movies directly.


**Step two**: Replace the simple call to `setFilms` with the fetch call shown in lecture.


```javascript

fetch('/api/films/')
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    setFilms(List(data));
  })
  .catch(err => console.log(err)); // eslint-disable-line no-console

```

Launch the development server with `npm start`. Make sure you can successfully load the movie data from the server.

## Updating the Movie Rating

In the standalone Film Explorer the `setRating` method in the `FilmExplorer` component uses `map()` to create a new list in which the film object being rated is replaced with a new one with a new rating. Your next task will be to modify this function to persist changes back to the server.

Rather than starting by updating the objects and the List that encloses it, we will first create a modified version of the film, and send it to the server. The server will update its record and send the film's data back. Once the response has been received, you can modify the state with the new record. By using the data returned from the server, we are giving the server the opportunity to validate and possibly further modify the data (in this case, the data is not being further modified, but we will see instances when this is important later).

The steps in your new `setRating` method (replacing all of the existing code):

**Step one**: Comment out the body of the `setRating` function. We will want to refer back to this later. 

**Step two**: Find the full record for the film being modified. Since the `setRating` method only has the movie's id, you will need to use the `find` method on the List to obtain the complete film object. While `films` is an Immutable.List object, you will find that the `find` function works the same as [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), which has better documentation.

**Step three**: Create an updated film object with the new rating. Recall that you don't want to modify state, so make a copy of the movie using the spread pattern, i.e.

```javascript
const newFilm = { ...oldFilm, rating: rating};
```

**Step four**: Construct your PUT request to `` `/api/films/${filmid}` `` (URL created with string interpolation). By default `fetch` uses GET. To create a PUT request, supply an optional `init` argument specifying the method, body (serialized JSON representation of the new movie object) and headers specifying that the client is sending JSON
   ([docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)):

```javascript
fetch(`/api/films/${filmid}`,{
    method: 'PUT',
    body: JSON.stringify(newFilm),
    headers: new Headers({ 'Content-type': 'application/json' })
  })
```

**Step five**: Use a Promise to read the response. This response will be in JSON, just as it was for the initial `fetch`. You can copy and paste the code you used for the full collection of data with respect to the chained promises that receive the response and then parse it.

**Step six**: Update the state with the new data. If you copied and pasted the response above, the code will attempt to change the state variable `films` to the new data, which we don't want because we only have a single film now. 

Instead, use the `map` pattern from the commented out code to create a new List, replacing the old film record with the new one. You do not need to use the spread syntax, just return the new film record at the appropriate moment.

**Step seven**: Try it out. Rate some things. You should see that they will persist when you reload the page now. 

*Note that you are all sharing the same server now, so when you make a change, you are actually changing the rating for everyone. However, since we don't poll for changes, and we only receive data about films that we just changed, you won't see the effect of this unless you reload the page.*

## Finishing Up

To finish up, we are going to merge the changes you made back into the `master` branch. Rather than doing this directly on the command line, we are going to make use of GitHub's "pull request" (PR) mechanism. This is about building habits that will be useful when we get to working on teams. The PR signals that you are ready to merge into the `master`  branch and gives other team members an opportunity to review your changes before `master` is updated.

Add and commit your changes to your `use-fetch` branch. Push those changes GitHub on the `use-fetch` branch.

```
git push origin use-fetch
```

Open your repository at GitHub and create a pull request (PR) to merge the changes from your newly pushed `use-fetch` branch onto the `master` branch. You should be able to create the PR on the main page of your repository or alternately you can create a PR from the "Pull request" tab.

Navigate to the page for your PR. Here you will see some notification indicating if the branch can be cleanly merged into the `master` branch. Make sure it indicates that a good merge can be made. press the `Merge` button to merge your changes. Once you have merged the changes you can delete the feature branch on GitHub using the button that replaces the 'Merge' button.

Clean up your local repository after the merge. Return to the `master` branch on your local computer, pull the changes from GitHub pruning deleted remote tracking references. Then delete your local branch. To avoid mistakes when deleting branches, add the `--dry-run` option to the `--prune` option, e.g. `git pull --prune --dry-run` to double check before actually pruning anything. The command sequence is:

```
git checkout master
git pull --prune
git branch -d use-fetch
```

Finally, submit your repository on Gradescope.


## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Use `fetch` to fetch data
&#x2713;/&#x2717; | Update `setRating` to persist changes on the server
&#x2713;/&#x2717; | Passes all ESLint checks 


