---
title: "CS 312 - Practical Two"
date: "2019-09-17"
dueDate: "2019-09-18 5p"
path: "/practicals/practical02"
template: "assignment"
name: "Practical 2"
published: false
---

#### Goals

- Set some experience manipulating the DOM with JavaScript
- Start thinking about abstraction and components

## Getting started

Go to the GitHub [classroom assignment](https://classroom.github.com/a/e8aLKwfW). As before, clicking through will create a new repository for you. This time, however, we have provided starter code for you, so you can just clone the repository to your local directory (`git clone <repository link>`, where the `<repository link>` should be replaced with the link provided by GitHub Classroom).

Once you have cloned the directory, open up the `package.json` file and put your name in the "Author" field. Notice while you are there that the dependencies have already been added for Jest and Eslint. The advantage of the `package.json` file is that it makes keeping track of the project's dependencies easier, thus making it easier to redeploy on other systems. Run `npm install` to install of the dependencies specified in the file.

We have also set up the `test` and `lint` scripts for you. As a reminder, these can be run with `npm run lint` and `npm run test`. They should both fail with many errors.

## Overview

The goal of this practical is to create a function that would allow us to create a color picker component dynamically and place it where ever we want. We will tackle this in two stages. In the first stage, we will create a function that handles the repetitive process of building the sliders. In the second stage, we will create a second function that builds the entire color picker, making use of the first function to create the three color channel sliders.

Most of the work of these functions is the fairly mundane work of constructing the various DOM elements and piecing them together. The more interesting problem is how to maintain state and communicate it. In both functions, closures will play an important role. The sliders can update their readouts directly, and the full color picker will maintain an internal representation of the current color. We will use callbacks, passed in as arguments, to communicate changes to interested listeners.

Most of these instructions are very explicit (with many opportunities to copy and paste). However, make sure that you read carefully so you a) don't miss and steps, and b) start to understand what is going on.

## Abstracting the sliders

Open up `index.html`. This is the color picker that we just developed with the small addition of a new `script` tag including the (currently empty) `color-picker.js` file.

Notice the repetitive structure of the channel sliders:

```html
<div class="red-slider">
  <div class="color-label">red:</div>
  <input type="range" min="0" max="255" id="slider-r" value="0" />
  <span id="value-r"></span>
</div>
```

You are going to write a function called `createSlider()` that will build these dynamically. When you are done, you should have exactly matched this structure except for the `id` properties of the `input` and `span`, which we will no longer need.

Go to `color-picker.js` -- you will see that we have sketched out the function for you. Use the comments to help follow along with these instructions.

**Step one:** Create the outer `div` and give it a class. It should look like this:

```javascript
const slider = document.createElement("div");
slider.className = `${color}-slider`;
```

The first line will create a new DOM element of type `div`. Note that this isn't attached to the page, it is a free standing DOM node at this point. The second line sets the class. Notice that we use `className` because `class` is already used in JavaScript. This is one of the few instances where the name of the DOM property in HTML doesn't match the name in JavaScript.

**Step two:** Create the label at the start of the slider. If you look at the structure, you can see this is just another `div`. Create this `div` the same way you created the last one. This time the class should be `color-label`. To create the actual text, set the `innerHTML` property of the element to the color name followed by a ":".

**Step three:** Add the label element to the slider `div`. Assuming you named the label `label`, you can write `slider.appendChild(label)`. This adds the label element as a child of the slider `div`.

**Step four:** Create the `input` element and add it to the slider. Repeat the same process as before, but this time you want an `input` tag instead of a `div`. Call the variable `range`. For the `type`, `min`, `max`, and `value` properties you can use exactly those names to set the values. In other words, you could write `range.type = 'range'`. Set the `min` and `max` to `0` and `255` respectively, and set `value` to `initialValue`. You can ignore the `id` property. Append this element to `slider` when you are done.

**Step five:** Create the read out for the slider value. Call this variable `readout`. Notice that for this element we used a `span`. You don't need to set the `id` property. You should set the `innerHTML` property to the `initialValue` so that it agrees with the range input. Then append `readout` to `slider`.

**Step six:** Hook up the slider's `oninput` function. Just as we did in the original version, we are going to assign a function to the `oninput` property of the `input` element. here is what that should look like:

```javascript
range.oninput = () => {
  readout.innerHTML = range.value;
  callback({ [color]: parseInt(range.value, 10) });
};
```

This will fire off whenever the value of the range input is changed, and will do two things. The first line updates the readout with the new value. The second line calls `callback` and returns an object containing the color associated with this slider and the new value. We use `parseInt` here because JavaScript is reading the value from `input` as a string.

**Step seven:** Return `slider`.

**Step eight:** Run `npm run test`. The first test suit ("Test createSlider") should now all pass. If it doesn't, try to fix the errors. If you can't figure out what the test results are telling you, you can wait for the next phase where you will be able to see the output.

**Step nine:** Commit your changes to git if you haven't already.

## Replacing the static sliders

We now return to `index.html`, where we will replace the static sliders with the ones we just created.

**Step one:** Erase the hard coded sliders, leaving just the color swatch and the surrounding div:

