---
title: "CS 312 - Practical Five"
date: "2019-10-07"
dueDate: "2019-10-08 5p"
path: "/practicals/practical05"
template: "assignment"
name: "Practical 5"
published: false
---

#### Goals

- Implement BDD tests for a React application based on Cucumber scenario

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/GHKiUNBq) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install` inside the root directory of the newly cloned repository.

   You may see warnings like the following. These can be ignored for this practical (though you may certainly run `npm audit fix`).

   ```
   added 2335 packages from 793 contributors and audited 49499 packages in 29.642s
   found 1328 vulnerabilities (63 low, 10 moderate, 1253 high, 2 critical)
   run `npm audit fix` to fix them, or `npm audit` for details
   ```

You [previously](practical01) used Jest for unit testing JS code and Jest and [Enzyme](http://airbnb.io/enzyme/) in combination to [unit test React components](practical04). Today we will focus on behavioral testing as part of Behavior-Driven Design (BDD). Note that to use Enzyme with CRA, you typically need to [install additional packages and create a setup file](https://facebook.github.io/create-react-app/docs/running-tests), however the skeleton code includes everything you need.

## Scenario testing with Enzyme

In class we developed a Cucumber-style test scenario for the toggling between the summary and detail views. Using Enzyme, you can implement similar tests, albeit a little more closely tied to the React implementation. You could rewrite our scenario as:

```
Given the FilmContainer is rendered
And the FilmDetail component does not exist
When I click on the FilmTitle component
Then I expect the FilmDetail component to exist
And I expect the element 'img[src="http://the/poster"]' to exist
When I click on the FilmTitle component
Then I expect the FilmDetail component to not exist
```

Today we will implement the above test scenario in `FilmContainer.test.js`. Here is the initial implementation for the "Given", including testing that `FilmDetail` is not rendered. The assertion, `toContainMatchingElement` is from a helper package [`jest-enzyme`](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#readme) that provides useful "matchers" for Enzyme.

```javascript
test("Clicking on title toggles detail view", () => {
  // Use mount so that children will be rendered and we can interact with the DOM
  const comp = mount(<FilmContainer {...film} setRatingFor={jest.fn} />);
  expect(comp).not.toContainMatchingElement(FilmDetail);

  // TODO: Simulate clicks and test results
});
```

To simulate the click we need to find the Film title, implemented with Style Components. One of the limitations of using Styled Components is finding those components. For components created with functions or classes you can query by constructor (as we have done previously) or by the `displayName` as a string, e.g. 'FilmSummary'. But Styled Components don't set the `displayName` property. So for testing convenience we will do so manually, i.e. in `FilmSummary.js` we added:

```
Title.displayName = 'FilmTitle';
```

Now you can `find('FilmTitle')` using the `displayName`. As an aside, an alternate approach to finding elements is to use the `findWhere` method, which takes a predicate function instead of a selector. The predicate function should take an Enzyme node as an argument and return `true` if the node should be returned from `findWhere`.

To implement the "When" steps you will simulate the action, e.g. simulate the click. As we saw previously, to test events, you will need to use the `mount` renderer, which will virtually render your component and actually mount it. Invoke `find('FilmTitle')` on the Enzyme wrapper for the `FilmContainer` produced by `mount` to obtain the film title. Invoke `simulate('click')` on the film title element. Once you have simulated the click, test the "Then" steps in the scenario.

```javascript
// Click on film title
comp.find("FilmTitle").simulate("click");
```

You can derive the image URL from the example data in the test file (like shown in the comments in the skeleton file). We can use that URL to search for a matching image element in the DOM rendered by the component. Enzyme's find method (and thus the jest-enzyme matchers) supports a sophisticated [selector syntax](https://airbnb.io/enzyme/docs/api/selector.html). For example, we can match the image tag with `'img[src="http://image.tmdb.org/t/p/w185/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg"]'`, i.e. an `img` tag with the specified `src` attribute. The corresponding matcher test code would be:

```javascript
expect(comp).toContainExactlyOneMatchingElement(
  'img[src="http://image.tmdb.org/t/p/w185/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg"]'
);
```

## Finishing Up

1. Add and commit your changes and push those commit(s) to GitHub.
1. Submit your repository to Gradescope

## Grading

| Points            | Requirement                                         |
| ----------------- | --------------------------------------------------- |
| &#x2713;/&#x2717; | Tests the entire `FilmContainer` container scenario |
| &#x2713;/&#x2717; | Passes all tests                                    |
| &#x2713;/&#x2717; | Passes all ESLint checks                            |
