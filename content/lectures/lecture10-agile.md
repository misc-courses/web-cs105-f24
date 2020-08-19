---
path: "/lectures/lecture10-agile"
title: "Lecture 10 - Agile Development"
name: "Lecture 10 - Agile"
date: "2019-10-10"
published: true
---

# Development Methodologies: Agile, Scrum and more

## Revisiting Waterfall

Recall that Waterfall is an implementation of a larger set of "Plan and
Document" development methodologies. In Waterfall, development follows a
sequence of 5 (cascading) steps:

1. Requirements
1. Design
1. Development
1. Testing
1. Operations

Some of the goals are to: 1) catch errors early (and more cheaply) before they
manifest in subsequent phase, and 2) provide extensive documentation as a
deliverable (to facilitate maintenance and on-boarding new team members).

The problem is reacting to change (e.g. new requirements or new technologies)
after that phase is completed.

## Agile

The Agile philosophy, as described in [The Manifesto of the Agile Alliance
(2001)](http://agilemanifesto.org), was a response to those "heavy-weight"
processes. The goal is was to define principles that enable development teams
to work (more) quickly and be responsive to change.

The Manifesto:

> We are uncovering better ways of developing software by doing it and helping
> others do it.  Through this work we have come to value:
> 
> * **Individuals and interactions** over processes and tools
> * **Working software** over comprehensive documentation
> * **Customer collaboration** over contract negotiation
> * **Responding to change** over following a plan
> 
> That is, while there is value in the items on the right, we value the items on
> the left more.

Note that Agile is a set of principles, not a process. Scrum, Extreme
Programming, etc. are "implementations" of the Agile philosophy. A common
criticism is that the principles and values have been lost in capital "A"
Agile, e.g. the consulting business that has emerged around agile approaches. A
definition of lowercase "a" agility I found relevant (from [Dave
Thomas](https://www.youtube.com/watch?v=a-BOSpxYJ9M)):

* Find out where you are,
* Take a small step towards your goal,
* Adjust your understanding based on what you learned, and
* Repeat

and, when faced with two or more alternatives that deliver roughly the same
value, choose the path that makes future change easier.

## Scrum

The [Scrum Guide](http://www.scrumguides.org/scrum-guide.html) provides a
comprehensive overview of Scrum and will be our reference. Although we will
implement Scrum in class, it is just one implementation of Agile (XP or eXtreme
Programming is another). And despite what the competing certificate programs
would argue, there is no one way to do Scrum. Everyone adapts the processes to
best fit their team and project. 

## Evaluating Agility

Your project is also about process (not just product). That is we are
practicing the formal development processes that we have been learning about
all semester. Thus we will be evaluating you and your team on how well you are
implementing Agile practices. That evaluation is based on metrics derived from
the SW development literature.

In ["Turning the Knobs: A Coaching Pattern for XP through Agile
Metrics"](https://link.springer.com/chapter/10.1007%2F3-540-45672-4_7) the
authors provides a measure of XP practices (also relevant to our processes).
Each question is answered on a scale of 1-10. If you are implementing agile
processes, your self-assessment should have average scores on the order of 7-8.  

1. Two people work together at one computer. They trade turns typing or reviewing and thinking about the big picture.
1. We deliver more frequent, smaller iterations to customers.
1. When working on a big set of code I sync up or check in as follows [...]
1. Do we have test cases and automated drivers for each product class?
1. We move items in and out of the plan based on updated customer needs while keeping the dates steady.
1. We have access to our customer and get feedback from her.
1. We rewrite or redesign code that smells bad or will help position us for new requirements.
1. We keep the design simple now so we can change it as needed in the future.
1. Do you have and follow enough standards so you can read and change each other’s code? Have ’em? Detail? not too much, not too little, [...]
1. People can change each other’s code. We don’t have to wait for the specialist.
1. So you have naming conventions for your objects?
1. Do people work at a rate that’s effective for them over the long run?

The author of ["How surveys, tutors, and software help to assess Scrum adoption
in a classroom software engineering
project"](https://dl.acm.org/citation.cfm?id=2889182) identify several metrics
that they use to evaluate "agility" in student projects. Hopefully these
metrics provide some examples of behaviors to avoid, such as many commits in
the last day/hour of the sprint. 

1. Amount of user story a developer is assigned on average per day.

    The average amount of user stories that were assigned to a developer in a
    sprint (i.e. #sprintUS / #devs). This is without regard to the complexity
    of each story. A good visualization for this is the amount of user stories
    a developer has to accomplish on a full work day on average (i.e.
    (#sprintUS / #devs) / #workDays). If this is significantly lower than
    average / previously, the stories possibly are too large and should be
    split, to allow easier parallel work and future estimation. If this number
    is high (especially higher than a critical threshold [10?]), it is possible
    that nonfunctional requirements (e.g. tests, design requirements,
    deployment, “definition of done”) and communication and context  switching
    overhead were underrated and there are too many stories in the sprint.'

1. Commits within 30 minutes sprint deadline.

    Amount of commits during the last day / last week of the sprint. If
    everything was last minute, the Scrum meetings were ineffective, due to
    lack of content. Furthermore, blockers for / from other teams could not be
    communicated.'

1. User stories that are still open in previous sprints.

    Amount of user stories in previous sprints that are not closed. It is
    likely that these user stories were worked on, but were simply not closed
    due to negligence or were “backup” stories that  weren't of high priority.
    These stories should be closed (or moved) to promote better overview or
    need special attention if they really were forgotten.

1. User stories that were in the backlog of 3 or more sprints.

    A user story that is assigned to the sprint backlog of more than 3 sprints,
    with or without commits referencing it. The more never-ending stories there
    are in a project, the more likely it is that blockers and dependencies will
    become an issue.

1. Amount of commits per Developer.

    Commit early, commit often" is a helpful slogan when developing in large
    teams. In the words of Jeff Atwood (of StackOverflow fame) "if the code
    isn't checked into source control, it doesn't exist" [[Atwood,
    2008](http://blog.codinghorror.com/check-in-early-check-in-often/)].  It
    allows coworkers to build on functionality, makes version control easier
    and can help prevent "Integration Hell"
    [[Jeffries](http://c2.com/cgi/wiki?IntegrationHell)] further down the line.

1. Pull requests that were closed within 30 minutes without comments

    Pull requests can be a tool to help inform team members what functionality
    is added in a collection of commits. It allows team members and
    stakeholders to comment and perform code review. Furthermore, continuous
    integration services can run the proposed changes, making sure all tests
    pass. If pull requests are closed in a short timespan, many of these
    possibilities remain unused.

1. Code is edited heavily by few developers

    Collective Code Ownership, the convention, that every team member is not
    only allowed, but in fact has a positive duty, to make changes to any code
    file as necessary, is part of agile development (especially XP). It can
    help reduce the risk that the absence of a few developer will stall work on
    a certain area of code. Furthermore it can help prevent "Conway's Law",
    helps share technical knowledge between developers and encourages each
    developer to feel responsible for the quality of the whole.

1. User stories that are too large.

    User stories should be small enough to get a quick overview of the work to
    be done, but should contain enough information to be estimatable by the
    developers. It is sometimes stated that user stories should fit on an index
    card. The issues below have double the average length of issues in the
    selected sprint or have double the amount of checkboxes of other stories.
    Both of these can be an indicator that a user story is too large and could
    be split. Smaller user stories can improve the ability to plan as they are
    less likely to deviate from the estimation and sprint backlogs can be
    filled on a more granular basis.

1. Commits that increased code complexity without increasing code coverage.

    Having a high percentage of code covered by tests is essential for ensuring
    the system is thoroughly tested. When committing changes that significantly
    increase the complexity of the code base (>0.5), tests should be committed
    as well, increasing the code coverage. If this is not the case for a high
    percentage of commits, this might be a sign that writing tests and code
    coverage metrics should be paid more attention to.

1. Issues which are suspected duplicates.

    Issues with comments that point to them being duplicates. User stories that
    duplicate features of previous user stories can lead to features being
    implemented multiple times by different teams.

