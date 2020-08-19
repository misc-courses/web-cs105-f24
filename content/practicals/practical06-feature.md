---
title: "CS 312 - Practical Six"
date: "2019-10-10"
dueDate: "2019-10-11 5p"
path: "/practicals/practical06"
template: "assignment"
name: "Practical 6"
published: true
---

**Now Optional -- but strongly suggested**

#### Goals
- Practice pair programming
- Practice adding a feature using a SCRUM-like workflow
- Employ BDD and TDD

## Prerequisites

1. Form a team of 2-3 students with your neighbor(s) to pair program. One of you will be at the keyboard (the "driver") while the other(s) are assisting as the "observer(s)".
1. One of the pair should click through to the GitHub [classroom assignment](https://classroom.github.com/a/FVPXccw7) to create your private repository. Then clone that newly created repository to your local computer as you have done previously. The person who created the repository should add their pairs(s) as "Write" [collaborators](https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository) on the repository.
   

1. Install the package dependencies by running `npm install` inside the root directory of the newly cloned repository. 

    You may see warnings like the following. These can be ignored for this practical (though you may certainly run `npm audit fix`).

    ```
    added 2335 packages from 793 contributors and audited 49499 packages in 29.642s
    found 1328 vulnerabilities (63 low, 10 moderate, 1253 high, 2 critical)
    run `npm audit fix` to fix them, or `npm audit` for details
    ```
1. Travis CI should start testing your application automatically (it detects the `.travis.yml` file). When [getting started](getting_started.html), you should have signed up for a Travis CI account. 

## Display Genre information in the Film Explorer `FilmSummary`

One of the potential features you identified in discussion with your customer was adding genre information to the film summary and detail display.  Let's get started by drafting a suitable user story... The footnotes are links to the
relevant class notes and slides.

### User Story and Story Points

What would be a SMART user story for this feature?[^1] 

<hidden-block message="View a possible story">

```
As a user,
I want to view all the film genres in the summary,
So that I know if I am likely to be interested in the film.
```

</hidden-block>

How many points would you assign to this story?[^2]. To answer that question you need to know how to approach this feature. Each flim has zero or more genres (termed a "has many" association), provided in the `genre_ids` Array in the film objects returned by the server, e.g.

```javascript
{
    "id":340382,
    "overview": "The movie follows ...",
    "release_date": "2015-09-19", 
    "poster_path":"/aCIG1tjNHbLP2GnlaW33SXC95Si.jpg",
    "title": "Attack on Titan: End of the World",
    "vote_average":4.2,
    "rating":4,
    "genre_ids": [18,14,28,878]
}
```

We want to render those genres as a comma separated string after the average rating, e.g. have the following markup in the `FilmSummary`:

```html
<p>Action, Adventure</p>
```

Since the flim's genre ids are already included the data sent by the server, you won't need to modify the server to obtain that data. Most the work will be in making modifications to the `FilmSummary` component. To help you out, we have given you a JSON file containing the mapping used by [The Movie DB](https://themoviedb.org), which you will find in the `components` directory. This has been imported into `FilmSummary.js` like we previously imported `seed.js`.

```javascript
import { genres } from './genres.json';
```

How much work do you estimate will be involved in rendering meaningful labels for those genre IDs? How many points would you assign? 

<hidden-block message="View a possible estimate">

There is no right or wrong answer to this question, they key is be consistent as a team (and over time). This is a relatively simple feature, so I think 1 or 2 points would be a reasonable estimate.

</hidden-block>

### Development

Imagine that you have assigned your and your partners this user story in your team's backlog tracker and are now ready to begin development. Your first step is to create a feature branch with Git on which to work on your feature (segregating those changes until your are ready to integrate your completed feature into the master branch).

We will be practicing Test-Driven Development (TDD) in class, so let's start with the tests.[^3]

Given a test film with specified `genre_ids`, you would expect the corresponding labels to exist in the rendered component. This scenario-like description could be translated into a test with the Enzyme library that `mount`s the `FilmSummary` component and uses [`containsMatchingComponent`](http://airbnb.io/enzyme/docs/api/ShallowWrapper/containsAllMatchingElements.html) to test whether all of the corresponding genre names are present. For example if the test film belongs to the Action and Adventure genres (which our sample film does):

```javascript
test('Shows genres', () => {
  const comp = mount(
    <FilmSummary {...film} onClick={jest.fn} setRatingFor={jest.fn} />
  );
  expect(comp.containsMatchingElement(<p>Action, Adventure</p>)).toBe(true);
});
```

In addition to testing correct functionality, we also want to make sure your component works in possible corner cases. What could be some relevant corner cases to consider?

* Empty `genre_ids` array
* A film object that doesn't have a `genre_ids` property
* An invalid `genre_id` entry

To give you a head start, all of these tests have been provided in `FilmSummary.test.js`.

Although the mapping from `genre_ids` to genre names is not complicated, it is involved enough to benefit from its own function (that handles the above cases). Implement a `idsToGenres` function in `FilmSummary.js` that takes an array of genre ids as an argument and returns an array of strings with the genre names. There are many ways to go about this. One potential approach is a sequence of `map`, `filter` and `map` calls that find the corresponding genre entry (or `undefined`), filter out the `undefined` values and finally returns the array of names.

To prepare for testing I have created an initial implementation of the function in `FilmSummary.js` (note that it is exported so it accessible to our tests).

```javascript
export function idsToGenres(genre_ids) { 
  genreIds = genreIds || []; // if genreIds is undefined, set it to []
  // TODO: Replace with your implementation
  return [];
}
```

Run your tests -- they should all be failing. Fill in the implementation of `idsToGenres` so that the tests pass. 

I have already added the appropriate JSX to display the genres.

### Integration with Travis CI

Once you're satisfied with your feature implementation, the next step is to integrate your feature into the master branch of your project. We don't do so immediately. Instead we want to create a Pull Request (PR) on GitHub, so that our teammates have a chance (and a mechanism) to review our changes and provide feedback (even if it is just to say "Looks Good to Me" or LGTM). As described in class[^4] we want to:
1. Commit our changes to the feature branch. Since you are pairing, note your pair's contribution by using GitHub's [co-authoring feature](https://help.github.com/articles/creating-a-commit-with-multiple-authors/). Add the following line to the end of your commit message (after a blank line):

    ```
    Co-authored-by: name <name@example.com>
    ```

    The key information is the e-mail address, which must be the e-mail address
    associated with the person's GitHub account. Each commit can have multiple
    co-authors.

1. First make sure our repository is up-to-date with any upstream changes, by checking out `master` and pulling any recent changes. *(Note that there shouldn't be any changes to the master -- this is just to give you the process to go through when others may be adding things to master)*.
    ```
    git checkout master
    git pull origin master
    ```
1. Checkout our feature branch and rebase our changes on top of master. Resolve any conflicts. Make sure your tests still pass. 
    ```
    git checkout my-feature-branch
    git rebase master
    ```
1. Push the feature branch to GitHub.
```
git push --set-upstream origin feature-branch
```

1. Open your repository at GitHub and create a pull request (PR) to merge the changes from your newly pushed branch onto the `master` branch. You should be able to create the PR on the main page of your repository or alternately you can create a PR from the "Pull request" tab.

1. Navigate to the page for your PR. Here you should see the notifications from Travis CI. Travis CI should automatically test your PR. If there is a failure, make the fix and push additional commits to update your PR. When all the tests pass, your teammate should review your PR, merging in the changes when they agree it is ready.

1. Once you have merged the changes you can delete the feature branch on GitHub using the button that replaces the 'Merge' button.


1. Delete or otherwise cleanup your feature branch (recall that most of our branches are short-lived).
    ```
    git checkout master
    git pull --prune
    git branch -d my-feature-branch
    ```

## Finishing up

That's it, you're done! No need to submit this to gradescope.



<!-- ## Finishing Up

1. Your changes should already be pushed to GitHub
1. Submit your repository to Gradescope. **Only one teammate should submit. But once they do, they should [add their teammates](https://www.gradescope.com/help#help-center-item-student-group-members) to the Gradescope submission.**

## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Correctly displays genres in the Movie Summary
&#x2713;/&#x2717; | Passes all ESLint checks  -->


#### Links to Lecture Notes and Practicals

[^1]: User stories were introduced in context of [Behavioral Driven Design (BDD)](../lectures/lecture9-bdd) ([slides](../lectures/lecture9-bdd.pdf)).
[^2]: Story estimation was introduced in the context of [Agile and Scrum](../lectures/lecture10-agile.pdf).
[^3]: Unit testing generally was introduced in the context of [NPM packages](../lectures/lecture2-testing.pdf) ([practical](practical01-npm-module)). We used the Enzyme library to test React components in [TDD]((practical04-react-testing) and [BDD](practical05-bdd) contexts.
[^4]: [Slides](../lectures/lecture10-agile.pdf) describing our Git workflow.
