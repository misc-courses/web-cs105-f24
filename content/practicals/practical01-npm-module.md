---
title: "CS 312 - Practical One"
date: "2019-09-12"
dueDate: "2019-09-13 5p"
path: "/practicals/practical01"
template: "assignment"
name: "Practical 1"
published: true
---


#### Goals

- Create your first npm package
- Get started with basic JavaScript and Node.js
- Implement unit tests
- Use a linter to write more consistent, more maintainable, higher quality, code
- Get started with Git, GitHub classroom and Gradescope

[npm](https://www.npmjs.com) is the default package manager for Node.js. It
provides a command line tool for installing packages and an associated package
registry. Today you will create your first [npm package and Node.js
module](https://docs.npmjs.com/getting-started/creating-node-modules) that
integrates unit testing with [Jest](https://facebook.github.io/jest/) and the
[ESLint](https://eslint.org) [linter][lint].

## Prerequisite

Make sure you complete the steps on the [getting_started](/resources/getting_started.html) page. If you are using `nvm`, before using `node`, `npm` and associated tools, you need to make sure the correct version is activated. At beginning of each terminal session run `nvm use lts/dubnium` to activate the version of node we are using in the course.

## Creating the module

Create a new package by first creating the package directory and then running
`npm init` *inside* the new directory, i.e.

```
mkdir birthday-practical
cd birthday-practical
npm init
```

The `npm init` command will create the `package.json` file by asking you a
series of questions. Hit <kbd>Enter</kbd> to accept the default for each question. If your directory is a Git repository (not the case here)
`npm` will automatically pull information from your Git repository to create
the `package.json` file. 

The `package.json` a file can be edited like any other. Open it in your editor (e.g. VSCode)
and add the `"private": true` property like shown below to prevent
[accidentally publishing](https://docs.npmjs.com/files/package.json#private)
this package to npm. After your manual editing your initial `package.json` file
should look something like the following. 

```json
{
  "name": "birthday-practical",
  "version": "1.0.0",
  "private": true,
  "description": "CS312 birthday practical exercise",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Christopher Andrews <candrews@middlebury.edu>",
  "license": "Apache-2.0"
}
```

## Setting up unit testing

We want to add automated unit tests for our functions. Unit testing typically
requires 1) a *test runner* to automatically run all the tests and report the
results, and 2) an *assertion library* for implementing expectations about the
behavior of the code under test. We will use the
[Jest](https://facebook.github.io/jest/) unit testing package, which provides
both. Jest is one of many possible unit testing libraries; it is not
necessarily the best (a matter of opinion) or the most frequently used, but it
is our choice for this semester because it is integrated into
`create-react-app` (a tool we will use frequently this semester).

Install Jest by running `npm install --save-dev jest` in the root directory of
your package (in general we will run all `npm` commands in the root directory
of the package, i.e. where the `package.json` file is located). This will
install the Jest package and any dependencies into the `node_modules` directory
for use in this package. The `--save-dev` option specifies that you want to
update `package.json` with this dependency, and that it is a "development"
dependency. You only need Jest when developing this module (when you would run
the tests) and not in production.

Notice that the `package.json` file now specifies this new dependency (your
version for this package and others may be slightly different):

```json
"devDependencies": {
  "jest": "^24.9.0"
}
```

Now that you have a testing library, you want to update the "test" script
specified in the `package.json` file to run Jest. To do so, edit your
`package.json` file to include:

```json
"scripts": {
  "test": "jest"
},
```

You can now run Jest with `npm test` or `npm run test`. Although since you
don't have any tests yet, you will get an error.

## Writing a simple function

In class we saw an example of using Moment to determine if today is someone's
birthday. For this practical we will do something similar. Write a function
named `howOld` to determine how old someone is in years. This is a common task
and so [Moment](https://momentjs.com) provides a very helpful [method
`diff`](https://momentjs.com/docs/#/displaying/difference/) we can use for
exactly this purpose.

First add Moment to your package as a dependency

```
npm install --save moment
```

then create an `index.js` file and implement your `howOld` function in that file. We need to require the
moment library to make it available in our file (analogous to `import` in Python) and then export our `howOld`
function for use by others:

```javascript
const moment = require('moment');

const howOld = function howOld(birthday) {
  return moment().diff(birthday, 'years');
};

module.exports = {
  howOld
}
```

## Creating unit tests

You will then create a test file named `index.test.js` (i.e. same name, but
with `test.js` extension; Jest looks automatically for `*.test.js` files),
import the functions from `index.js`, and add your first unit test with the code below. Then run your test suite with `npm test`. Hopefully every thing is "green"!

```javascript
const birthday = require('./index');

describe('Determines age based on birthday', () => {
  test('Returns 0 if birthday is today', () => {
    expect(birthday.howOld(Date.now())).toBe(0);
  });
});
```

Jest provides the `test(string, fn)` function. This is a basic test comprising
a string description that will be printed when the test is run and a function
that will provide the body of the test. We have wrapped that test in the
`describe` function, which helps group tests that share common setup or
teardown (described more below).

The `test` function should contain one or more assertions – tests of state or
values in your code. The `expect(value)` function takes as an argument a value
generated by your code in some way and returns an "expectation object". To turn
this into a test, you apply a
[matcher](https://facebook.github.io/jest/docs/using-matchers.html) to test
that value. There are a number of different matchers, and the one above works
exactly as its name suggests. Jest will run all of your tests for you and keep
track of how many tests pass and how many fail.

You can have multiple assertions within a single test function. All of the
assertions should contribute in some way to the test.

Jest provides another function named `describe`, which allows us to wrap
multiple tests together into a "suite". These tests can be loosely coupled.
Perhaps they all test the same component or approach testing a function from
different directions. Often the tests in a single `describe` all share common
[setup and tear down
functionality](https://facebook.github.io/jest/docs/en/setup-teardown.html),
that is they all need the same work to be performed before the test is run and
after the test is complete. 

In this case, to make our tests "FIRST", we need to isolate our function from
the environment. Use the approach from class to fix the date:

```javascript
describe('Determines age based on birthday', () => {
  let _Date;
  beforeAll(() => {
    // Save original date module
    _Date = Date;
  });

  afterAll(() => {
    // Reset Date
    Date = _Date; 
  });

  beforeEach(() => {
    // Set a fixed date
    Date.now = jest.fn(() => new Date('01 Jan 2018').valueOf());
  }); 

  test('Returns 0 if birthday is today', () => {
    expect(birthday.howOld(new Date('01 Jan 2018'))).toBe(0);
  });
});
```

Now that you have the basic infrastructure in place, implement additional tests
to convince yourself that your function is working. What cases might you want
to check? Exactly one year, slightly more than one year, slightly less, ...

You can evaluate how comprehensive your test suites are with Jest's built-in
coverage reports. Run `npx jest --coverage`. Your one function should be 100% covered! But as we discussed in class, coverage alone is limited measure of test quality. A high quality test suite will have high coverage but a high coverage test suite does not guarantee high quality.

<hidden-block message="For later: Controlling coverage reporting">

More generally, some functions are tricky to test so may be uncovered. To tell
the coverage tool to [ignore a
function](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)
add the following comment immediately before the function:

```
/* istanbul ignore next */
```

For context, [Instanbul](https://istanbul.js.org) is the
underlying tool used by Jest to compute coverage.

</hidden-block>



## Running a linter

As described in class, [linters][lint] help us identify "programming errors,
bugs, stylistic errors, and suspicious constructs". In class we will use
[ESLint](https://eslint.org) and the [AirBnB ESLint
configuration](https://github.com/airbnb/javascript). You and I may not agree
with all of AirBnB's (opinionated) settings, but they provide a good starting
point. It is OK for us to deviate from their recommendations, but we should do so as
a considered decision.

Install ESLint and the AirBnB configuration as a development dependency by
running the following command in the root directory of your package (the
directory that contains the `package.json` file):

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

Notice the different approach to installing these packages.
[`npx`](https://github.com/zkat/npx) executes local binaries within the package
or as one-off invocations without local installation. Here, you are using it in
the latter configuration. You are using the
[install-peerdeps](https://www.npmjs.com/package/install-peerdeps) package to
install the [peer
dependencies](https://nodejs.org/en/blog/npm/peer-dependencies/) for the AirBnB
ESLint configuration (that is to install ESLint). The equivalent `npm` command would be:

```
$ npx install-peerdeps --dev --dry-run eslint-config-airbnb-base
npx: installed 82 in 6.613s
install-peerdeps v1.10.2
This command would have been run to install eslint-config-airbnb-base@latest:
npm install eslint-config-airbnb-base@13.1.0 eslint@5.3.0 eslint-plugin-import@^2.14.0 --save-dev
```

To configure ESLint you need to create a new file named `.eslintrc.json` in the
root directory of your package with the following contents. Note that the file
name is important as ESLint will look for a file with that exact name.

```json
{
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "jest": true
  }
}
```

This configuration specifies that you want to use the AirBnB base configuration
and that the Node.js and Jest [global
variables](https://eslint.org/docs/user-guide/configuring#specifying-environments)
should be predefined.

To prevent ESLint from trying to analyze the files you created as part of the
coverage analysis you will want to also create a file named `.eslintignore`
file with the following list of directories (or files) to be ignored. As with
`.eslintrc.json`, this file should be created in the root directory of your
package.

```
# testing
/coverage
```

Similar to testing, you want to add a script entry point to run the linter. Add

```
"lint" : "eslint ."
```

to the scripts section of your `package.json` file, i.e. it should now look like:

```json
"scripts": {
  "test": "jest",
  "lint": "eslint ."
},
```

## Running the linter

Run the linter with `npm run lint` (which is equivalent to `npx eslint .`). I
suspect you may have some errors! ESLint can fix many of the formatting errors
automatically by running `npm run lint -- --fix`. Other errors will require you to
manually refactor your code. To learn more about a particular error, Google the
rule name, e.g. `no-console`. As pedantic as the formatting requirements may
seem, enforcing a consistent style is very helpful in a team context. It is
much easier to read your teammate's code when everyone uses the same style.

Try to eliminate as many errors as you can.

You won't be able to eliminate all the errors (AirBnB doesn't want us to modify
the global `Date` variable) and so you will need to [disable certain
rules](https://eslint.org/docs/user-guide/configuring#configuring-rules). You
can do so in a variety of ways, including globally (in `.eslintrc.json`), for
an entire file (with a comment at the top) and for a single line (with an
inline comment). For example to turn off the warnings for modifying global
variables and the "dangling underscore" add the following comment to the top of your `index.test.js` file.

```
/* eslint-disable no-global-assign, no-underscore-dangle */
```

Alternately you can add `// eslint-disable-line` to the offending line to
disable ESLint on that line.

Either by changing your code or explicitly configuring ESLint, seek to
eliminate all of the linter errors and warnings.

## Your first Git

Now that you have implemented your package, we want to turn the package into a
Git repository. 

Git is a distributed version control system (VCS). Git, and its "killer app" GitHub, will play a key role in our workflow. At its simplest, a VCS enables us to "checkpoint" our work (a *commit* in Git terminology), creating a distinct version of our codebase that that we can return to. The opportunity to track and undo changes makes it easier to find new bugs (by reviewing differences to a prior working version), maintain a clean code base (we don't need to keep commented out code around in case we need it again), confidently make large changes knowing we can always recover a working version, and much more. For these reasons and more solo developers will use a VCS (and so should you!), but it is even more useful in a team environment.

How will you know if you and another developer modify the same file (in potentially incompatible ways)? How do you ensure you don't end up with a teammate's half-working modifications? We will use the VCS to prevent these problems.

The "distributed" in "distributed VCS" means that no central repository is required. Each Git repository contains the entire history of the project and thus each developer can work independently, making commits (checkpoints) without interfering with anyone else. Only when you *push* or *pull* those changes to another copy of the repository do your changes become visible to anyone else. Further we will use branches to segregate our changes. A branch is just a parallel version of the codebase. This allows you to experiment, while leaving the *master* branch untouched until your new feature is ready to be *merged* back into the master.

Git does not require a central repository. However, teams still tend to use a central repository to facilitate their work (we will use GitHub in this role). There isn't anything technically special about the shared repository other than that the team decides to share their changes via that central repository rather than directly with each other.

We will use Git and GitHub (in concert with Gradescope) to submit our work. Keep in mind the "distributed" in distributed VCS. Until you have pushed your changes to GitHub (and submitted your repository to Gradescope) your work is *not* turned in.

To get ready to do so in this practical:

1. Create your Git repository with `git init`.
1. Many of the files, i.e. the `node_modules` directory, shouldn't be tracked by
   Git. Create a `.gitignore` file by downloading this [example
   file](https://gist.githubusercontent.com/ChristopherPAndrews/1110cfdf03367eb9967aef3708083c66/raw/703b58a4726108cb6a5501472f161e4dd2127772/.gitignore) into your package directory to specify which files should
   [not be tracked by Git](https://help.github.com/articles/ignoring-files/).
   Going forward it is good practice to create this file first in your
   repository to prevent undesired files from getting committed. Typically this
   file will be built into our assignment skeletons. In general we want to
   exclude platform specific files, like the OSX .DS_Store files, any files
   that are automatically generated as well as files containing secrets such as
   API keys.

We are now ready to commit our changes:

1. Start by running `git status` in the terminal in the assignment directory to
   see how your modified files are reported. (The `node_modules` and `coverage` directories should **not** be listed -- if they are, go back to the last step.)
1. Then add the modified files to stage them for the commit, i.e. `git add
   index.js`. The staging area now contains the files whose changes will be
   committed. You can use `git add .` to stage all the files at once. (Note that `git add .` can be dangerous -- use `git status` first to make sure there is nothing that you don't want in the repository before you use it.)
1. Run `git status` again to see the how staged files are reported.  
1. Commit your changes with `git commit -m "Your pithy commit message"` (replace "Your pithy commit message" with a pithy but informative commit message, quotes are required). You can also skip the `-m` option. If you do so, `git` will open a text editor for you to write your commit message (and commit when you exit the text editor).

You are now ready to submit your practical assignment.

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/Q3_ARu2k). Clicking through to
   the assignment will create a private repository for you with the name
   "practical1-\<Your GitHub username\>.git", e.g. "practical1-ChristopherPAndrews.git".
   You can view your repository at
   https://github.com/csci312a-s19/practical1-\<Your GitHub username\> (click the link provided by GitHub classroom).
1. Add the GitHub repository as a "remote" for your local repository as shown
   in GitHub under the "…or push an existing repository from the command line" heading.
1. Push your completed package to GitHub via `git push --all origin`
1. Submit your repository to Gradescope as described [here](../resources/gradescope)

**Successfully submitting your assignment is a multi-step process: 1) Commit and push your changes to GitHub, 2) Submit your repository to the Gradescope assignment. Make sure you complete both steps (in order).**

Note, it appears that if you have previously enrolled in GitHub Classroom for
another course, you can get stuck in a loop during the authorization process.
Please try the workaround described in this
[issue](https://github.com/education/classroom/issues/1144) (and let your
instructor know if that works for you).

## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Create npm package
&#x2713;/&#x2717; | Implemented `howOld`
&#x2713;/&#x2717; | Implemented tests with 100% coverage
&#x2713;/&#x2717; | Passes all ESLint checks 



[esaas]: http://cs169.sass-class.org "Adapted from Armando Fox and David Patterson, UC Berkeley"
[lint]: https://en.wikipedia.org/wiki/Lint_(software)
