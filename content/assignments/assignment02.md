---
title: "CS 312 - Assignment Two"
date: "2019-09-20"
dueDate: "2019-09-30 5p"
path: "/assignments/assignment02"
template: "assignment"
name: "Assignment 2"
published: true
---

#### Goals

- Implement basic React components with state and callbacks
- Use a linter and code formatter to write more consistent, more maintainable, higher quality, code

The goal of this assignment is to learn the basics of creating a single page web application (SPA) with React. In this and the next few assignments, you will be developing a miniature version of Wikipedia named "Simplepedia". Implementing Simplepedia will provide hands-on experience developing a full single page web application in preparation for completing your large project. Simplepedia was first developed with Davin Chia in Fall 2016 as an independent study.

As with previous assignments, you will need to do additional research (online) to successfully complete the assignment.

## Prerequisites

We created the assignment skeleton with `create-react-app` (its structure should become very familiar to us). We have removed some of the unneeded features and added some styling and seed data.

1. Click the GitHub classroom [link](https://classroom.github.com/a/KI_QMrOh) and then clone repository GitHub classroom creates to your local computer as you did in previous assignments.
2. Update the author information in the `package.json` file
3. Install the module dependencies with `npm install`

   When you install the dependencies you may get warnings like below. These can safely be ignored.

   ```
   npm WARN ts-pnp@1.0.0 requires a peer of typescript@* but none is installed. You must install peer dependencies yourself.
   ```

Once you have the dependencies installed you can start the development server with `npm start`. Practice good Git practices by creating a working branch for your features.

## Background

This week, you will be constructing the basic interface for looking at a collection of articles. Here is the goal you are aiming for:

![Simplepedia](../images/assignments/assignment02-simplepedia.png)

Along the top of the page, there is a list of sections. Clicking on one of the sections displays the appropriate list of articles. Clicking on an article title displays the contents of the article at the bottom of the page. All of the articles have a title, some contents, and a modification date.

As with previous assignments an initial set of (failing) tests are provided as part of the skeleton (run with `npm test`). These tests are intended to help you as you develop your application and to ensure that the grading scripts can successfully test your assignment. Code that passes all of the provided tests is not guaranteed to be correct. However, code that fails one or more these tests does not meet the specification. Testing React applications is a future topic and so you are not expected to write any additional tests for this assignment.

You will notice that there is already a fair amount of code present in `App.js`. In order for this application to be interesting, we need to load in some data. We do this by directly importing `seed.json`, which contains our data. The `mapFromArticleList` function transforms a list of articles into an [Immutable Map](https://immutable-js.github.io/immutable-js/docs/#/Map). This is a data structure that works a little bit like a JavaScript object or a Python dictionary, in that it has key value pairs, but the access methods are a little different. An important feature, is that it is **immutable** -- in other words, any changes you make to it result in a new structure. This is a nice feature for an element we are using for application state since all of our state changes in React should be through its explicit mechanisms. In this particular case, the articles have been grouped together into sections based on the first letter of their title, so the keys of the map are the single letter section names and the values are [Immutable Lists](https://immutable-js.github.io/immutable-js/docs/#/List) of the articles themselves (which are not ordered).

The other new feature that you will find in the `App` component is an [effect hook](https://reactjs.org/docs/hooks-effect.html). In class we looked at [state hooks](https://reactjs.org/docs/hooks-state.html), which give us access to the component's state. An effect hook allows us to add side effects based on the life cycle of the component. In other words, sometimes we have some code that only should be run occasionally. In this instance, we only want to load the data into the state when the component is created, and not for subsequent renders. This is what the empty array in the last argument of `useEffect` is telling React. That array is the list of state variables to watch for changes. Since the array is empty, it never runs again after the first time.

## Assignment

### Part 1: The article browser

With React, the first step is to break the interface down into components:

![Simplepedia](./images/assignment02-simplepedia-components.png)

We will break this interface down into two main components: IndexBar (red rectangle) and Article (green rectangle). We will further break down the IndexBar into IndexSections (blue) and IndexTitles (cyan).

I recommend reviewing a brief [introduction to JSX](https://facebook.github.io/react/docs/introducing-jsx.html) before starting your assignment.

#### IndexBar

The first component you should create is the `IndexBar`. Implement the `IndexBar` in the provided file `src/components/IndexBar.js`. You should pass two props to the IndexBar component. The first, named `collection`, should be a reference to the data collection, and the second, named `select`, should be a callback to be called when a title is selected. Make sure to use these names (and any others specified in the assignment) to facilitate automated testing.

Internally, you will have two sub-components, though you do not necessarily need to make them actual sub-components. The sections list (the individual letters across the top) should be implemented as an unordered list (`<ul>`). Wrap this in a `<div>` with the id "section-list". The styling is designed to turn your list into the horizontal form seen in the pictures.

You should add an `onClick` callback to each `<li>` in the list which sets the current section as state for the `IndexBar`.

The second sub-component should be the list of titles found within the current section. This should also be implemented as an unordered list. You should sort the titles like shown in the screenshot ("unordered" just means that the list isn't displayed as a numbered list). For these `<li>`, make sure to invoke the callback that was passed down with the props when the user clicks on a title. Your code should invoke `select()` with the article associated with the `<li>`.

Finally, when the user clicks a new section, you should invoke the `select` callback with a missing (thus `undefined`) argument to indicate that the current article should be "cleared", i.e. not show.

When you are done, the HTML must look like:

```
<div>
  <div id="section-list">
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  </div>
  <div>
    <ul>
      <li>Apple</li>
      <li>Anteater</li>
      <li>Auton</li>
    </ul>
  </div>
</div>
```

Here is one way to transform an array into an HTML list:

```
const list = ['daleks', 'cybermen', 'ice warriors', 'autons'];
const races = list.map(race => (<li key={race}>{race}</li>));

return (<ul>{races}</ul>);
```

which would produce this HTML:

```
<ul>
  <li>daleks</li>
  <li>cybermen</li>
  <li>ice warriors<?li>
  <li>autons</li>
</ul>
```

#### Article

The next component you should implement is `Article` (in the provided file `src/components/Article.js`). The `Article` component should take one prop named `article` that is an article record Object. Our articles have three fields: "title", "extract" (the contents), and "edited" (the time the article was last edited).

In your `Article` component display the title, text, and date. The entire article should be contained in a `<div>` with the id "article". The title should have the id "article-title", the text should have the id "article-text", and the date should have the id "article-timestamp" (there are styles for some of these). To ensure consistent date formatting, render the date in a locale-relevant format with [`Date.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString). Note that this will not necessarily match the picture -- it will render the date as appropriate for your computer/browser/environment.

#### Putting the components together

In `src/App.js` integrate your newly created components. You should add the title (Simplepedia) as a `<h1>` header with the id "title" and your two components to the page. You need to make sure that you pass the appropriate callbacks as props so that clicking on a section opens the title list, and clicking on a title opens the related article for viewing. If there is no article to show at the current moment, best practice is to not render the `Article` component (via [conditional rendering](https://reactjs.org/docs/conditional-rendering.html)) as opposed to rendering `Article` but having it somehow manage an undefined `article` prop. The latter forces additional complexity into the `Article` component and in the case of more complex components can trigger unnecessary computation.

### Finishing up

To earn full points for code organization and style your submission should not have ESLint warnings or errors when run with `npm run lint` (or `npx eslint .`). Remember than you can fix many errors automatically with `npm run lint -- --fix` (although since ESLint can sometimes introduce errors during this process, we suggest committing your code before running "fix" so you can rollback any changes). As described in the README, the assignment skeleton includes the Prettier package and associated hooks to automatically reformat your code to a consistent standard when you commit. Thus do not be surprised if your code looks slightly different after a commit.

Submit your assignment by pushing your changes to the GitHub classroom via `git push --all origin` and then submitting your repository to Gradescope as described [here](../../resources/gradescope.html). You can submit (push to GitHub and submit to Gradescope) multiple times. The last submission before the deadline will be the one graded. Portions of your assignment will undergo automated grading. Make sure to follow the specifications exactly, otherwise the tests will fail (even if your code generally works as intended). Use the provided test suite (run with `npm test`) to get immediate feedback on whether your code follows the specification (remember that the provided tests are not exhaustive, and an application that passes all of these tests is not guaranteed to be correct). Because of the increased complexity of a React application, Gradescope can take minutes to run all of the tests. Thus you will be more efficient testing locally and only submitting to Gradescope when you are confident your application meets the specification.

## Grading

| Points | Criteria                               |
| ------ | -------------------------------------- |
| 5      | Code organization, comments, and style |
| 5      | IndexBar section list display          |
| 5      | IndexBar section list functionality    |
| 5      | IndexBar title list display            |
| 5      | IndexBar title list functionality      |
| 5      | Article display                        |

## FAQ

##### Do I need to implement unit testing?

We will learn later in the semester how to unit test React components. For this assignment you are not expected to implement any of your own unit tests. The skeleton includes some unit tests to assist you in your development and to ensure that the grading scripts can automatically test your submission.

##### What if the tests and assignment specification appear to be in conflict?

Please post to Piazza so that we can resolve any conflict or confusion ASAP.
