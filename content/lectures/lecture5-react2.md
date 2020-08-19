---
path: "/lectures/lecture5-react2"
title: "Lecture 5 - More React"
name: "Lecture 5 - React2"
date: "2019-09-24"
published: true
---

## React and ...

### React and PropTypes

JavaScript is dynamically typed, and as such, it is easier to introduce
type-errors than in a statically typed language. To catch typing errors there
are JavaScript extensions like [TypeScript](https://www.typescriptlang.org/)
and [Flow](https://flowtype.org/) that provide static type checking. React
provides a form of dynamic type checking for props via
[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) that runs in development mode. 


Each component as a `propTypes` object that specifies validators for the props.
`PropTypes` provides a wide range of potential validators. For example, for the
color picker we could specify: 

```javascript
LabeledSlider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
};
```

The more specific we can make these requirements the more likely we are to
catch type errors (generally true for all kinds of validation). Note that
validation isn't the only purpose for providing `PropTypes`. Doing so is also a
way of documenting the "type signature" of the component (analogous to a
function signature in a statically typed language).

The need for `oneOfType`, and that the types could be inconsistent, is a "code
smell", that is an approach that doesn't seem quite right. The value is
conceptually an integer, however the underlying value type of HTML input
elements is specified to be a string (even if it is an input of type "number").
Instead of allowing both, let's instead always convert the string to an
integer.

To do so, let's adopt a "TDD-like" approach in which we first update the
"test", the `PropTypes`, verify we have an error then fix that error. If we
require `value` to just be a number (i.e. `value: PropTypes.number.isRequired`), we should see an error in the browser's
JavaScript console like:

```
index.js:1446 Warning: Failed prop type: Invalid prop `value` of type `string` supplied to `LabeledSlider`, expected `number`.
    in LabeledSlider (at App.js:52)
    in ColorPicker (at App.js:81)
    in App (at src/index.js:6)
```

Then we can update the slider `onChange` callback to to parse the string into
an integer:

```jsx
onChange={(event) => setValue(parseInt(event.target.value, 10))}
```

Now we should no longer observe a `PropTypes` error. To eliminate the chance
for obtaining fractional values from the slider I also explicitly set the step to be an
integer. 

### React and CSS

How can we style our application?

* We can include a static CSS file as an asset, i.e. the traditional approach.
  But this approach is not very modular and doesn't necessarily work well with
  a component-based design as we would to have merge the styles for all
  components.
* We can "import" CSS files (using features of Webpack to bundle that CSS into
  the JavaScript file) for each component. The challenge is that by default the
  imported CSS exports all class names into global selector scope creating a
  potential for naming collisions. We can either incorporate the "scope" into
  the class naming (using different formal naming schemes) or use
  [extensions](https://github.com/webpack-contrib/css-loader#scope) to specify
  CSS classes as `:local` and thus automatically create unique identifiers (the
  latter, however, requires customizing our CSS for Webpack).

    ```javascript
    import './ColorPicker.css';
    ```
* Implement CSS-in-JS. CSS-in-JS integrates styling into the components as
  JavaScript code (similar to our previous example in which we created the
  styles as JavaScript objects but with many more features, like handling
  differences in browsers). For example, using the [styled
  components](https://www.styled-components.com) library: 


    ```
    npm install --save styled-components
    ```

    We create a styled "semantic" component for the previous `.color-label`
    class

    ```jsx
    const ColorLabel = styled.div`
    display: inline-block;
    width: 50px;
    text-align: left;
    `;
    ```

    and use it in place of the `<div>` in the JSX:

    ```jsx
    <ColorLabel>{props.label}:</ColorLabel>
    ```

    Because these "styles" are just code, we can adapt the CSS based on props,
    etc., e.g.

    ```jsx
    const ColorSwatch = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
    background: ${(props) => `rgb(${props.red},${props.green},${props.blue})`};
    `;
    ```

    and use the corresponding component:
    
    ```jsx
    <ColoSwatch red={red} green={green} blue={blue} />
    ```
    
    

    *Note* that in JSX, React components, including Style Components, need to
    start with a [capital
    letter](https://reactjs.org/docs/jsx-in-depth.html#specifying-the-react-element-type).
    That is how the JSX compiler distinguishes between HTML and React
    components. I suggest defining your Styled Components outside of your React
    components, e.g. before the class definition. If you create your Style
    Component inside of the `render` method, for instance, it appears that
    React sees the component as entirely different in each re-render and so
    rebuilds that portion of the DOM. While the page will still look correct,
    inputs will lose focus (and potentially other undesirable behavior).

    Note that since we deleted the id attribute on the color swatch we will also need to update our tests (shown in the linked repository).

The subtleties of CSS are left as an exercise for the reader, but much of the
debate about the best approach to CSS is a debate about *separation of
concerns*. [Separation of
Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) (SoC) will be a
recurring topic this semester, but in short, SoC is a design principle that
each "unit" in a program should address a different and non-overlapping
concern.

In this context, a common SoC argument around HTML/CSS is that HTML should
specify content (only) and CSS should specify the style (only), i.e. separate style from
content. Proponents of CSS-in-JS also make a SoC argument, but that one
component should be entirely separate from the others.

# Film Explorer, Immutability, Inheritance

## Exploring the Film Explorer

Experiment with a simple [Film Explorer](https://floating-island-22541.herokuapp.com/) application and explore its [code](https://github.com/csci312-f19/example-filmexplorer-standalone). After implementing the [Color Picker](https://github.com/csci312-f19/example-react-color-picker) with PropTypes and Styled Components, the components of the Film Explorer should look familiar.

Note the `key` property in the "list" of films in the `FilmTable` (we saw this in our assignment as well). The `key` property uniquely identifies element in a list (to speedup rendering by identifying which specific elements have changed). From the [React documentation](https://reactjs.org/docs/lists-and-keys.html): "A good rule of thumb is that elements inside the map() call need keys." 

## Container components

Exploring the demo, we observe that the films are sorted (and filterable) and can be "clicked" to show more detail (the poster and overview). We could so as part of the `FilmTable` and `FilmSummary`, but we would like to separate the logic and UI (recall "Separation of Concerns"). We can do so by introducing a "container component" (CC). A CC is not a thing per-se, it is a [design pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

A CC is concerned with "how the application" works and thus implements logic, is often stateful, but does not typically generate DOM (HTMl elements). Its counterpart is the "presentation component" (PC). A PC is focused on how the application looks and typically generates styled DOM but does not fetch or manipulate data. A CC will typically implement some logic, passing the result of that computation (pure or stateful) to children components (which may be PCs or more CCs) to be displayed.

For the Film Explorer we can extract two container components:
* `FilmTableComponent`: Implements the film sorting (and eventual filtering),
  passing the order films as a prop to the `FilmTable` presentation component
* `FilmComponent`: Implements the switching between summary and detail views

## Immutability

Since React works by re-rendering on any state change, it is important for it to be aware that state has actually changed. The first piece of that is to only use our state setters. With primitive values, this is fairly robust. Consider the `FilmContainer`:

```jsx
function FilmContainer (props) {
  const [showDetail, setShowDetail] = useState(false);
  const View = showDetail ? MovieDetail : FilmSummary;
  return (
    <View {...props} onClick={()=>{setShowDetail(!showDetail);}} />
  );
}
```

We are storing a Boolean value, and when we request our variable we make it a `const`, so we will get complaints from the interpreter if we try to write into it directly. The less obvious piece is what happens when we call the setter. React tries to be intelligent and not re-render if it doesn't have to, so it will check to see if the value is actually a new one. With a primitive value, this is just a simple equality check. 

Things get more complex with objects, arrays, and other data structures (okay, they are all objects). These can be declared constant, but that only means that the *reference* to the memory location stays constant. The stored value can be changed. This is legal:

```JavaScript
const obj = {a:1, b:2};
obj.a = 5;
```

This has a couple of problems. First, it means we can accidentally change state when React isn't looking. Second, even if we are careful and pass the modified object back to the setter, React will think nothing has changed because the reference is the same. It won't do a "deep" equality check, and even if it did, we just changed React's "copy" as well, because React just has a reference to the same object (it may not say "pointer" anywhere, but understanding how they work is important in all languages...). So what can we do?

If `FilmExplorer` we have two examples. One approach is to be very cautious and **copy** any object when we are going to make a change. Here is an example for when we set the rating of a film:

```JavaScript
 const setRating = (filmid, rating) => {
    const alteredFilms = films.map((film) => {
      if (film.id === filmid) {
        return { ...film, rating };
      }
      return film;
    });
    setFilms(alteredFilms);
  };
  ```

This actually provides two examples because we are changing two things: we are changing the rating of a single film, but the actual state variable is the whole list of films. If we just changed the film itself, we would be modifying state (the list `films`), and that change would be invisible even if we passed `films` to `setFilms()` since the reference wouldn't have changed. So, you can see that we are using `map()`, which generates a brand new array with the results of all of the individual function calls. Of course, our function merely returns the original items for all films except for the one we are changing. For the film itself, we use the spread operator to make a new object to replace the old copy. With care, this technique of making copies allows us to treat complex objects as if they were immutable.

Unsurprisingly, there are [a variety of libraries](https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md) that provide you with actual immutable data structures that enforce the "new copy on change", all with different approaches and different mechanisms to make the process or or less transparent.  

In `FilmExplorer`, we have added `immutable.js`, one of the older libraries for creating immutable data structures. In particular, we have wrapped the original array of films in an immutable [`List`](https://immutable-js.github.io/immutable-js/docs/#/List). This mostly works like an array, but it always returns a new copy when do something that would change it (like adding, removing, sorting, etc.). Unfortunately, while it *works* like an array, it doesn't particularly *act* like one. There are little changes like the fact that we need to use `size` instead of `length`, and other little quirks like that. We also have to be careful when swapping it in for an array to remember that `sort` on arrays sorts in place, while the immutable `List` does not. This can have the effect of complicating the code, which is never a great sign.

In truth, if we wanted to be fully robust, there is an immutable `Record` as well, for standard objects, and we could have turned our `films` state into a `List` of `Records`...

The big picture:
* Don't mutate values you are using for state or props
* Primitive data types should be favored
* To make state update *pure*, *replace* instead of *modify*
* If performance becomes an issue, or you have deeply nested state objects, try using immutable data structures like those in immutable.js



## Composition vs. Inheritance (in brief)

In checking out `FilmDetail`, we see it includes the `FilmSummary` view plus
the additional image, description, etc. Thus we have an opportunity for code
reuse. But how? Inheritance or Composition?

Both will work. But the community best practices are to use [composition
instead of
inheritance](https://reactjs.org/docs/composition-vs-inheritance.html). That is
`FilmDetail` uses but not does not inherit from `FilmSummary`. Why?  The
former, composition, is more flexible and can satisfy every potential use case
for inheritance.

From our perspective there is value in following the community norms. Doing so
improves the readability and maintainability of our code. But it also not clear
that `FilmDetail` satisfies the principles of an inheritance relationship.

More generally, how do we decide when to use inheritance? One is to ask if the
relationship is described by "is a" or "has a". The former suggests
inheritance. For example a car "is a" vehicle but "has" wheels. In this
context, the `FilmDetail` "has a" `FilmSummary` but it is does not seem that
a `FilmDetail` "is a" `FilmSummary`. 

A more formal way to think about inheritance is the [Liskov Subsitution
Principle (LSP)](https://en.wikipedia.org/wiki/Liskov_substitution_principle):

Subtype Requirement: Let ϕ(x) be a property provable about objects *x* of type
*T*. Then ϕ(y) should be true for objects *y* of type *S* where *S* is a
subtype of *T*.

Or alternately if *S* is a subtype of *T*, I should be able to use an *S*
everywhere I use a *T*. 

LSP is one of [five key design
principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) for
OO programming that we will discuss later in the course. LSP can help us
identify some problematic OO designs. 

Consider squares and rectangles. A square "is a" rectangle. However, imagine we
define a `setWidth` method for our rectangle. We should reasonably believe that
setting the width of a rectangle will not change the height, but in a square we
would need to override `setWidth` to also change the height. Thus having
`Square` inherit from `Rectangle` would violate the LSP. 

Would having `FilmDetail` inherit from `FilmSummary` violate the LSP? Not
entirely clear, but it would seem weird to think about using `FilmDetail`
where a `FilmSummary` is expected.


<!-- The Liskov Substitution Principle (LSP): https://dev.to/kayis/is-react-solid-630 -->


