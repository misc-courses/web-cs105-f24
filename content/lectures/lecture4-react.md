---
path: "/lectures/lecture4-react"
title: "Lecture 4 - Introduction to React"
name: "Lecture 4 - React"
date: "2019-09-19"
published: true
---


React is a framework for just the View in MVC (although not all would agree with that characterization). And in particular it is designed to solve a very specific problem in client side applications: implementing updates to multiple views of the same data. 

Consider the Color Picker... for each color component, the state, we have three "views": 1) the position of the slider itself, 2) the numeric value label, and 3) the color swatch. All three need to be updated when we change that component. How can we do so? What patterns could be relevant?

* Event-based model (e.g. Backbone): Changing the data triggers an event. Views can register for those events and update themselves when notified.
* Two-way binding (.e.g Angular): Assigning to a value propagates the data to dependent components and components, e.g. an input, can make updates that "flow back".
* Efficient re-rendering (e.g. React): React takes a simpler approach... just re-render all of the components when the data changes. 

A key innovation in React is making that re-rendering process very [fast](https://calendar.perfplanet.com/2013/diff/).

React maintains a virtual DOM that represents the ideal state of the UI. Changing the application state triggers re-rendering, which changes the virtual DOM (those changes are fast since only the "virtual" DOM is changing). Any differences between the virtual DOM and actual DOM are then reconciled to the bring the actual DOM to the desired state. But only those elements that changed are updated making this process more efficient.

Those operations on the (virtual) DOM are the "part that is the same" and occur entirely "behind the scenes" within React. As a developer your focus is just on rendering the desired UI.

### If React is just the V, what about M & C?

As we will see React components can be quite sophisticated and incorporate features we might otherwise associate with models and controllers. Related tools like Flux or Redux are sometimes used with React in those roles. Or React is often used for the client side of an application whose server has M & C-like functionality.

## create-react-app

Just as we implemented packages from the top-down, i.e. starting with a
skeleton, we will build React applications from the top-down using the
`create-react-app` (CRA) skeleton tool.
[CRA](https://github.com/facebook/create-react-app) sets up a fully functional
React application with all the necessary supporting infrastructure (e.g.
Webpack for packaging production assets and Babel for transpiling). CRA is not
the only way to setup a React application, and as with some of our other tools,
e.g. the AirBnB ESLint configuration, we may not agree with some of the choices
made by the CRA developers. However, it provides a robust starting point with many best practices built in.

More generally, we often want to seek out a skeleton when starting a project
(not just with React) to get up and going quickly (and hopefully with best
practices). 

Getting started with CRA:

```
npx create-react-app my-app
cd my-app
npm start
```

The above command sequence creates the application and starts a development
server with your application at <http://localhost:3000>. You can also run your
tests via `npm test` and create an optimized bundle for deployment via `npm
run build`.

Over the course of the semester we will learn about some of the nice features
of this skeleton. Your assignment skeletons have all been created with CRA.


## React: basic concepts


### Components

The fundamental unit of React is the component. In React, we can implement components as either *classes* or *functions*. For our purposes, we will primarily stick to function-based components, but many examples you find online will use classes.

A function-based component is a function that takes a single argument, which we refer to as the **props**, and returns a hierarchy of components (think of these children components like a nested tree, similar to the DOM itself) with a single root. The root element returned by the function is what is added to the virtual DOM. 

The first step in building a React app is break down the UI (the view) into a hierarchy of components and sub-components. In the color picker there is one main component (the color picker itself, with the swatch) and the 3 sliders and corresponding value displays. 


### State

What state do we need? The value of the sliders. We know from our earlier implementation that the input element itself can hold state. However in React, the typical practice is to use *controlled* components, in which the value of an input is controlled by state in the React component. This enables us to use that state to control other aspects of the view while maintaining a "single source of truth".

To add state information to a function component, we will use [hooks](https://reactjs.org/docs/hooks-intro.html), which is a brand new addition. At its simplest, we can create state with the `useState()` function. This returns an array with a constant value (the current value for our state object, initialized to the value we pass into `useState()`) and a setter function for updating the state. 

Some notes about state:
* Do not modify state directly, instead use the setter.
* Favor immutable state data (like ints) so you aren't tempted to change the contents.
* State updates may be asynchronous. React may batch updates, and so you
  shouldn't assume the state has actually changed after the call to the setter.
* State updates are merged: React merges the object you provide into the
  current state so you can update a single property at a time.

But that puts us in the same place as before in the non-React color picker. We need to make the values of each color component available to the parent to control the color of swatch. Per the React [documentation](https://reactjs.org/docs/lifting-state-up.html):

> Often, several components need to reflect the same changing data. We
> recommend lifting the shared state up to their closest common ancestor.

We will pull the state for the color values up to the parent component and pass those values back down as props to the individual sliders. But, all React components must act like pure functions with respect to their props. That is a component can't modify its props (this enables efficient updates). Or alternately, think of it as "data flows down" via the props. To communicate updates "back up" we supply a callback to the child that modifies the state in the parent. Using this approach we preserve the data flow invariants expected by React.


With this change the sliders don't need to know what color they are. All the state is encapsulated in the parent component and passed in the `props`. 

### Pure Components

Since the slider doesn't have any state, it is now considered a "pure component" (and it should be a pure function, i.e. the output is a function only of the inputs with no side effects). React can optimize these considerably, most particularly, it can avoid re-rendering them if the props haven't changed -- even if the parent has re-rendered.


## Example

In class we started the React version of the color picker. The repository containing that code can be found on [GitHub](https://github.com/csci312-f19/example-react-color-picker).


### React and JSX

Since rendering is tightly coupled with other UI logic in React, React provides
JSX, a syntax extension to JavaScript, for describing the elements in the UI.
These elements can be simple HTML:

```jsx
const heading = <h1>Hello, world!</h1>;
```

or React components:

```jsx
const person = <Person name={p.name} address={p.addr} />;
```

The curly braces specify embedded JavaScript. The attributes becomes the props object for the component. 

Since JSX is an extension to JavaScript, we will need a compiler to convert it to standard JavaScript. That is the JSX is being translated to the API we saw previously. CRA integrates the Babel compiler to transpile JSX (and support features of ES6). We will use JSX in our components (as it is much more concise and clear). However, you should realize that it is being translated into normal JavaScript functions. Try out the above examples in the [Babel repl](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=PTAEFEA8EMFsAcA2BTUAJAKgWQDICgBjAewDsBnAF1AAtloATASxIHNQBeUAHmoEYA-NMkSIiAGlAB3IgCdE9AIRdgffgG48ICDAQpQxBKWQkKhUpVDxkMsqQ7cACtdslQJOMnYBveADp3sMgAvqAM9DLIZGTefmEyIcDqQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.2.2).


### Controlled vs. uncontrolled components

In creating the color picker, we described the `<input>` elements as "controlled". Controlled components are form elements with state controlled by React. Uncontrolled components maintain their own state. The latter is the way `<input>` elements naturally work (recall our original color picker).

The former, "controlled", is the [recommended approach](https://reactjs.org/docs/forms.html#controlled-components) as it ensures there is only one source of truth, the React state. We set the `<input>` element's value from state, and provide an `onChange` (or other relevant) handler to update that state in response to user input. Each state change triggers a re-rendering that shows the changes the user just initiated. The React [forms documentation](https://reactjs.org/docs/forms.html#controlled-components) has a number of examples of controlled inputs, e.g. for a text input:

```jsx
const [title, setTitle] = useState('');

<input
  type="text"
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
```

The value of the component is set from the parent's state and any changes are immediately captured and used to update the parent's state. 


## React in summary

* React implements the View in MVC
* A React applications is organized as components
* A component takes in parameters, the "props", and returns a hierarchy of
  views to display
* These hierarchy of views update the virtual DOM. Changes to the virtual DOM are efficiently propagated to the actual DOM in the reconciliation process.
* There (generally) must be a single root object (version 16 added
  [fragments](https://reactjs.org/docs/fragments.html))
* Components can't change their props (and parents can't see their children's state). Information is passed to parents via callbacks (passed in the props).
* A React element might be simple HTML, e.g. a `<div>` or a React component
* Components can be classes, or functions that return views. We will use the latter.

As you are starting to work with React, I recommend the ["Thinking in React"](https://reactjs.org/docs/thinking-in-react.html) section of the React documentation.

