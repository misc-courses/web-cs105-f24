---
path: "/lectures/lecture9-bdd"
title: "Lecture 9 - BDD"
name: "Lecture 9 - BDD"
date: "2019-10-08"
published: false
---

## Motivating Behavioral Driven Design (BDD)

<!-- Adapted from David Patterson and Armando Fox under CC-BY-SA-NC -->

Why do SW projects fail? Failing projects:

- Don't do what customers want
- Or are late
- Or over budget
- Or are hard to maintain and evolve
- Or all of the above

How do Agile processes help us avoid those problems? Recall that in an Agile process you:

- Work closely and continuously with stakeholders to develop requirements, tests
- Maintain working prototype while deploying new features every iteration.
  Iterations are typically 1 or 2 weeks instead of Waterfall's 5 major phases,
  each months long.
- Check with stakeholders on what’s next, to validate building right thing

Behavioral Driven Design (BDD) asks questions about behavior of an application
before and during development to reduce miscommunication. BDD is really about
having conversations (recall the emphasis on individuals and interactions in
the Agile Manifesto).

> Individuals and interactions over processes and tools

We translate those conversations into _user stories_, lightweight descriptions
of how the application will be used. Those user stores can be translated into
_scenarios_ that in turn become automated _acceptance tests_. Recall that an
acceptance test verifies that the SW satisfies the specifications/requirements.

These stories, scenarios and tests describe the behavior of an application
_not_ its implementation. In contrast, TDD and unit tests describe the
implementation.

## User Stories

A _user story_ describes something that the user wants, written:

- as 1-3 sentences,
- in plain language,
- in collaboration with the user,
- often on a 3x5 index card.

User stories are often written in the Connextra format:

"As a [kind of stakeholder]<br/>
I want to [do some task]<br/>
so that [some result or benefit]."

Why 3x5 cards? Non-threatening to all stakeholders, easy to (re)organize, easy to rewrite as we learn more during development.

An example for our Film Explorer:

```
As a user
I want to click on a film
so that I get more information.
```

User stories will play an important role in our Agile approaches. We will maintain a prioritized list (the "product backlog") of user stories to implement (with possibly 10s-100s of user stories).

### S.M.A.R.T. user stories

- Specific
- Measurable
- Achievable
- Relevant
- Time-bound

The combination of specific and measurable could be translated to "testable".
We aim to achieve (implement) each user story in one development iteration
(i.e. sprint), typically two weeks. If a story will take (is taking) longer
than one iteration we should split it into sub-stories. That is we should
"time-bound" each story. If development exceeds the time budget we should give
up on the story, or split it into smaller stories.

Is our example user story SMART?

Definitely achievable and readily time-bound. Measurable in the sense that we
could imagine how to test. But both specific and not, and not clearly relevant.

How could we rewrite our story to be more specific and relevant?

```
As a user
I want to click on a film to get a plot summary and other details
so that I can see if I will like the film
```

Compared before, our user story is more specific and relevant to the
stakeholder.

<!-- 1. Hand out 3x5 cards
1. Have students write two user stories for the Film Explorer application (write large)
1. Query for examples (and tape to board to demonstrate use on a Kanban-style board) -->

### Testable User Stories

Although we made our user story more specific, still more detail is needed to
actually construct acceptance tests. To do so we can translate the story into a
series of testable _scenarios_. A common format is (implemented in the Cucumber
[Gherkin language](https://docs.cucumber.io/gherkin/)):

"Given [a context],<br/>
When [an event happens],<br/>
Then [an outcome should occur]."

Refining our previous story as testable scenarios in this format:

```
Given a film summary is shown,
when I click on the title,
then the detail view is shown with the plot overview and poster image,
```

and

```
Given that the film detail is shown,
when I click on the title,
then the summary view is shown.
```

These scenarios can be turned, nearly directly, into automated acceptance tests
with [Cucumber](https://cucumber.io). The idea behind Cucumber is to create a
meeting point between developers and customers. The scenarios are not code so
that they can be understood by customer, but are sufficiently formalized to be
executed automatically. A Cucumber test is composed of:

1. `Given` steps represent state of world before event, the preconditions
1. `When` steps represent event, e.g. simulate user pushing a button
1. `Then` steps represent expected postconditions, the test expectations
   with `And` and `But` extending any previous step.

For example:

```
Given I open the url 'http://the/test/url'
When I click on the element 'Jurassic World'
Then I expect the element 'img[src="http://the/poster"]' is visible
```

The steps are mapped to functions that implement clicking, etc. with
arguments extracted with regular expressions. In this example, based on
[cucumber boilerplate](https://github.com/webdriverio/cucumber-boilerplate),
the quoted expressions with the URL, title, CSS selector, etc. are the
arguments.

Note that you don't have to use Cucumber to implement "Given-When-Then"-style
tests. For simplicity, we will use code (and the Enzyme library) instead of
trying to incorporate Cucumber (although you could if you wanted to do so in
your project). Why? Cucumber brings non-trivial overhead (implementing
functions for the different steps) in an already packed semester.

### BDD Perspectives

A quote that resonated with me...

<blockquote class="blockquote">
Having conversations is more important than capturing conversations is more important than automating conversations
<footer class="blockquote-footer"><a href="https://www.slideshare.net/lunivore/behavior-driven-development-11754474">Liz Keough</a></footer>
</blockquote>

Recall that BDD is all about encouraging conversations with stakeholders!

## Conversations with stakeholders: Lo-fi mockups

SaaS apps often faces users, which inevitably leads to the challenge of how to
get the customer to participate in UI design so that they are happy with the
result. Specifically, we are aiming to avoid WISBNWIW (What I said But Not What
I Wanted). And we want to do so without actually building a prototype.

Lo-Fi mockups and storyboards, i.e. a pencil and paper drawing of the UI that
show how the UI changes based on user actions, can be very helpful. Think of it
like a movie storyboard, but non-linear.

I think you will find Lo-Fi mockups have some real advantages compared to
jumping directly to HTML:

- Lo-Fi mockups are less intimidating to nontechnical stakeholders
- Lo-Fi mockups are less likely to confuse nontechnical stakeholder (it looks like a webpage, but doesn't work like a webpage)
- The customer is more likely to suggest changes to UI if there isn't code behind it (i.e. they perceive minimal cost to making a change)
- The customer is more likely to focus on interaction rather than colors, fonts, etc.

In your projects, you will likely be the customer, but even so, I think you
will find that above advantages still hold, especially the last two...

Remember that what you think is cool, is not what your customers/users may think
is valuable. Frequent feedback is essential. Investing lots of time in hi-fi
mockups will make it harder to get frequent feedback, and potentially make that
feedback expensive (what if you invested all that time only to get it
wrong...). Make getting it wrong cheap so that you can quickly iterate to find
the right solution.
