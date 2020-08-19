---
title: "CS 312 - Assignment One"
date: "2019-09-12"
dueDate: "2019-09-20T17:00:00"
path: "/assignments/assignment01"
template: "assignment"
name: "Assignment 1"
published: true
---

#### Goals

- Develop a basic familiarity with `git` and GitHub classroom
- Get started with basic JavaScript and Node.js
- Practice some of the functional aspects of JavaScript (higher-order
  functions and closures)
- Practice test-driven development (TDD)
- Use a linter to write more consistent, more maintainable, higher quality, code

## Prerequisites

1. Install `git` and Node.js as described on the [Getting Started](/resources/getting_started.html) page
1. Click the GitHub classroom [link](https://classroom.github.com/a/cl3MzPeg) and then clone repository GitHub classroom creates to your local computer (see below).
1. Update the `package.json` file with your name and e-mail
1. Install the package dependencies with `npm install`

Click the GitHub classroom [link](https://classroom.github.com/a/cl3MzPeg) to create a repository for yourself with the name "pa1-\<Your GitHub username\>.git", e.g. "pa1-ChristopherPAndrews.git". Clone that repository to your local computer:

```
git clone https://github.com/csci312-f19/pa1-<Your GitHub username>.git pa1
```

The clone command above will create a copy of the assignment skeleton in the local directory `pa1`.

The above assumes the HTTPS interface to GitHub. GitHub offers both SSH and HTTPS-based interfaces to your repository. Using the former requires that you set up a [public-key with GitHub](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/). GitHub recommends the HTTPS for simplicity, but you may prefer to use SSH for added security. It is also possible to switch between the two using these [instructions](https://help.github.com/articles/changing-a-remote-s-url/#switching-remote-urls-from-ssh-to-https).

**NOTE:** Because of some issues I am having with GitHub at the moment related to educational accounts, the repositories created by Classroom are **public**. As such, you should **not** push your work back to GitHub as everyone else in the class will be able to see it. I encourage you to occasionally commit your work to your local repository, just don't push it back to origin. I am hoping to have this straightened out shortly.

The assignment skeleton is a NPM package. Once you have cloned the repository edit the `package.json` file to add your name. Then install the package dependencies with `npm install`.

## Background

### Running and Testing Your Program

You can run your code interactively in Node.js by running `.load *filename*` at the interpreter prompt (i.e., you have already typed `node` on the command line). Do this to load your functions for testing. You can also run your file non-interactively, e.g. `node *filename*`.

You can and are encouraged to practice test-driven development, TDD, (as seen in class). The assignment skeleton is set up for unit testing with [Jest](https://jestjs.io/en/). You can run the test suite with `npm test`. We converted the assignment examples into an initial set of tests in `index.test.js`. Note that these tests are currently failing and so are set to be [skipped](https://jestjs.io/docs/en/api#describeskipname-fn). As you start developing "unskip" each test by changing `describe.skip` to `describe`. Code that passes all of the provided tests is not guaranteed to be correct (thus we encourage you to add additional tests). However, code that fails one or more these tests does not meet the specification.

## Assignment

### Part 1: Truthiness

One of the places where people get tripped up in JavaScript is with "falsy" and "truthy" values. Do some online research to learn more. Write a function `howFalse(arr)`, which takes an array as an argument and returns an object containing a count of each kind of falsy value found in the array. The object should only have properties for falsy values that were actually present. For example, `howFalse([5, 0, 42, 'dalek', 3-3, 7, Math.sqrt(-1)])` should return `{0: 2, NaN: 1}`. Your solution should not use a loop (at least, not an _explicit_ loop).

### Part 2: Reduce

Write a function `myMax(arr)` to find the largest value in an array using `reduce`. It should accept an array as an argument and return the largest value in the array (you can assume that the array is non-empty and that the values in the array are comparable). For example, `myMax([1, 2, 3])` should return `3`. Your code should be of the form `const myMax = arr => arr.reduce(TODO);`, where `TODO` should be replaced with the actual functionality.

### Part 3: Filtering

Write a function `threshold(objs, field, cutoff)`. This function takes in an array of objects (`objs`), the name of a property found in the objects (`field`), and a cutoff value (`cutoff`). The function should return an array of those objects in `objs` whose values for `field` are less than or equal to `cutoff`. For example, `threshold([{x: 4, y: 5}, {x: 2, y: 9}, {x: 1, y: 1}], 'y', 5)` should return `[{x: 4, y: 5}, {x: 1, y: 1}]`. Your solution must use the array's `filter` method.

### Part 4: Optional arguments

In JavaScript, functions can take an optional number of arguments. For example [Math.min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) can take an arbitrary number of values for comparison. Write a function `myMin()` that duplicates this functionality (without just calling `Math.min`). As an example, `myMin(1, 2, 3)` should return `1`. Your function should match the behavior of `Math.min` exactly, including the corner cases like no arguments.

### Part 5: Longest common subsequence

Find the longest common subsequence between two strings.

Write a function `longestCommonSubsequence(str1, str2)`. It should (obviously) return the longest common subsequence. The subsequence does not need to be continuous, just in the same order. For example, `longestCommonSubsequence('afbwc', 'yabzcx')` should return `'abc'`. There are multiple solutions to this problem, but your solution should use a recursive "top-down" approach.
Consider a function `f(i,j)` that takes as arguments the indices of the last character in each string. As a base case, if either one of those indices is less than zero, then we know there is no common subsequence. We then have two recursive cases. If the characters are the same, we know that the character appears at the end of the common subsequence, so we can tack it on the end of the longest subsequence of the rest of the two strings (which we find recursively with f(i-1, j-1)). If the last character doesn't agree, then the longest subsequence is the longer of f(i, j-1) or f(i-1, j) (i.e., we can throw away the last character from one of the two lists, but we don't know which). To break ties, if f(i, j-1) and f(i-1, j) are the same length, pick f(i, j-1). _Note: while we could have passed the actual strings around and chopped them up as we went with the built-in `substring` method, working with indices will be easier and more efficient._

You could write this recursive function fairly easily, but it will have exponential time complexity. So, we would like you to use a closure and **memoization** (not a typo), to store values you have seen before to short-circuit long recursive chains. Memoize by building a cache of the values you have already calculated so you don't have to calculate them again. In languages that support closures like JavaScript, the "memo" is easily hidden by creating a closure containing it. So, `longestCommonSubsequence(str1, str2)` should encapsulate at least two objects: the recursive function described above, and the a 2-D array that allows you to look up the longest subsequence given an _i,j_ pair. _Note: The longest common subsequence of two strings may not be unique. In cases where they are not, the output from the algorithm described above will be the one considered correct._

### Part 6: Finishing Up

Once your program is working make sure you don't have any style issues by running ESLint via `npm run lint`. ESLint can fix many of the errors automatically by running `npm run lint -- --fix` (although since ESLint can sometimes introduce errors during this process, we suggest committing your code before running "fix" so you can rollback any changes). To get full credit for the style portion of the assignment your code must have zero ESLint errors.

Notice that there is an additional file in your directory, `.gitignore`, which specifies files that should not be tracked by Git. It is good practice to create this file first in your repository to prevent undesired files from getting committed. Here we have provided a relevant `.gitignore` file in the skeleton. In general we want to exclude platform specific files, like the OSX .DS_Store files, any files that are automatically generated as well as files containing secrets such as API keys.

If you haven't done so already commit your changes to index.js:

1. Start by running `git status` in the terminal in the assignment directory to see how your modified files are reported.
1. Then add the modified files to stage them for the commit, i.e. `git add index.js`. The staging area now contains the files whose changes will be committed.
1. Run `git status` again to see the how staged files are reported.
1. Commit your changes with `git commit -m "Your pithy commit message"` (replace "Your pithy commit message" with a pithy but informative commit message, quotes are required). You can also skip the `-m` option. If you do so, `git` will open a text editor for you to write your commit message.
1. Run `git log` to see your commit reported.

Normally, you would follow the same process that you followed for the practical to push your changes to GitHub and the submit to Gradescope. However, since the repositories you created are **public**, please do not push to them until **after** the assignment deadline.

Run `npm run submission`, which will create a file called `submission.zip` in your directory. Go to [Gradescope](https://www.gradescope.com/courses/60802), select the assignment, and then use the "Upload" submission method to upload the zip file.

<!--
Finally submit your assignment by pushing your changes to the GitHub classroom via `git push --all origin` and then submitting your repository to Gradescope as described [here](/resources/gradescope.html). You can submit (push to GitHub and submit to Gradescope) multiple times. The last submission before the deadline will be the one graded. -->

## Grading

| Points | Section                    |
| ------ | -------------------------- |
| 5      | Truthiness                 |
| 5      | Reduce                     |
| 5      | Filtering                  |
| 5      | Optional arguments         |
| 10     | Longest common subsequence |
| 5      | Style                      |
