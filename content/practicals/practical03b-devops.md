---
title: "CS 312 - Practical Three"
date: "2019-09-26"
dueDate: "2019-09-27 5p"
path: "/practicals/practical03_old"
template: "assignment"
name: "Practical 3"
published: false
---

<!-- We ran out of time and didn't do this practical -->

#### Goals

- Enhance a React application created with Create React App
- Practice integration via GitHub pull request (PR)
- Use a CI server (Travis CI) to test a PR before integration
- Deploy an application to a PaaS (Heroku)

Today you will add a feature to the color picker to enable the user to enter
the color component by number. As part of that process we will practice
testing, CI and automated deployment. Check out a [deployed
version](https://afternoon-woodland-20082.herokuapp.com/) of the final result.

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/DXJJG4XQ) to create your private repository. Then clone that newly created
   repository to your local computer as you have done previously.
1. Install the package dependencies by running `npm install` inside the root
   directory of the newly cloned repository.
1. Before making any changes, verify that the current tests pass by running
   `npm test`. CRA starts a test watcher that automatically reruns the tests
   after you modify a file. In this case we only need to run the tests once. If Jest does not run the tests because the files haven't changed you can manually trigger the tests by pressing <kbd>a</kbd>. Press <kbd>q</kbd> or <kbd>Ctrl + c</kbd> to exit the test watcher.

   The skeleton includes a basic test that simulates changing the slider and
   checks that the background of the color swatch is updated. We will learn
   more about this kind of behavioral testing for React applications soon. In
   the meantime, we will just use these tests to experiment with Continuous
   Integration (CI).

1. Travis CI should start testing your application automatically (it detects the `.travis.yml` file). When [getting started](getting_started.html), you should have
   signed up for a Travis CI account.

Note that you may need to click on your name in the upper right hand corner to see the repositories, then "Sync Account" so that Travis is aware of your newly created repository. Even after syncing the list of repositories doesn't always update and so you need to use the search function to show the repository (search for "react"). If you do not have a Travis CI account setup or can't see your repository check in with the instructors.

## Enhancing the color picker with controllable number

Before you make any changes, create a feature branch named "editable-number" to
segregate your modifications from the master branch:

```
git checkout -b editable-number
```

Now start the application by running `npm start` so that you can view and test
your modifications.

You are now ready to replace the existing `<span>` elements with `<input>`
elements, specifically a
[number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)
input element. Modify `App.js`. Your numerical input will be very
similar to its slider counterpart, i.e. its value should be controlled by the
React state (so that all the elements that depend on or modify that value
remain in sync), it should update the color component as specified, and have
appropriate `min` and `max` values.

Verify that your numerical input works as specified. When it does, terminate
the development server <kbd>Ctrl + c</kbd>.

Start the test watcher again by running `npm test`. Do you expect the tests to
still be passing?

Since we replaced the `<span>` elements expected by the tests, we should expect
failures. Replace the following section of the current tests in `App.test.js` (at the end)

```javascript
// The three numeric values should be updated
const values = colorPicker.find("span");
expect(values).toHaveLength(3);
values.forEach((value) => {
  expect(value.text()).toBe("100");
});
```

with the code below (you don't need to edit any of this code, just copy and paste):

```javascript
// The three numeric values should be updated
const values = colorPicker.find('input[type="number"]');
expect(values).toHaveLength(3);
values.forEach((value) => {
  // Use jest-enzyme matcher to check prop to numeric input element
  expect(value).toHaveProp("value", 100);
  // Change the value via the numeric input
  value.simulate("change", { target: { value: "50" } });
});

// The color box background should be set to numeric values
expect(colorPicker.find(ColorSwatch)).toHaveStyleRule(
  "background",
  "rgb(50,50,50)"
);
```

We will learn more about how these tests work later in the course. For context, the new test code finds the newly added `<input>`s, asserts that their values were
updated by the sliders and then changes the color via the newly added numeric
inputs. If the numeric inputs are implemented correctly in your React component,
those changes should update the color swatch (the final expectation).

Once the tests pass, you are ready to integrate and ultimately deploy your
changes.

## Integration with Travis CI

Add and then commit your changes to the `editable-number` branch, e.g. `git commit -a -m "Transition span to numeric input"`. Push those changes GitHub
on the `editable-number` branch.

```
git push origin editable-number
```

Open your repository at GitHub and create a pull request (PR) to merge the
changes from your newly pushed `editable-number` branch onto the `master`
branch. You should be able to create the PR on the main page of your repository
or alternately you can create a PR from the "Pull request" tab.

Navigate to the page for your PR. Here you should see the notifications from
Travis CI. Make sure all checks have passed before merging the changes into the
`master` branch (note that it may take a few minutes for the Travis checks to complete, especially with the entire class creating PRs at the same time). Once you have merged the changes you can delete the feature branch on GitHub using the button that replaces the 'Merge' button.

Clean up your local repository after the merge. Return to the `master` branch
on your local computer, pull the changes from GitHub pruning deleting remote
tracking references. Then delete your local branch. To avoid mistakes when deleting
branches, add the `--dry-run` option to the `--prune` option, e.g. `git pull --prune --dry-run` to double check before actually pruning anything. The
command sequence is:

```
git checkout master
git pull --prune
git branch -d editable-number
```

## Deploy with Heroku

You are now ready to deploy your updated application. When [getting
started](getting_started.html), you should have signed up for a Heroku account
and installed the command line tool.

Create your application via

```
heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
```

then push your application to Heroku to deploy your new color picker

```
git push heroku master
```

and then open your newly deployed application

```
heroku open
```

You have now successfully completed an integration and deployment cycle!

## Finishing Up

Your GitHub repository should already be "up-to-date" as a result of the pull request. If you have made any subsequent changes, push your completed practical to GitHub via `git push --all origin`. Then submit your repository to Gradescope as described [here](../resources/gradescope).

## Grading

| Points            | Requirement               |
| ----------------- | ------------------------- |
| &#x2713;/&#x2717; | Changed `<span>` to input |
| &#x2713;/&#x2717; | Passes all ESLint checks  |
