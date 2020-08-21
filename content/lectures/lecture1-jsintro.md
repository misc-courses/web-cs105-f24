---
path: "/lectures/lecture1-js"
title: "Lecture 1 - JavaScript"
name: "Lecture 1 - JS"
date: "2020-09-10"
published: true
---

# Introduction to JavaScript

This is not a comprehensive introduction to JavaScript (JS). Instead I am
aiming to highlight some of the common "gotchas" when coming to JS from other
languages like Java or Python as well as some of the features you will encounter in JavaScript that you will not have seen before.

For a more comprehensive introduction to JavaScript, I suggest the 3rd
edition of [Eloquent
JavaScript](http://eloquentjavascript.net/3rd_edition/index.html).

Why do we care about JavaScript? It is the language embedded in the browser
that allows us to programmatically manipulate the page (our topic for the next
session). Increasingly JavaScript is also used on the server (that is not just
in the browser).

## History and standardization

A little context. Java is to JavaScript as Ham is to Hamburger. JavaScript was
created in 1995 at Netscape (in 10 days!) and was named as a marketing ploy to
capitalize on the growing popularity of Java (although Sun, then Oracle, owned
the trademark).

JavaScript was standardized into ECMAScript, and thus JavaScript is a dialect
of ECMAScript. After a period of divergence in the browser wars era, the
various vendors (namely the browser creators) are now more faithfully
implementing the standard.

There are numerous implementations:

- V8 (Chrome and Node)
- Spidermonkey (Firefox)
- Nitro (WebKit, Safari)
- Chakra (IE Edge)
- ...

Not all engines support all features. We will be using ECMAScript 2015 or ES6,
an update to the standard that adds numerous helpful features. Fortunately, at
this point almost [all modern
browsers](https://kangax.github.io/compat-table/es6/) support the ES6
specification. That is not necessarily true for newer features (newer than ES6)
or older browsers.

We will also be using tools, such as
[transpilers](https://babeljs.io) and polyfills, which mitigate compatibility
problem enabling us to write to a single modern standard (ES6).

## JavaScript notes

JavaScript is a very pragmatic language that has evolved to meet user needs as
opposed to being formally "designed" (recall the first version created in 10
days...). As a result there is more than one way to do something, and not all
are good. There was (is) a quite famous book ["JavaScript: The Good
Parts"](http://shop.oreilly.com/product/9780596517748.do), promoted as:

> Most programming languages contain good and bad parts, but JavaScript has
> more than its share of the bad, having been developed and released in a hurry
> before it could be refined. This authoritative book scrapes away these bad
> features to reveal a subset of JavaScript that's more reliable, readable, and
> maintainable than the language as a whole—a subset you can use to create
> truly extensible and efficient code.

Thus be careful reading online suggestions/tutorials. Some are good, some are
outdated, some are opinionated in good ways, some are opinionated in bad ways,
and some are just wrong.

We will make use of established style guides, e.g. from
[AirBnB](https://github.com/airbnb/javascript) and tools like
[ESLint](https://eslint.org), which automatically identify potentially
problematic code, to help us avoid the "bad parts".

Some examples of those gotchas mentioned earlier...

### Semicolons

Semicolons are optional in JavaScript. If there is a line break without a
semicolon, JavaScript will insert one according to a very complicated set of
rules. There are many opinions on this. I favor using semi-colons. Consistency is probably the most important rule to follow here.

### Equality (and truthiness)

Use `===` instead of `==` ([ESLint](https://eslint.org/docs/rules/eqeqeq.html)).

```
$ node
> 5 == "5"
true
> 5 === "5"
false
```

The latter is typesafe, the former does some very tricky and hard to reason
about type conversion. Don't do it.

### Variable declarations

JavaScript is dynamically typed like Python and can define variables like
Python, e.g.

```javascript
x = 42;
```

but doing so makes a global variables and pollutes the global namespace
([ESLint](https://eslint.org/docs/rules/no-undef)). Instead we should declare
all variables as block scoped with `const`, if possible, or `let`
([ESLint](https://eslint.org/docs/rules/prefer-const)). `const` specifies that
a variable will not be reassigned. However, those are ES6 features and so you
will also see `var` declarations, e.g.

```javascript
var x = 42;
```

Prior to ES6, `var` was the only form of declaration. `var` has function-level
scope (even if you re-declare a variable), instead of the more familiar
block-level scope of `const` and `let`. That is all `var`s are "hoisted" to the
top of the function (or globally). As a result the latter is preferred to avoid
tricky bugs like the following. You should use `const` or `let`, but be aware
you will likely see examples with `var`.

As an example compare the two following functions (adapted from MDN):

```javascript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);
  }
  console.log(x); // What will print here?
}
```

```javascript
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;
    console.log(x);
  }
  console.log(x); // What will print here?
}
```

### Higher-order functions

Functions are just another kind of value (a feature adapted from functional
programming), e.g.

```javascript
const f = function () {};
```

Here we are creating an anonymous function and assigning it to a variable (with
regular assignment and a ';') instead of creating a named function, e.g.
`function f() {}`. In general we prefer the first form because it prevents us
from referencing a function in a file before it is defined (named functions are
"hoisted" to the beginning of the file). The [AirBnB style
guide](https://github.com/airbnb/javascript#functions) recommends using named
function expressions, .e.g.

```javascript
const f = function moreDescriptiveNameForF() {};
```

so the function is scoped but will always have an informative name in stack
traces (although many engines infer the name from the assignment), etc. Think
of that as a "belt and suspenders" approach...

Anonymous functions are a common concept in JavaScript. JavaScript borrows from the functional programming paradigm, and the use of _higher-order functions_ (functions that take functions as arguments) is common.

Consider this simple `for` loop

```javascript
const m = [4, 6, 2, 7];
for (let i = 0; i < m.length; i++) {
  console.log(m[i]);
}
```

We might rewrite this loop as:

```javascript
m.forEach(function (i) {
  console.log(i);
});
```

or using an ES6 ["arrow" function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```javascript
m.forEach((i) => console.log(i));
```

Note that arrow functions can have either "concise body", like the above,
containing a single expression which becomes the return value, or the "block
body" surrounded by curly braces. The latter requires an explicit return
statement.

In general arrow functions are preferred for their conciseness. For example, instead of

```javascript
const f = function moreDescriptiveNameForF() {};
```

we could write

```javascript
const f = () => {};
```

Also note that arrow functions and anonymous functions created with `function` have subtle differences that won't matter much for us now, but may become important later:
<hidden-block message="Click for details if you already know some JS">
**Details** Arrow functions don't have their own `this` and close over the `this` of the enclosing scope when they are defined. Functions defined with the `function`
keyword have their own `this` and that `this` is set differently based on how
they are called. This probably doesn't make any sense to you now, but at some point it will be important to you...

</hidden-block>

Some common methods (operations) that use this pattern are `map`, `filter`,
`reduce`, and `sort`. In each of these examples we are using higher-order
functions to abstract over actions (e.g. filtering an array to keep just
those elements that satisfy a predicate) not just values. What do we mean by
abstracting over actions? Instead of a writing a function that filters data
with specific (and fixed) predicate and applying that function to arbitrary
data, we are writing a generic filter function that can be applied to arbitrary
data _and_ implement arbitrary predicates (by supplying a different predicate
function value). For example:

```javascript
const filterPos = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 0) {
      result.push(array[i]);
    }
  }
  return result;
};

const filterNeg = (array) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0) {
      result.push(array[i]);
    }
  }
  return result;
};

filterPos([-1, 0, 1]);
filterNeg([-1, 0, 1]);
```

Can be written as:

```javascript
[-1, 0, 1].filter((item) => item >= 0);
[-1, 0, 1].filter((item) => item < 0);
```

What is the difference between `forEach` and `map`? The latter returns a new
array of the same length with the values produced by invoking the function
argument on the input array. Knowing that, how could we implement `map` with
`forEach`, i.e. how would you implement `function map(a, f)` such that

```javascript
const a = [4, 6, 7, 9];
map(a, (item) => item + 1); // Equivalent to map(m, (item) => { return item + 1; });
```

produces `[5, 7, 8, 10]`. As a hint, check out the [Array
methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
and note that an empty array can be created with `[]`.

<hidden-block message="Click for solution">

```javascript
const map = (a, f) => {
  let result = [];
  a.forEach((item) => {
    result.push(f(item));
  });
  return result;
};
```

</hidden-block>

### Closures

Consider the following
[example](http://eloquentjavascript.net/3rd_edition/03_functions.html#h_hOd+yVxaku).
What will get printed?

```javascript
const wrapValue = (n) => {
  let local = n;
  return () => local;
};

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1()); // What will print here?
console.log(wrap2()); // What will print here?
```

In JavaScript, "inner" functions have access to variables defined in containing
lexical scopes. That is the anonymous function created inside `wrapValue` can
use the local `local` variable (similar to many other programming languages).

More than just have "access" to variables in enclosing scopes, defining a
function references a variable defined in an enclosing scope creates a
_closure_, i.e. the combination of the function _and_ the lexical environment in
which that function was declared. That environment includes any local variables
that were in scope when the function was defined. Thus this code will print

```
1
2
```

as the `wrap1` function value is a closure over the local variable initialize
to be 1, while the `wrap2` function value is a closure over the local variable
initialize to be 2.

We will use closures extensively. Much of the JavaScript code we write (both
"front-end" and "back-end") is "event-based". That is we want to connect some
particular actions to an event, such as a click, triggered by the user. We do
so by attaching a "callback" to the event. That callback is typically a
function that formed a closure over the necessary data for that action.

Alternately you could think about closures as being similar to objects (in a
OO sense) with only one method.

What will be printed by the following
loops ([source](https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example))?

```javascript
var funcs = [];
for (var i = 0; i < 3; i++) {
  // Create 3 functions and
  funcs[i] = () => {
    // store them in the funcs array,
    console.log("My value: " + i); // each should log its value.
  };
}
for (var j = 0; j < 3; j++) {
  funcs[j](); // Run each function to print values
}
```

<hidden-block message="Click for solution">

Surprisingly:

```
My value: 3
My value: 3
My value: 3
```

What you are observing is the interaction between `var` scoping rules and
closures. Recall that the scope of the `var` is the entire function (or in this
the case global environment). Thus each function is closing over the same
`var`. If we replace `for (var i = 0; i < 3; i++)` with `for (let i = 0; i < 3; i++)` the loop will work as intended, because each `let` variable is scoped to
the loop body and there are thus three different "i" variables (slightly
different than C/C++).

Earlier we said not to use `var`, why then are we learning more about it here
(especially since `let` would "do the right thing" here)? Recall that part of
this course is learning about working with legacy code and `var` is used in a
lot of JS legacy code. _But don't use it yourself_

</hidden-block>

### Objects

Like Java and Python, JavaScript is object oriented. Everything is an object.

Objects have properties and methods, which we can access with dot notation or
via the indexing operation, i.e. `obj.name` and `obj['name']` are equivalent.

We can create object literals just like they were Python dictionaries, and work
with them in similar ways:

```javascript
let rectangle = {
  x: 20,
  y: 20,
  width: 10,
  height: 25,
  aspectRatio: () => {
    this.width / this.height;
  },
};
```

```javascript
> rectangle.x
20
> rectangle['y']
20
> rectangle.color = 'red';
'red'
> rectangle
{ x: 20,
  y: 20,
  width: 10,
  height: 25,
  aspectRatio: [Function: aspectRatio],
  color: 'red' }
```

In our above example, `aspectRatio` is a method (a property that is a
function), but it is only available on the `rectangle` object. To share properties
between objects that are instances of a class we can use prototypes.

JavaScript is a "prototype-based language", that is each object has a
prototype. You can think of the prototype as a "fallback". From [Eloquent
Javascript](http://eloquentjavascript.net/3rd_edition/06_object.html), a
helpful introduction to this topic and the source for the following quote and
description:

> When an object gets a request for a property that it does not have, its
> prototype will be searched for the property, then the prototype’s prototype,
> and so on.

These prototypes (accessible via `Object.getPrototypeOf(obj)`) forms a tree with
`Object.prototype` at the root.

To create a new instance of a class we need to create an object with the
appropriate prototype _and_ all the properties that instance must have. Doing
so is the constructor's job. An example JavaScript constructor:

```javascript
function Hello(name) {
  this.name = name;
}
```

If you invoke the `new` operator on a function, that function is treated as a
constructor. When you invoke `new Hello`, an object with the correct prototype
is created (the `Hello.prototype` property), that object is bound to `this` in
the constructor function, and ultimately returned by `new`.

All constructors (all functions) have a `prototype` property. There is an
important distinction between the constructor's prototype and its `prototype`
property. The former is `Function.prototype`, since the constructor is a
function, and the latter holds the prototype for objects created via that
constructor. Properties that should be shared by all instances of a class are
added to the constructor's prototype property, e.g. `Hello.prototype`.

This may seem foreign to you. ES6 introduced class declarations (using the `class` keyword)
implemented on top of JavaScript's much more flexible prototypal inheritance
features. These classes will likely seem more familiar to you and we will use
them this semester.

Consider the following
example ([source](https://github.com/addyosmani/es6-equivalents-in-es5#classes)):

```javascript
class Hello {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return "Hello " + this.name + "!";
  }

  static sayHelloAll() {
    return "Hello everyone!";
  }
}

class HelloWorld extends Hello {
  constructor() {
    super("World");
  }

  echo() {
    console.log(super.hello());
  }
}

const hw = new HelloWorld();
hw.echo();
hw.hello();

console.log(Hello.sayHelloAll());
```

The equivalent ES5 code would approximately be (alternatively a more faithful
[translation](https://goo.gl/ZvEQDq) generated by the Babel transpiler):

```javascript
function Hello(name) {
  this.name = name;
}

Hello.prototype.hello = function hello() {
  return "Hello " + this.name + "!";
};

Hello.sayHelloAll = function () {
  return "Hello everyone!";
};

function HelloWorld() {
  Hello.call(this, "World");
}

HelloWorld.prototype = Object.create(Hello.prototype);
HelloWorld.prototype.constructor = HelloWorld;
HelloWorld.sayHelloAll = Hello.sayHelloAll;

HelloWorld.prototype.echo = function echo() {
  console.log(Hello.prototype.hello.call(this));
};

var hw = new HelloWorld();
hw.echo();
hw.hello();

console.log(Hello.sayHelloAll());
```

I don't want to downplay the flexibility and power of JavaScript's prototypal
model. For example, it enables "concatenative inheritance" (often termed
mixins). See this
[post](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
for more examples. And I do want to note that many people are not a fan of the
`class` keyword. If you are interested I encourage you to learn more. But I
also don't want us to get hung up on the way to our higher-level goals in the
course. Thus the extensive use of the `class` keyword and its more familiar
structure.

### Closures as "Classes"

The combination of closures and "everything as an object", allows us to use
closures in ways we might use classes in other languages. Consider the
following implementation of a counter.

```javascript
const counter = function CounterClosure() {
  let count = 0;
  return () => count++;
};
```

In action:

```javascript
> let cn = counter();
undefined
> cn();
0
> cn();
1
```

Why does the first `cn()` call return 0 (when it should be incrementing)?
Postfix
[increment](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment_()>),
i.e. `++` after the variable, returns the value of the variable before the
increment operation, where as prefix increment returns the value after the
increment, e.g.

```javascript
// Postfix
var x = 3;
y = x++; // y = 3, x = 4

// Prefix
var a = 2;
b = ++a; // a = 3, b = 3
```

Here, `count` is effectively a private member that can be manipulated by the
returned closure but not accessed outside it. How could we use "everything as
an object" to obtain access to the `count` field without incrementing? That is how could you
implement a `value` method that would return the private `count`? As a hint,
because functions are objects, they have properties...

<hidden-block message="Peek at an implementation">

```javascript
const richCounter = () => {
  let count = 0; // "Private" count variable
  const increment = () => count++;
  increment.value = () => count;
  return increment;
};
```

In action:

```javascript
> let rc = richCounter();
undefined
> rc.value()
0
> rc()
0
> rc.value()
1
```

</hidden-block>

### Deconstruction and Spreading
