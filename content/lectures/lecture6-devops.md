---
path: "/lectures/lecture6-devops"
title: "Lecture 6 - DevOps"
name: "Lecture 6 - DevOps"
date: "2019-09-26"
published: false
---

## Deployment: Closing the loop

Programs that are never deployed (for whatever relevant definition of deployed)
have not solved their motivating problem. Thus we need to get to deployment!

To do so we must first answer several questions:

- Are we ready? Is our application in a working state?
  Do we have the necessary resources, e.g. webservers, databases, etc. to
  actually deploy our application?
- How do we actually deploy our application to its production setting?

We will be at our most efficient when we minimize the "delta" between the
current "version" of the application and the next "version" of the application.
Why? Small integrations (e.g. of a single new feature) into the master branch
will be fast and predictable. Bugs will hopefully be identified sooner, in a
smaller subset of the codebase (you only changed a small part of the system),
while the changes are still fresh in your mind.

To do so we will practice _Continuous Integration_ (CI), that is merging small
changes frequently instead of merging a large change at the end of the
development cycle.

Similarly we will be most efficient when we can automatically provision the
necessary compute resources and automatically deploy our application to those
resources. To do so we will practice a "DevOps culture", that is the tight
integration of development and operations, to facilitate easy (and frequent)
deployment.

In both cases the goal is to make what was a rare, and thus a difficult and
scary process, routine.

### Continuous Integration (with Travis CI) and Continuous Delivery

[Key practices of Continuous
Integration:](https://martinfowler.com/articles/continuousIntegration.html#PracticesOfContinuousIntegration):

- Maintain a single source repository
- Automate the Build (and the Build becomes a proper noun)
- Make your build self-testing
- Everyone commits to the mainline every day
- Every commit should build the mainline on an integration machine
- Fix broken builds immediately
- Keep the build fast
- Test in a clone of the production environment
- Make it easy for anyone to get the latest executable
- Everyone can see what's happening
- Automate deployment

We will use a combination of convention and tooling to support our CI workflow.
First convention: we will treat the master branch as the deployable branch. We
want to then to keep it "green", that is make sure all commits build and all
tests pass. We will develop new features on "feature branches" to segregate those changes until they are complete and ready to be integrated into the master branch (i.e. all tests pass, etc.).

A quick summary of our workflow:

1. Create a feature branch, e.g. `git checkout -b my-feature` (combining branch
   creation with `-b` and checkout)
1. Edit, add, commit ... (with tests!)
1. Make sure all tests pass

If you are working alone you can "integrate" your new feature back into the master branch with:

1. `git checkout master`
1. `git merge my-feature`

But we are rarely working alone. On a team we need to make sure we stay in sync
and create opportunities to get a second pair of eyes on our code (i.e. create
opportunities for code review).

1. `git pull origin master` to fetch changes in upstream master branch and
   merge them into your feature branch (note that this doesn't update your
   local master branch). Resolve any conflicts and make sure tests pass.
1. `git push origin my-feature` to make your changes visible to your teammates
1. Create a pull request on GitHub with your changes to obtain feedback.
   Depending on the review, revise before merge or withdraw request.
1. After a successful code review merge your pull request on GitHub and update your local repository (see the [practical](practial-deploy-cra.html) for more detail):

   ```
   git checkout master
   git pull --prune
   git branch -d my-feature
   ```

How do the tools support this workflow? We will use [Travis
CI](https://travis-ci.com/) to automate the build and testing. We add a YAML
file, `.travis.yml`, to our repository that specifies how to build and test the
application. If all the steps complete without an error, then our build
succeeds and is "green". If the tests fail there is a problem that needs to be
fixed before we are ready to integrate the pull request. This file ensure that
the application always builds in a consistent environment(s) that is similar to
the eventual production environment.

When we enable a repository in Travis, the service monitors the repository for
commits and pull requests. For the latter, Travis will build and test the code
that _would be_ created by the pull request, ensuring it is "safe" to merge.
Travis will notify the authors and update the pull request with the results of
the build so that "everyone can see what is happening".

There are two related
[concepts](https://martinfowler.com/bliki/ContinuousDelivery.html):

- _Continuous Deployment_: Every change automatically gets put into production,
  and thus there are many production deployments each day.
- _Continuous Delivery_: An extension of CI in which SW is deployable
  throughout its lifecycle, the team prioritizes keeping SW deployable, and it
  is possible to automatically deploy SW on demand.

We will be aiming for a Continuous Delivery-like workflow in which our
applications start and stay deployable throughout the development process. As
with CI, this reduces the complexity (and risk) of deployment by enabling us to
do so in small increments. And Continuous Delivery facilitates getting user
feedback by frequently getting working SW in front of real users. Although to
mitigate risk companies will often first deploy for a small subset of users.

### DevOps (with Heroku)

What is DevOps? Like Agile, DevOps is not _a_ process or approach but instead a
set of values (or a culture or philosophy). There is no one definition, but
generally its core principles
[are](https://landing.google.com/sre/book/chapters/introduction.html):

- Involvement of the operations function in each phase of a system’s design and
  development,
- Heavy reliance on automation versus human effort,
- The application of engineering practices and tools to operations tasks

In furtherance of the first principle, in some settings there is a single team
that is responsible for the entire application lifecycle from development to
testing to deployment. The role of automation is to improve efficiency, reduce
the chance for human error and provide always up-to-date documentation of the
workflow.

The cloud has made large-scale HW widely available with minimal barrier to
entry. Providers like AWS offer Infrastructure-as-a-Service, that is you can
rent HW and services by the hour, GB, etc; all provisioned via APIs. You are
still responsible for connecting (in a virtual sense) and administering those
resources - a non-trivial task. The ability to programmatically provision
resources (the corresponding opportunities for automation) has accelerated the
adoption of DevOps approaches.

There are several common architectural "design patterns" for web applications,
e.g. the ["Three Tier
Architecture"](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture).
That commonality can be "factored out" to create "higher level" platforms for
deploying specific kinds of applications, often termed Platform-as-a-Service (PaaS).

[Heroku](https://www.heroku.com) is one of the best known of these PaaS
offerings. Heroku makes it easy to allocate resources, e.g. computational
units, databases, etc. and then automatically deploy your application with a
push to a Git repository.

Heroku itself runs on top of Amazon AWS. Initially there was a considerable gap
between the interface Heroku offered and what AWS offered. Increasingly though
AWS and other IaaS providers are offering more PaaS-like features, bridging
that gap.

Heroku offers a very capable free tier that we will use in class for production
deployment (alternately you can use <http://basin.cs.middlebury.edu>).

You could deploy the CRA color picker to Heroku with (from within your
application directory):

```
heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku master
```

The first command creates the Heroku app (including defining a `heroku` remote
in our Git repository. Here we use a specific
["buildpack"](https://devcenter.heroku.com/articles/buildpacks), customized to
deploy CRA apps. "Buildpacks are responsible for transforming deployed code
into a slug, which can then be executed on a dyno." The `push` actually deploys
your application!

In a more complex application, we may allocate additional resources, like a
database, in between creating the application and deploying it.
