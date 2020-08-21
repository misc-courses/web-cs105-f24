---
path: "/lectures/lecture2-devtools"
title: "Lecture 2 - Development Tools"
name: "Lecture 2 - Tools"
date: "2019-09-12"
published: false
---

# Top down: Packaging, testing, linting

So far we have worked very "bottom up", that is created a single HTML file, or
JavaScript file that utilizes the built-in APIs. Today we are going to work
"top-down", that is start with the skeleton of a distributable Node.js package.
We then flesh out that skeleton with dependencies, our code, tests, deployment
scripts, and more. Increasingly we will start all of our projects by creating a
package skeleton.

## npm

Node.js has a very developed packaging infrastructure built around
[npm](https://www.npmjs.com). npm is a command line tool (`npm`) and online
registry for creating, distributing, and using Node.js modules. The
functionality is built around the `package.json` file in the root directory of
the project.

A quick set of [definitions](https://docs.npmjs.com/getting-started/packages#quick-summary):

- A package is a file or directory that is described by a `package.json` file.
- A module is any file or directory that can be loaded by Node.js' `require()`.

A package need not be a module (although many are). Modules are JavaScript code
designed to be incorporated into other JavaScript code (like Python's
`import`), while packages may just contain command-line tools or a web
application.

The `package.json` contains a variety of information about the package, including:

- Metadata, e.g. name, version, author, etc.
- Dependencies (in both production and development)
- Scripts for common tasks like running tests
  and much more...

### Package lifecycle

Where do `package.json` files come from? Either they are already exist as part
of a package you clone, e.g. your assignment, or you are creating a new package
from scratch with `npm init` (or the React skeleton
[tool](https://github.com/facebook/create-react-app) we will learn about
later).

Our first step when working on a package we cloned or just initialized is to
install the package dependencies via `npm install`. That is you will start all
subsequent assignments with `npm install`.

Those dependencies are specified within the `package.json` file. There you can
very precisely specify the package dependencies with [semantic
versioning](https://docs.npmjs.com/files/package.json#dependencies) rules. A
precise specification of the dependencies makes your package builds
reproducible (even as dependencies release new versions, etc.) and thus much
easier to share with others.

You can specify two kinds of dependencies, those packages needed to "run" your
package ("dependencies"), and those packages needed to develop your package but
not run it ("devDependencies"). Examples of the latter include:

- Transpilers for translating ES6 to ES5 (and other tasks)
- Test frameworks
- Linters

### An example `package.json`

Here is an example `package.json`
[file](https://github.com/expressjs/express/blob/master/package.json) from the
popular Express web framework, in which we see metadata, like "authors",
numerous "dependencies" and "devDependencies" (for the Mocha test framework and
ESLint linter among other tools).

We also see two scripts for running these tools (the value for the "script"
property is what will be executed). Any of the entries in "scripts" can be run
with `npm run`, e.g. `npm run test` and `npm run lint`.

Many of these scripts have standard roles, e.g. "test" for running tests, and
shortcuts, e.g. `npm test`.

By defining these script entry points we can make it easy anyone else using (or
developing) our package to know how to test, start, etc. the package (without
needing to research a potentially complicated command or sequence of commands).

## Testing

It is not an accident that "test" is one of established `package.json` scripts,
testing is key to developing a high-quality package.

<blockquote class="blockquote">
"Everyone knows that debugging is twice as hard as writing a program in the
first place. So if you're as clever as you can be when you write it, how will
you ever debug it?"
<footer class="blockquote-footer">Brian Kernighan</footer>
</blockquote>

<blockquote class="blockquote">
"Testing shows the presence, not the absence of bugs" 
<footer class="blockquote-footer">Edsger Dijkstra</footer>
</blockquote>

Testing does not supplant debugging (although it hopefully reduces the amount
and difficulty of debugging), instead its role to help us build confidence that
our code performs the specified task, _and_ continues to do so even as further
develop/refactor our code. A key role for testing, and particularly automated
testing, is to identify _regressions_ in which previously working code breaks.

There many levels/kinds of testing:

- Unit testing: Tests for isolated "units", e.g. a single function or object
- Integration testing: Tests of combinations of units (i.e. integration of
  multiple units)
- System (or end-to-end) testing: Testing the entire application (typically to
  ensure compliance with the specifications, i.e. "acceptance" testing)

As you might imagine these definitions are quite fuzzy with many synonyms...

Our focus today is automated unit testing. We will revisit other aspects of
testing throughout the semester.

### Test-driven development (TDD)

Recall our focus is on agile development methods, which are all about short
development cycles that improve working (but not yet complete) code. To that
end we will practice test-driven development in which we write the tests first,
then implement the code that passes those tests (I suspect this is very
different from the way you typically work...). This process will encourage us
to think through our design, and particularly any interfaces, before we start
coding (a key reason why TDD can be effective), and implement in short
"cycles".

The TDD process:

1. Determine one thing the code _should_ do (i.e. the specification)
1. Implement that specification in a test, which should fail as you haven't yet
   implemented that functionality
1. Write the simplest code that satisfies the test
1. Refactor code and tests to DRY it up, etc.
1. Repeat with the next _one thing_ the code should do

That is we should be executing an iterative cycle of "fail-success-refactor"
(or "red-green-refactor") in which we aim to always have working code.
Rerunning the test suite during the refactoring process gives us confidence
that the refactoring has not inadvertently broken our implementation.

What do we test? Both correct behavior ("positive" tests), and error conditions
("negative" tests) with an emphasis on corner cases.

We might refer to this as "grey" box testing in which we are testing our units
as both "black boxes" (i.e. just test the functionality without regard to the
implementation), and "white boxes", in which we take the implementation into
account (i.e. aim to test specific execution paths). This middle ground is
hopefully more complete, with fewer tests, than "black box", but less biased by
the implementation than "white box".

### Anatomy of an automated unit test

We will use the [Jest](https://facebook.github.io/jest/) unit testing package.
Jest is one of many possible unit testing libraries; it is not necessarily the
best (a matter of opinion) or the most frequently used, but it is our choice
for this semester because it is integrated into `create-react-app` (a tool we
will use frequently this semester).

A test will have a description, the code under test and one or more assertions
about the results of executing that code
(["matchers"](https://facebook.github.io/jest/docs/en/using-matchers.html) in
Jest terminology).

<!--

Briefly highlight Node-style `require` to import modules (a module may export a
function, an object, etc.)

git checkout master~5

1. Resolve first "base case" test: git cherry-pick master~4
1. Add tests of core Fibonacci computation: git cherry-pick master~3
1. Satisfy core tests: git cherry-pick master~2
1. Add corner-case tests (negative inputs, fractional inputs): git cherry-pick master~1
1. Satisfy corner-case tests: git cherry-pick master~0

 -->

Consider testing a Fibonacci function (that starts counting at the "zero-th"
Fibonacci number). Here we define a test suite (using `describe`) and a set of
tests for different inputs. In each test we see the
`expect(expression).matcher(result)` pattern. The sequence of tests would result from the following TDD progression:

1. The "base case": `fib(0) === 0` and `fib(1) === 1`
1. The "core" Fibonacci computation
1. Two possible corner cases, negative inputs and fractional inputs. By writing
   the tests first we forced to think through how we would want to handle these
   inputs before implementing the code.

```javascript
const fib = require("./fibonacci"); // Import fib function from module

describe("Computes Fibonacci numbers", () => {
  test("Computes first two numbers correctly", () => {
    expect(fib(0)).toBe(0);
    expect(fib(1)).toBe(1);
  });

  test("Computes arbitrary Fibonacci numbers", () => {
    expect(fib(2)).toBe(1);
    expect(fib(3)).toBe(2);
    expect(fib(6)).toBe(8);
  });

  test("Returns zero for negative inputs", () => {
    expect(fib(-1)).toBe(0);
  });

  test("Rounds up for non-integer argument", () => {
    expect(fib(5.8)).toBe(8);
  });
});
```

Example [repository](https://github.com/csci312-f19/example-test-fibonacci).

### Unit test should be F.I.R.S.T.

- **F**ast: Tests need to be fast since you will run them frequently
- **I**ndependent: No test should depend on another so any subset can run in any
  order
- **R**epeatable: Test should produce the same results every time, i.e. be
  deterministic
- **S**elf-checking: Test can automatically detect if passed, i.e. no manual
  inspection
- **T**imely: Test and code developed currently (or in TDD, test developed first)

Consider the following function to check if today is a user's birthday (using
the [Moment](https://momentjs.com) library). As an aside, working with
dates/time is one those surprisingly complex tasks that you should always use
an established library for, it is just too easy to get the corner cases wrong.

```javascript
const moment = require("moment");

const isBirthDay = function (birthday) {
  return moment().isSame(birthday, "day");
};
```

How would you test this function? It will be hard to achieve deterministic
results since we depend on the current day. We need to isolate this function
from the environment to implement tests. We can do so with a "mock" function
that allows us to control the return value. If we [Google "moment mock date
jest"](https://stackoverflow.com/questions/29719631/how-do-i-set-a-mock-date-in-jest/42787232),
we learn that Moment uses the `Date.now` function to obtain the current date
and time. Let's replace `Date.now` with a mock function that always returns the
same time. Note that we save the original Date module so we can restore it (and
ensure our tests are independent).

```javascript
const isBirthday = require("./birthday");

describe("Checks if today is birthdate", () => {
  let _Date;
  beforeAll(() => {
    _Date = Date; // Save original date module
  });

  afterAll(() => {
    Date = _Date; // Reset Date
  });

  beforeEach(() => {
    // Set a fixed date
    Date.now = jest.fn(() => new Date("01 Jan 2018").valueOf());
  });

  test("Correctly asserts birthday", () => {
    expect(isBirthday("2018-01-01")).toBe(true);
  });
});
```

`jest.fn` is a helper for creating mock functions. We can specify what the
function will return (in a variety of contexts) as well make assertions about
how the mock was called in our tests.

Example [repository](hhttps://github.com/csci312-f19/example-test-birthday).

### Seams

_Seams_ are places where you can change an application's behavior without
changing the source code. Above we exploited a seam at `Date.now` to change the
behavior of `moment` and isolate it from the environment. Depending on the
language/framework there will be different ways of creating or exploiting seams
(some languages will be tricker than others, e.g. C++). Without any seams you
will have a difficult time creating FIRST tests. Thus writing testable code
means creating seams.

### How do I know if my test suite is sufficient?

At some level that is an unanswerable question. One metric is code coverage,
i.e. the percent of the code that is exercised by your tests. Hopefully a large
fractions of your functions are "covered" by unit tests. However coverage alone
is limited measure of test quality. A high quality test suite will likely have
high coverage but a high coverage test suite does not guarantee high quality.

Perhaps a better way to answer this questions from [Martin
Fowler](https://martinfowler.com/bliki/TestCoverage.html).

> You are doing enough testing if the following is true:
>
> - You rarely get bugs that escape into production, and
> - You are rarely hesitant to change some code for fear it will cause
>   production bugs.

A key use for code coverage can be to help you find the portions of the code
base that are not being tested. Fowler includes the following quote from Brian
Marick:

> If a part of your test suite is weak in a way that coverage can detect, it's
> likely also weak in a way coverage can't detect.

A related question is how do I know that my tests themselves are correct?
Hopefully you can express your expectations simply enough that is clear to you
(the developer) that the test is defined correctly. If the test itself is
growing very complex that may be a sign that you need to revisit your
interface.

### Debugging happens

By writing small blocks of code (5-10 LOC) at one time (i.e. TDD) we will hopefully
reduce the amount of debugging needed (and a function/method shouldn't be much
longer than that anyway). But debugging will happen.

To minimize the time to solution take a "scientific" approach to debugging ([source][esaas]):

1. What did you expect to happen (be as specific as possible)?
1. What actually happened (again as specific as possible)?
1. Develop a hypothesis that could explain the discrepancy
1. Test your specific hypothesis (with `console.log`, the debugger, etc.)

The [ESaaS][esaas] RASP method for steps 1-3 above:

1. **R**read the error message (_really_ read it).
1. **A**sk a colleague an _informed_ question, not just "Why doesn't it work?".
1. **S**earch using keywords from error, specific SW versions, etc..
1. **P**ost on StackOverflow, Canvas, etc. Everyone is busy, you will get
   better answers if you provide a [Minimal, Complete and
   Verifiable](https://stackoverflow.com/help/mcve) example.

Learning how to effectively use existing code and Google, StackOverflow, etc.
will increase your productivity. It is not unusual to spend more time searching
online than actually writing code (especially when working with new
technologies).

Don't underestimate how much time is required when starting something new
without an assignment skeleton/guide, tutors, etc.. Don't bang your head
against the wall, seek out help.

When do you do find a bug, good practice is to turn that bug into an automated
test case(s) before you fix it. Then when you fix the bug the test will now
pass, giving you confidence you have been successful. And by having that test
in your automated test suite you will also be more confident that the bug won't
reappear undetected in the future.

## Linting

What is good code? Correct and maintainable code. The "style" aspects of your
programming assignments in CS150, etc. are focused on both of these aspects,
i.e. encouraging highly readable code that is less likely have subtle,
hard-to-detect bugs.

[Linters][lint] are static analysis tools that help us identify "programming errors,
bugs, stylistic errors, and suspicious constructs". In this context the linter
has several benefits:

- Identify potentially problematic code that is not obvious to a language
  novice or "slipped through the cracks". In a sense it is like having an expert
  programmer "pair" with you.
- Enforce a common style across a team to increase readability.

In a sense the linter automates some of the "style" checking that often occurs
in code review (when another developer reviews your code) or when I grade CS150
assignments. Alongside the linter, we will often use automatic code formatting tools, e.g. [Prettier](https://prettier.io), to automatically reformat code to a common standard during a commit (or at other points in development).

In class we will use [ESLint](https://eslint.org) and, when possible, the [AirBnB ESLint
configuration](https://github.com/airbnb/javascript). You and I may not agree
with all of AirBnB's (opinionated) settings, but they provide a good starting
point. It is OK for us to deviate from their recommendations, but we should do
so as a considered decision.

We will aim for zero ESLint errors in our code (and definitely in your
programming assignments). Doing so will improve the quality of our code. That
doesn't mean we can always satisfy AirBnB. We may need to disable rules for
specific code sections. Again doing so is OK and in our practical exercise
today we will learn how.

[lint]: https://en.wikipedia.org/wiki/Lint_(software)

[esaas]: http://www.saasbook.info "Fox and Patterson, \"Engineering Software as a Service: An Agile Approach Using Cloud Computing\""