```html
<div class="color-picker">
  <div class="color-swatch"></div>
</div>
```

**Step two:** Erase all of the JavaScript except for `const colorBox = document.querySelector('.color-swatch');`, the `update` function, and the final call to `update()`.

**Step three:** Add these lines after the declaration of `colorBox`:

```javascript
const picker = document.querySelector(".color-picker");
let currentColor = { red: 255, green: 0, blue: 0 };
```

This grabs the outer `div` of the picker so we have a reference to it and creates an object to hold the current value of the picker.

**Step four:** Create the sliders. We are going to call your new function once for each color channel. We could type them all out, but we will get clever and use the `currentColor` object to initialize them.

```javascript
Object.keys(currentColor).forEach((color) => {
  // initialize slider in here
});
```

This construct will loop over the keys of `currentColor` ('red', 'green', and 'blue'), calling the inner function for each one, passing in the key as `color`. Create a new variable and initialize it by calling your function. The arguments should be `color`, `currentColor[color]`, and `update` respectively. Use `appendChild()` to add the new sliders to `picker`. This will add the sliders in after the swatch where they used to be.

**Step five:** Fix the `update` function. The `callback` function is expected to accept our color change object, which `update` currently doesn't. Change the update function to be:

```javascript
const update = function (newColor) {
  currentColor = { ...currentColor, ...newColor };
  const { red, green, blue } = currentColor;

  colorBox.style.background = `rgb(${red}, ${green}, ${blue})`;
};
```

This does a couple of things. First, it adds the missing argument so it can be used as a callback for the slider.

Second, it updates `currentColor`. The first line of the `update()` function is a piece of syntax called [object spread](). Think of the ellipses as "spreading" out the properties of the object. The second thing to realize is that properties can be set multiple times, with the last instance winning. So, if `currentColor` is `{red:0, green: 0, blue: 0}` and `newColor` is `{red: 255}`, we can think of `{ ...currentColor, ...newColor}` as being the same as `{red:0, green: 0, blue: 0, red: 255}`, which is equal to `{red:255, green: 0, blue: 0}`.

Finally, we simplify the update to the background. Note that we use a [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), to "unpack" the keys from the `currentColor` object (note the relationship between spreading and destructuring).

**Step six:** Load the page in the browser and make sure it works again. Open up the developer tools and look at the elements -- they should match the original static structure.

**Step seven:** Commit your changes to git if you haven't already.

## Abstract the whole picker

Abstracting the sliders was good because it reduced the repetition. Abstracting the whole slider will allow us to something even more important -- it will allow us to create a reusable component we can put anywhere.

The steps for implementing the `createColorPicker` function are very similar to what we did to create the slider. You want to duplicate this structure:

```html
<div class="color-picker">
  <div class="color-swatch"></div>
  <div class="red-slider">
    <div class="color-label">red:</div>
    <input type="range" min="0" max="255" /><span>0</span>
  </div>
  <div class="green-slider">
    <div class="color-label">green:</div>
    <input type="range" min="0" max="255" /><span>0</span>
  </div>
  <div class="blue-slider">
    <div class="color-label">blue:</div>
    <input type="range" min="0" max="255" /><span>0</span>
  </div>
</div>
```

In `color-picker.js`, you will find another function: `createColorPicker`. It takes two arguments, `initialValue`, which will have the same format as `currentColor`, and a callback function. You will now implement this function.

**Step one:** Create the outer `div` and give it the class name `color-picker`. Store this in a variable called `picker`.

**Step two:** Create a `div`, and store it in a variable called `colorBox`. Give it the class `color-swatch`, and append it to `picker`.

**Step three:** Create a local variable called `currentColor` and initialize it with `initialValue`.

**Step four:** Add in the sliders and the update function. As hopefully you have realized, you should be able to just copy these lines from `index.html`. Do this, following the instructions in the comments.

**Step five:** Call the callback function from `update`. We want our new component to be able to communicate changes to the color to the outside. Add a line to `update` that calls `callback`, passing it `currentColor`.

**Step six:** Run `npm run test` again. Hopefully everything will now pass.

**Step seven:** Commit your changes to git if you haven't already.

## Replace the static color picker

You can now replace the static color picker with your new function.

**Step one:** Erase all of the HTML associated with the color picker.

**Step two:** Erase all of the JavaScript except for the line creating `currentColor`.

**Step three:** Call your `createColorPicker` function to create a new color picker and store it in a variable called `picker`. Pass in `currentColor` as the `initialValue` argument. For the callback, use `(value) => console.log(value)`. This will just write the color to the console, so you can see that the callback works.

**Step four:** Add the new component to the page by appending `picker` to `document.body`.

**Step five:** Commit your changes to git if you haven't already.

## Wrapping up

Once everything is working, the tests pass, and the linter is happy, commit your changes one more time and push them back up to GitHub. Then submit your repository to Gradescope as described [here](../resources/gradescope).

## Grading

| Points            | Requirement                     |
| ----------------- | ------------------------------- |
| &#x2713;/&#x2717; | Implemented `createSlider`      |
| &#x2713;/&#x2717; | Implemented `createColorPicker` |
| &#x2713;/&#x2717; | Passes all ESLint checks        |
