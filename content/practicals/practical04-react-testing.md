---
title: "CS 312 - Practical Four"
date: "2019-10-03"
dueDate: "2019-10-03 5p"
path: "/practicals/practical04"
template: "assignment"
name: "Practical 4"
published: true
---


#### Goals

- Learn some basic techniques for testing React apps
- Get some experience using Jest and Enzyme

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/vZc-Ydee) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.

1. Install the package dependencies by running `npm install` inside the root directory of the newly cloned repository. 

    You may see warnings like the following. These can be ignored for this practical.
    ```
    npm WARN ts-pnp@1.0.1 requires a peer of typescript@* but none was installed.
    npm WARN jest-styled-components@6.3.1 requires a peer of styled-components@^2.0.0 || ^3.0.2 but none was installed.
    ```

You [previously](practical01) used Jest for unit testing JS code. Today we are going to use Jest in combination with the [Enzyme](http://airbnb.io/enzyme/) library to test a React application. Note that to use Enzyme with CRA, you typically need to [install additional packages and create a setup file](https://facebook.github.io/create-react-app/docs/running-tests), however the skeleton code includes everything you need.

## Regression Tests



### Smoke test

The easiest form of testing we can perform is called a [**smoke test**][smoke]. Unlike the testing we saw earlier, we aren't going to assert anything, nor will we test anything explicitly. All we will do is try to render a component. If the process throws any errors, the test will fail, otherwise it succeeds. This kind of test is great for quick and dirty **regression testing**, where we are trying to make sure that adding new features or fixing bugs hasn't inadvertently added any errors in unexpected places. Note that it doesn't actually tell you that the *functionality* hasn't been broken, just that it didn't catch fire, as it were (the name comes from the hardware side of the world, where a smoke test means "plug it in and see if smoke comes out"). 

For our smoke test, we will test the whole render tree of the `FilmExplorer` component. You will find the file `FilmExplorer.test.js` in the `src` directory. We have already provided the imports for you. 

As mentioned during lecture, we need to mock the fetch function to deal with the fact that `FilmExplorer` wants to get data from the server. The test file already includes a set of sample films and the `mockFetch` function described during the lecture. 

You need to "install" the mock before you run your tests, and then remove it when they are done. Create a new test suite that does that using the following code:


```javascript
describe('FilmExplorer test', () => {
    beforeAll(()=>{
      jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    });

    afterAll(()=>{
      global.fetch.mockClear(); 
    });

    // Add your tests here
});
```

Now we are ready to write the smoke test, which simply looks like this:

```javascript
test('Smoke test', async () => {
  const comp = mount(<FilmExplorer />);
  await act(async()=> await flushPromises());
  comp.update();
});
```

That's it. We just mount the component and hope for the best. Any exceptions or other errors will cause the test to fail.

### Snapshots

Jest provides another quick regression testing tool called [snapshots](https://jestjs.io/docs/en/snapshot-testing.html). You take a snapshot of the component at a time when you like the way it looks. Jest saves a representation of the component, and then every time you run the tests, Jest regenerates the component and compares it to the snapshot. If the component changes, the test will fail, which is a cue to either fix the offending code, or to take a new snapshot because the change was intentional.

Note that the snapshot is not a literal picture, it is a JSON description of the component that can be quickly compared.

In `FilmExplorer.test.js`, create a new test and call it `'Snapshot test'`. In your test, render the `FilmExplorer` with mount again. You will again need the magic invocation: `await act(async()=> await flushPromises());` and then `comp.update()`. To run the snapshot test, just add the line `expect(comp).toMatchSnapshot();`.

Note that you didn't write anything to generate the snapshot. Jest will do that automatically the first time the test is run.

You will find that Jest has created a new directory called `__snapshots__` in the same directory as your test file. Open this up and look at the snapshot that is stored in there. This should be committed with your code so that subsequent tests can use it.

So that you can see how the snapshot test works, go into `SearchBar.js` and find where the place where write the name of the app ("FilmExplorer") and change it to something else. If you run the test now, the snapshot test will fail. Notice that you are provided with a diff showing what has changed. 

Of course, sometimes you will be making a change and you *want* the page to be different. If you are running the test watcher (`npm test`), you can just type <kbd>u</kbd>, and Jest will update the snapshot. Go ahead and update your snapshot to acknowledge your change.

Can you use snapshots for TDD?
<hidden-block message="Answer">
No. Recall in TDD we write the tests first. But snapshots require a working implementation. Snapshots are most useful for regression testing.
</hidden-block>

The snapshot test also allows us to see the difference between `shallow()` and `mount()`. Copy your snapshot test and name the first `'Snapshot test - shallow'`. Instead of `mount`, use `shallow` for the rendering. After the test has run, look in the snapshot file (it is a just a text file that can be opened in your editor). You will see the two snapshots inside the (one) file. You should be able to see that in the test using `shallow`, only the child components and their props are shown, not their contents. You will also see that the `useEffect` didn't fire, so the `FilmTableContainer` isn't loaded.

## TDD with React

If you are really paying attention, you will see that there is a new feature that has been added to Film Explorer. There is a small arrow next to the sort tool. If you click it, nothing happens, but we would like it to change the sort order of the films. 

If you look in the code, you will see that the `FilmExplorer` component has a new piece of state called `ascending`, which is passed down to `SearchBar` to determine the direction of the arrow, but currently the state is not updated by clicking the arrow. You will now practice some Test Driven Development (TDD) by writing tests to reflect what the `ascending` prop *should* do, and then writing the code so that it *does* do it.

### Testing state changes

We have a general pattern that we follow when writing tests around state changes. 

- Test that we are in the initial state
- Initiate an action that should change state
- Test that we are in the new state
- Initiate action to return state to original
- Test that we are in original state

The first step is often overlooked, but important to establish that the state change is moving from a known baseline state. Without that, we can't know that a state change actually occurred. The last two steps are less important, but worth doing when the state is a binary toggle like our arrow.

Add a new test to `FilmExplorer.test.js` called `'Arrow changes direction'`. Start by copying the code from the smoke test to get the component mounted and initialized with the data.

We need to find the arrow component in order to test that it changes its display to reflect state changes, and also to simulate clicking it to initiate that change.

To find the component, we will use Enzyme's [`find`](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/find.md) function to locate the button component. The `find` function takes in an [Enzyme selector](https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md). The Enzyme selectors are properly a subset of CSS selectors, but they can also look for React components by name or by passing in the component function. 

Our arrow button is actually a component called `DirectionArrow`, so we can find it by the component name. The syntax for finding it looks like 

```javascript
const arrow = comp.find('DirectionArrow')
```

To check the state, we will look at what the user would see (the visual representation). 

```javascript
expect(arrow.text()).toBe('↑'); 
```

Enzyme allows us to simulate user interaction fairly simply: `arrow.simulate('click');`.


Add these lines into the test, and then finish it up by simulating another click and testing if the state has flipped back to `true`. 


```javascript
test('Arrow changes direction', async() => {
        const comp = mount(<FilmExplorer />);
        await act(async()=> await flushPromises());
        comp.update();
        const arrow = comp.find('DirectionArrow');
        expect(arrow.text()).toBe('↑');
        arrow.simulate('click');
        expect(arrow.text()).toBe('↓');
        arrow.simulate('click');
        expect(arrow.text()).toBe('↑');
        
    });
```


If you run the test, the test should fail. To get the state to update properly, `FilmExplorer` needs to pass down a `flipDirection` callback that toggles the `ascending` state. Add this as a property to `SearchBar`. 

<!-- 
I debated using flipDirection versus having the component just passing the right value to the setter. I kept flipDirection, and it was a mistake. A lot of folks got hung up on it. A good teaching choice, but a bad time management choice.
-->


### Testing props

Clicking the arrow should now flip it back and forth, but it doesn't change the sort order, which it seems like it should. To make this happen, we need to turn our attention to `FilmTableContainer`, the other component rendered by `FilmExplorer`.

As its name suggests, `FilmTableContainer` is a "container component" (CC). It implements the film filtering and sorting. The actual presentation of the films is handled by the `FilmTable` (a "presentation component" or PC). `FilmTableContainer` works by transforming the Array of films its receives as a prop to create a new Array that is passed to `FilmTable` as a prop. `FilmExplorer` is also already providing the value of `ascending` to `FilmTableContainer` as a prop, so we just have to worry about what `FilmTableContainer` is doing with it.

Inside of the `components` directory, you will find `FilmTableContainer.test.js`, which already includes a collection of tests. We will walk through some of these before adding some new ones.

You should also note that we have again provided some dummy films for our tests. This time, however, we don't have to worry about mocking `fetch`. We are isolating `FilmTableContainer`, which allows us to just pass the films in as props as they normally would be.

All of the tests in this file are contained in a master test suite called `FilmTableContainer'`. Since all of our tests will need an instance of `FilmTableContainer`, we have added a `beforeEach` function which will run before each test is run, making sure it has a clean instance to work with. Note that this is making use of the shallow render and that we can set the props directly. Another thing to note is that we are passing `jest.fn` in as a placeholder for the `setRatingFor` callback since we just need to make sure there is a function there.



```javascript
describe('FilmTableContainer', () => {
  let comp;
  beforeEach(() => {
    comp = shallow(<FilmTableContainer
      films={film}
      searchTerm=""
      sortType="title"
      setRatingFor={jest.fn}
      ascending={true}
    />);
  });
 
  // Tests follow...
});
```

Next we will examine some of the tests.

```javascript
test('Empty string does not filter films', () => {
  // get the processed films and convert to array for convenience  
  const processedFilms = comp.find('FilmTable').prop('films').toArray();
  expect(processedFilms).toHaveLength(2);
});
```

The above test uses the [`find`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html) method on the wrapped `FilmTableContainer` to obtain its child `FilmTable`, and the `prop` method to obtain the `films` prop passed down to `FilmTable`. The Jest test expects that array to have length of 2 (since none of the two films in the test input should have been filtered out). 

```javascript
test('Any substring satisfies the filter', () => {
  comp.setProps({ searchTerm: 'sub' });
  const processedFilms = comp.find('FilmTable').prop('films').toArray();
  expect(processedFilms).toHaveLength(1);
});
```

In the above test, we are looking at the filtering behavior of the component. In order to do that, we need to introduce a search term. This test using the `setProps` function to change the props on our rendered component. The file has several more examples that test different criteria.


Of course, for our new feature, we want to think about the sorting order. We have created another test suite to group these tests. Note that it is still inside of the main test suite, so it still benefits from the earlier `beforeEach`.

Here we have a test that looks at the sorting order for the title field. Note that we repeat the check, change, check pattern. 

```javascript
describe('Sorts films by property', () => {
  
  test('Sorts by title', () => {
    comp.setProps({ sortType: 'title', ascending: true });
    let processedFilms = comp.find('FilmTable').prop('films').toArray();
    expect(processedFilms).toEqual(films);
    comp.setProps({ sortType: 'title', ascending: false });
    processedFilms = comp.find('FilmTable').prop('films').toArray();
    expect(processedFilms).toEqual([films[1], films[0]]);
  });
});
```

Add two more tests that perform the appropriate checks for `release_date` and `vote_average`. The "descending" order tests should fail (remember we are employing TDD where first we write the test, then we write the code).

Now fix `FilmTableContainer` so that the tests no longer fail. The `sort` method does not have a parameter to switch the comparison order so you will need to think about a different way to switch the order. 


## Finishing Up

1. Add and commit your changes and push those commit(s) to GitHub.
1. Submit your repository to Gradescope

## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Smoke test
&#x2713;/&#x2717; | Snapshot test
&#x2713;/&#x2717; | Click to update test
&#x2713;/&#x2717; | Sort order tests
&#x2713;/&#x2717; | Films are sorted properly 
&#x2713;/&#x2717; | Passes all ESLint checks 


[smoke]: https://en.wikipedia.org/wiki/Smoke_testing_(software)
