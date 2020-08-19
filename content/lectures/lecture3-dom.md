---
path: "/lectures/lecture3-dom"
title: "Lecture 3 - JS and the DOM"
name: "Lecture 3 - DOM"
date: "2019-09-17"
published: true
---



## The Document Object Model (DOM)

A web page (or document) is a set of (many) nested boxes, i.e. nested elements.
The DOM is a tree data structure representing the nested structure of the
document. The boxes (HTML tags in our context) are nodes in the tree. [The DOM
properties and methods (the API) provide programmatic access to the tree to
access or change the document's structure, style or
content.](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) 

More specifically JavaScript [can](https://www.w3schools.com/js/js_htmldom.asp):
* Change all the HTML elements in the page
* Change all the HTML attributes in the page
* Change all the CSS styles in the page
* Remove existing HTML elements and attributes
* Add new HTML elements and attributes
* React to all existing HTML events in the page
* Create new HTML events in the page

The root of this tree is Document. It's child is the `html` tag, whose children
are the `head` and `body` (thus `head` and `body` are *siblings*), etc. all the
way down the leaf nodes containing text (or childless HTML elements). We can
[programmatically
navigate](http://eloquentjavascript.net/13_dom.html#h_ShZPVipWw/) the DOM
using tree concepts like parent, children, etc.

As an example, navigate to the course webpage and open the [Firefox web console](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console). Here we can
experiment "live" with the DOM API... Try some of the methods from the links
above, like `document.children`. For more detail about the tree-based API,
review the [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node),
[ParentNode](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode) and
[ChildNode](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode)
interfaces.

Some examples:
```
> document
```

Some built-in properties of `document`:

```
> document.head
> document.body
```

Alternately we can explore via the "tree" API, e.g.

```
> document.children // only available on elements and only shows other elements
> document.childNodes // shows all children, e.g. DOCTYPE declaration
> document.lastChild.lastChild // navigate to the body element
```

<!-- 

Show a preview of this process
1. Open up course home-page 
1. Open inspector
1. Look at `document`, `document.body` and `document.body.children`

 -->



It is more likely however, that we will find relevant elements based on their
type (e.g. `<h2>`), id, CSS class, etc. We can do so with the
[querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
method that accepts CSS selector string as an argument.

Some example "simple" selectors: element type, #id, .class, ... Note that CSS
[selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors)
can be quite sophisticated (with combinations of type, class, etc.), but we are only going to scratch the surface here.

```
> document.querySelectorAll("h3")
```

We can also modify these elements via JavaScript:

```
> document.querySelector("h2").innerHTML = "Class canceled today!"
```

*Note that in this example, we switched from `querySelectorAll` to `querySelector`. The first returns a list, so we would have to iterate through to find the one we wanted or to change all of them. `querySelector` on the other hand, returns the first instance found on the page, which may or may not be unique.*


Or in a more complex example, let's add some text to the sidebar menu. We do so by
creating a DOM node and inserting into the tree (with `appendChild` or other
related methods like `insertBefore`, `replaceChild`, etc.). 


```
> const elem = document.querySelector(".sidebar");
> const annc = document.createTextNode("Run away!");
> elem.appendChild(annc);
```


We can restyle elements using similar tricks:

```
> document.querySelector(".sidebar").style.background = "red";
```



JavaScript uses an event listener model for handling interaction.  If you want
an element to respond to an event, e.g. a "click" you add an event handler to
the element. The handler is a function you would like to be invoked when the
event happens (i.e. a callback). We can do this generally with `addEventListener`,
but there are also older more specific functions for registering event
handlers, e.g. `onclick`, `onkeydown`, etc. that are widely used (we will use
`onclick` extensively with React). 

```
> elem.onclick = (evt => alert("An emergency!"));
```

with `addEventListener`:

```
> elem.addEventListener("click", evt => alert("Another emergency!"))
```

## Motivating Example: A RGB color picker

We will create a RGB color picker similar in spirit to this
[example](https://www.w3schools.com/colors/colors_rgb.asp), with three sliders
(R, G and B) that control a color swatch.

We will eventually demonstrate many of APIs we discussed today, but let's start
with a simple implementation in which we have statically created all of the
HTML elements, i.e. the swatch and sliders. The role for JavaScript is to
respond to `oninput` events for the slider input element by updating the color,
specifically the CSS
[background](https://developer.mozilla.org/en-US/docs/Web/CSS/background)
property, and the color components numeric value.



To do so, we will need to:
1. Obtain the DOM elements for the corresponding HTML elements (the swatch
   `<div>`, slider `<input>`s, value `<span>`s) with `getElementById`
1. Create a callback function that updates the swatch background color and the
   numeric values
1. Bind the callback to the slider's `oninput` event. Note that we purposely
   choose this event instead of `onchange` (the two
   [choices](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
   for `<input type="range">`. The latter only "fires" when the change is
   committed by the user, i.e. they release the mouse, not for all changes to
   an input).


<!-- 
Obtain the DOM elements

    const colorBox = document.getElementById('color-swatch');
    const colors = ['r','g','b'];

    const labels = colors.map((color) => {
    return document.getElementById(`value-${color}`);
    });

    const sliders = colors.map((color) => {
    return document.getElementById(`slider-${color}`);
    });

Create a callback function that updates the swatch
    const update = function() {
        colorBox.style.background =
          `rgb(${sliders[0].value}, ${sliders[1].value}, ${sliders[2].value})`;
        sliders.forEach((slider, index) => labels[index].innerHTML = slider.value);
    };

Bind the `oninput` methods of the sliders to the callback
    sliders.forEach((slider) => slider.oninput = update);

Call the `update()` function to make the sliders and the swatch agree initially.
    update(); 
    
    -->




Knowing that we can create HTML elements dynamically, let's DRY up our solution
by creating the picker dynamically. Doing so is the focus of today's [practical
exercise](/practicals/practical02-color-picker.html).
