---
path: "/lectures/lecture8-enzyme"
title: "Lecture 8 - Enzyme"
name: "Lecture 8 - Enzyme"
date: "2019-10-03"
published: false
---

## Testing React

Testing functions like the ones you wrote for assignment 1 is conceptually straightforward. You call a function and get a result. You compare the result against what you expect the function to return and they either match or they don't. As we [saw](lecture2-testing), it is not necessarily simple, and it takes some effort to make sure that our tests abide by our F.I.R.S.T. principles, but it is still relatively straightforward.

When we start thinking about testing websites built with a framework like React, we have a couple of new challenges. How do we automatically test to make sure the website looks right? How do we test functionality that is driven by user interaction (like clicking and filling in forms)?

The answer is that we need more tools. We will be using Enzyme (though it is not the only option). Enzyme allows us to "mount" our components "headlessly" (i.e., non-visually). We can then navigate the virtually rendered structure, check the output the browser would render, read the props and states of our components, and simulate interaction with the components.

Enzyme has three functions for rendering components: `shallow()`, `mount()`, and `render()`. It is important to have a reasonable idea of what each one of these options do.

- `shallow()`: [`shallow()`](https://airbnb.io/enzyme/docs/api/shallow.html) does a "shallow" render of a component. That is to say it renders the component, but it doesn't render the contents of any child components. We need to be careful with shallow rendering as it does not call effect hooks.
- `mount()`: [`mount()`](https://airbnb.io/enzyme/docs/api/mount.html) behaves like `shallow()`, but it will render the contents of children as well. So, you use this if you want the entire component hierarchy to be rendered. This is obviously going to be slower to run than using `shallow()`.
- `render()`: [`render()`](https://airbnb.io/enzyme/docs/api/render.html) also does a full render of the component hierarchy, but it renders it to static HTML. So, you can't interact with it and none of the life-cycle methods are called on the components.

Which of these is the most appropriate for unit testing?
<hidden-block message="Answer">
`shallow()` would be the best choice for unit testing since it doesn't waste time rendering the entire tree. You can instead target just the component you are testing. However, `shallow()` would not be a good choice for integration testing. The limited support for hooks also means that we need to use this with care.
</hidden-block>

## Testing with hooks

Hooks are a new addition to React and support for testing them is still evolving. The challenge is that the mechanisms that support them mean that state changes happen at different times and we need to make sure that all of the updates have been applied. In the React testing Utilities, we find a function called [`act`](https://reactjs.org/docs/testing-recipes.html#act), which is intended to wrap any code that would cause a render event.

For the most part, you don't need to worry about `act()`, because Enzyme's rendering and interaction functions already incorporate it. However, there are [some caveats](https://github.com/airbnb/enzyme#react-hooks-support). In particular, the `prop` and `props` functions are not wrapped and will provide stale values under some conditions. Another important caveat is that `shallow` doesn't support the use of `useEffect`, which is called _after_ the render is complete.

### Hooks and testing and Promises, oh my

There is a further complication we need to worry about. Film Explorer gets its collection of films from the server. This is slow and the data is out of our hands, so our tests may not be repeatable (recall the "R" in F.I.R.S.T.). You will have noticed that we included a small subset of the movies in the test file. Our challenge is to get that sample data set into the `FilmExplorer` component.

The solution is to use Jest to mock the `fetch` function the way we did with the current date back in the [birthday practical](practical-npm-module.html). Recall that `fetch` returns a Promise, which resolves to a [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). Then we call `json()` on the response object to parse the JSON data into a JavaScript object. So, when we "fake" the `fetch` functionality, it needs to return a Promise and the data needs to be conveyed in an object resembling a Response object (for our purposes, it just needs to have status information and a `json` function).

This code is included in `FilmExplorer.test.js`:

```JavaScript
/*
    Fake the server responses.

    We wrap our response in a Promise because our code expects
    fetch to return a Promise.
*/
const mockResponse = (data) => Promise.resolve({ ok: true,
                                    json: ()=> Promise.resolve(data) });

const mockFetch = (url, options) => {
  if (options){
    if (options.method === 'PUT'){
        // we don't store any changes, we just return the same object
        const data = JSON.parse(options.body);
        return mockResponse(data);
    }
  }else{
    return mockResponse(films);
  }

};
```

The `mockFetch` function is pretending to be `fetch` -- you can see that it takes in a `url` and an `options` object. We only have two uses for `fetch` in our code: getting the list of films and setting the rating. So that is all that this function supports. The `mockResponse` function wraps the response in a simulated `Response` object and returns it in a Promise that will instantly resolve.

All of this is great, but there is a problem. Because we have added Promises to the mix, the final state update happens asynchronously. This normally isn't an issue, but it adds two additional headaches when it comes to testing.

- the actual state change is no longer wrapped in the `act()` call supplied by Enzyme
- our test code will continue and start expecting things before the component has actually changed.

The solution is that we need to wait for all of the asynchronous calls to finish before moving on. A common pattern is to write a function like this:

```javascript
function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}
```

This creates a new Promise object that will resolve when `setImmediate` finishes, which it doesn't until the final UI paint call in the event queue is done. Of course, this just creates another Promise we need to wait for. So, when we call it, we need to wait for it to finish. We could do this with a `.then()`, but since there is _nothing_ that we want to do until this finishes, we can use the [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) command. This causes a pause in execution until the Promise we are "awaiting" is satisfied. When we do this, we need to declare the entire enclosing function to be asynchronous (with [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)).

So, after a call that will produce a state change asynchronously, we can do something like this:

```javascript
await flushPromises(); // wait for state change to happen
comp.update(); // make sure any pending renders are done
```

The first line waits for any state changes that may happen asynchronously, and the second line makes sure that any pending renders based on that state change actually occur.

Unfortunate, we still have the problem that the state change happens outside of a call to `act()`. So, if the state change we are waiting for happens in an effect hook, we can update this to:

```javascript
await act(async () => await flushPromises());
comp.update();
```

This makes sure that the waiting we do happens inside of an enclosing `act()`, but since the function then needs to be asynchronous, and we need a further `await` to `await` for the call to `act` to complete. Ugly? Yes. Don't worry if you don't get it all. Copy the pattern and if you have issues, ask.
