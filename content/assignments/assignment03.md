---
title: "CS 312 - Assignment Three"
date: "2019-09-30"
dueDate: "2019-10-07 5p"
path: "/assignments/assignment03"
template: "assignment"
name: "Assignment 3"
published: false
---

#### Goals

- Get more practice implementing React components, including incorporating PropTypes
- Advance your understanding of the division of responsibilities and state between components
- Incorporate styling with CSS-in-JS (with Styled Components)

## Prerequisites

1. Click the GitHub classroom [link](https://classroom.github.com/a/ymdq00i6)[^availability] and then clone the repository GitHub classroom creates to your local computer as you did in previous assignments.
2. Update the author information in the `package.json` file
3. Install the package dependencies with `npm install`

   When you install the dependencies you may get warnings like below. These can safely be ignored.

   ```
   npm WARN ts-pnp@1.0.0 requires a peer of typescript@* but none is installed. You must install peer dependencies yourself.
   ```

Once you have the dependencies installed you can start the development server with `npm start`. Practice good Git practices by creating a working branch for your features.

## Background

This assignment, the next part of creating Simplepedia, starts where assignment two left off. As with previous assignments an initial set of (failing) tests are provided as part of the skeleton (run with `npm test`). These tests are intended to help you as you develop your application and to ensure that the grading scripts can successfully test your assignment. Code that passes all of the provided tests is not guaranteed to be correct. However, code that fails one or more these tests does not meet the specification. Testing React applications is a future topic and so you are not expected to write any additional tests for this assignment.

## Assignment

### Part 1: Update skeleton to fit your new understanding of React.js

The first part of this assignment is to update the solution code to use styled components and PropTypes as discussed in class. Remove the rules from the CSS files _and_ the HTML `id`s as you go. To use these modules you will need to install them into your application as dependencies (not just development dependencies) via:

```
npm install --save styled-components prop-types react-immutable-proptypes
```

Other than the above, you should not need to modify your application dependencies in any way.

When you get to adding PropTypes for the collection, you will want to specify that the collection is an `Immutable.map`. The above command adds a [special PropTypes library](https://github.com/HurricaneJames/react-immutable-proptypes) that knows about Immutable.

Be as specific as you can. While you can certainly get away with "it's an object", it is better to specify its shape (i.e., what fields we should expect in the object).

### Part 2: Allow the user to add new files

Create an `Editor` component (in `src/components/Editor.js`), like shown below, that allows the user to create a new article. In this part you should pass a single prop to the `Editor` component: a "required" callback named `complete` that takes an article object as its argument and creates or updates that article. Make sure to use these names (and any others specified in the assignment) to facilitate automated testing.

![Simplepedia](./images/assignment03-editing.png)

Your component should use an `<input>` of type "text" to allow the user to enter in a new title and a `<textarea>` to allow the user to write the body of the article. Your component should have two buttons. The first should be a "Save" button. When the user clicks it, the article should be saved, and editing should be completed (your editor styling does not need to match the example above). The date on the article should be set to the current date and time (as an ISOString via `Date.toISOString()`), and the article should be added to the collection. The second should be a "Cancel" button. When the user clicks cancel, the edit should be discarded and the primary interface should be restored. Keep in mind the newly created article might not belong to an existing section.

There is one form validation required. If the title is not set, you should not let the user save the article by disabling the "Save" button. UX best practices are to also provide a message explaining the validation error (as close in time and space to the error as possible), however for simplicity in this assignment you will just disable the "Save" button. To help the user, provide meaningful initial placeholder text in both input elements.

Add a "New Article" button to the main interface like shown below. When the user clicks this button, the interface should switch to the editing component (i.e. the user should _not_ see `IndexBar` or `Article`). When the user finishes the new article (either by using "Save" or "Cancel"), the primary interface should be restored. You do not need to restore the article that was previously displayed if the user clicks "Cancel" when creating a new article. If the user saves the new article, the newly created article should be displayed.

Of course, we would like `IndexBar` to be consistent with the current article (i.e., display the correct section). There are a couple of ways to ensure this. I would like you to share `currentArticle` with `IndexBar` as a new prop. Unfortunately, you can't just use the first character of the title to determine the section, because then we couldn't switch sections. Instead, I would like you to add an [effect hook](https://reactjs.org/docs/hooks-effect.html). In `App.js`, we have an example of an effect hook:

```JavaScript
useEffect(() => {
    setCollection(mapFromArticleList(data));
  }, []);
```

The basic concept is that we register a function to be called under certain circumstances (when state or prop values change). The `useEffect()` function takes two arguments, the first is the function to run and the second is the list of variables to watch. In the example above, we passed an empty list, so it only runs once. You will want to watch for changes to the current article, changing the section if appropriate. This will mean that the section will change when the article changes, but can then be changed independently.

It is possible for the user to create a new article with the same title as a current article. We will ignore that problem in this assignment as we will fix it in the next assignment when we introduce a server (which will validate that the title is unique).

![Simplepedia](./images/assignment03-newarticle.png)

### Part 3: Allow editing

Once you can successfully add new articles, you will adapt the interface to allow editing of articles. Add an "Edit Article" button to the article to request the current article be edited. The interface should then switch to your new `Editor` component, but the current title and article body should already be filled in. To do so add an optional second prop to `Editor` named `article`. When creating a new article, this prop should be set to `undefined`, when editing an article, this prop should be the article Object to be edited.

On "Save", the date should be updated and the changes saved (and the newly edited article displayed). On "Cancel", the changes should be discard leaving the article unmodified and the previous article view should be restored (displaying the original, unedited, article).

### Finishing up

To earn full points for code organization and style your submission should not have ESLint warnings or errors when run with `npm run lint` (or `npx eslint .`). Remember than you can fix many errors automatically with `npm run lint -- --fix` (although since ESLint can sometimes introduce errors during this process, we suggest committing your code before running "fix" so you can rollback any changes). As described in the README, the assignment skeleton includes the Prettier package and associated hooks to automatically reformat your code to a consistent standard when you commit. Thus do not be surprised if your code looks slightly different after a commit.

Submit your assignment by pushing your changes to the GitHub classroom via `git push --all origin` and then submitting your repository to Gradescope. You can submit (push to GitHub and submit to Gradescope) multiple times. The last submission before the deadline will be the one graded. Portions of your assignment will undergo automated grading. Make sure to follow the specifications exactly, otherwise the tests will fail (even if your code generally works as intended). Use the provided test suite (run with `npm test`) to get immediate feedback on whether your code follows the specification (remember that the provided tests are not exhaustive, and an application that passes all of these tests is not guaranteed to be correct). Because of the increased complexity of a React application, Gradescope can take minutes to run all of the tests. Thus you will be more efficient testing locally and only submitting to Gradescope when you are confident your application meets the specification.

### Grading

| Points | Criteria                                   |
| ------ | ------------------------------------------ |
| 5      | Styled components and PropTypes            |
| 5      | Editor-related display and controls        |
| 6      | Successfully add new articles              |
| 6      | Successfully edit existing articles        |
| 3      | IndexBar updates properly                  |
| 5      | Code organization, design, comments, style |

### FAQ

##### Do I need to implement unit testing?

We will learn later in the semester how to unit test React components. For this assignment you are not expected to implement any of your own unit tests. The skeleton includes some unit tests to assist you in your development and to ensure that the grading scripts can automatically test your submission.

##### What if the tests and assignment specification appear to be in conflict?

Please post to Piazza so that we can resolve any conflict or confusion ASAP.

[^availability]: Assignment 3 starts with the solution to Assignment 2. The link will be available after the assignment 2 due date.
