---
title: "CS 312 - Project  Guidelines"
path: "/project/guidelines"
name: "Guidelines"
published: true
---

# Guide to the CS312 Project

#### Quick Links
1. [Getting Started](#getting-started)
1. [Before the First Sprint Planning Meeting](#before-the-first-sprint-planning-meeting)
1. [Agenda for the First Sprint Planning Meeting](#agenda-for-the-first-sprint-planning-meeting)
1. [Project Setup or "Sprint 0" Deliverables](#project-setup-or-sprint-0-deliverables)
1. [Spring 1+ Deliverables](#sprint-1-completion-checklist)
1. [End of Project Deliverables](#end-of-the-project-deliverables)
1. [Project Evaluation](#project-evaluation)
1. [Project FAQ](#project-faq)


## Project Deliverables Schedule

| Date | Sprint | Group Deliverable | Individual Deliverable |
| ---- | ------ | ----------------- | ---------------------- |
| 10/23 | 0      | Project setup checklist and initial design | Working individual development setup |
| 11/05 | 1      | Sprint 1+ checklist | Sprint evaluation survey |
| 11/19 | 2      | Sprint 1+ checklist | Sprint evaluation survey |
| 12/09 | 3      | Tagged code and presentation | |
| 12/10 | 3      | Final checklist and group report | Individual project report |


## Getting Started 

The project groups were announced in class and posted to Piazza. If
you were not present in class, or don't remember your group assignment, check
out Piazza.

*Please read through the entire set of Getting Started instructions first,
before performing any of the steps!*

#### As an individual, you will need to:

1. Click through the GitHub Classroom [link](https://classroom.github.com/g/2VDY2v_l).

    Unlike past assignments, this is a "Group" assignment in GitHub classroom.
    When you click through you will be presented with the option to join an
    existing team or create a new one (unfortunately we can't initialize the
    teams automatically). Select your team if it already exists, or if not,
    please create it. **Please use the names specified in Piazza if you are creating a team**. Note that these names are just for
    organizational purposes, they do not have anything to do with what you
    ultimately choose to call your application.

    **Everyone needs to click through!** Doing so will add you to the
    corresponding GitHub team, giving you access to your team's repository.

1. Review the [Scrum Guide](https://www.scrumguides.org/scrum-guide.html), and the different roles, meetings and artifacts that make up the Scrum process.

1. Start thinking through (and discussing with your team if possible) your application's major features. I suggest arriving at the Sprint 0 planning meeting with an idea of the "epic" User Stories for your application. Review the User Stories included in the proposal for your project (and others).

## Sprint "0"

The focus of Sprint 0 is project setup, planning and design, not coding. At the end of Sprint 0 you should have all of the infrastructure for your team/project setup, an initial set of "epic" User Stories and an initial set of "lo-fi" sketches of your application design. 

### Before the First Sprint Planning Meeting

As an individual complete the getting started tasks listed above under
["Getting Started"](#getting-started).

### Agenda for the First Sprint Planning Meeting

You have a lot to accomplish in your first formal meeting, including initializing your repository and other tools so that you can begin development in Sprint 1, defining the initial features of your application, and starting the design process.

#### Administrative Tasks

1. Select your Product Owner and your first Scrum Master

    As a team select your [Product Owner](https://www.scrumguides.org/scrum-guide.html#team-po)and the [Scrum Master](https://www.scrumguides.org/scrum-guide.html#team-sm) for the first
    [Sprint](https://www.scrumguides.org/scrum-guide.html#events-sprint).  The former may be the proposer, but need not be. If you have an external customer, the Product Owner will be the primary interface between the [Development Team](https://www.scrumguides.org/scrum-guide.html#team-dev) and Customer. In between group meetings with the customer, the Produce Owner will be the single point-of-contact to ensure efficient and effective communication. In our implementation of Scrum, the Development Team will play a bigger role in managing the Product Backlog than is described in the [Scrum Guide](https://www.scrumguides.org/scrum-guide.html#artifacts-productbacklog). Recall that the Scrum Master is the servant-leader for the team responsible for facilitating the Scrum process. The Development team, and only the development team, is responsible for determining how to turn the Product Backlog into working software.

1. Setup a way to communicate as a team

    We have setup a Slack organization for our class (<https://csci312-f19.slack.com>) and will create private channels for each of the teams. You can find the private invitation link on Piazza.

1. Setup your [Product Backlog](https://www.scrumguides.org/scrum-guide.html#artifacts-productbacklog)

    We will use various GitHub [project management features](https://github.com/features/project-management/) to maintain the product and sprint backlog. The key features you need are: priorities, points and the ability to maintain sprint-specific backlogs (a subset of the overall product backlog). Although GitHub is not expressly designed for maintaining a Scrum backlog, by using milestones, tags and the project boards you can implement all of the features listed above. 
    
    Check out the following (if slightly dated) [guide](https://github.com/jvandemo/github-scrum-workflow) to a GitHub-based scrum workflow. We will use GitHub [issues](https://guides.github.com/features/issues/) as backlog items, issue labels to record points, and project boards and milestones to assign items to specific sprints.  We suggest creating an issue for each item in your backlog and using the GitHub project board (similar to Trello) to organize and prioritize those issues in both the overall product backlog and the sprint-specific backlog. For example you could start with a simple setup with columns for "Product Backlog", "Sprint Backlog" and "Done", and then experiment with additional columns as needed. 
    
    As is often the case in this course, there are many tools we could use for project management and some of those may be "better" than GitHub. However, we are going to standardize on GitHub to reduce the overall logistical complexity and ensure a consistent workflow across the class. 

#### Initial "Epic" User Stories and Storyboards

Recall that agile methods discourage extensive up-front design. But you still need to identify the problems your applications should solve and sketch out the major features. Begin your first meeting by defining and prioritizing some of the "epic" [User Stories](../lectures/lecture9-bdd) for your application. If you have an external customer, you should be defining these users stories in collaboration with your customer. Concurrently begin your lo-fi prototyping. Start drawing simple storyboards for how the stakeholders in your User Stories will interact with your application. Discuss these storyboards with your customer. At the end of this phase of the meeting you should begin to populate your Product Backlog with an initial set of User Stories.

Resist the temptation to brainstorm widely. Recall the Mona Lisa example and our ["Iterative Incremental" approach](https://jpattonassociates.com/dont_know_what_i_want/). Define the broader problem your application will solve (e.g. "woman in a pastoral setting") and how you will generally implement that solution (e.g. the "line" drawing). But focus most of your attention, especially in the beginning, on the core feature(s) of your application (i.e. the face of the Mona Lisa).

#### Defining Nouns, Verbs and Views

As you refine the User Stories, begin to create [CRC cards](../lectures/crc-cards) for the nouns and verbs in the stories. You will probably undershoot the first time through. Look back through your User Stories. The subject and objects of your User Stories are good candidates to become nouns. The nouns will be become the Models in your application and the verbs will often become routes in your server (Controller) or actions in your React components. Here is a [FilmExplorer example](../lectures/crc-cards)

Using your lo-fi prototypes, break your Views into React components. As you refine the design for each item, update the tracker with the additional information (e.g.  attached pictures of the storyboards, CRC cards, etc.). Each item in the backlog should eventually have all the information need for development.

### Project Setup or "Sprint 0" Deliverables

As a group complete the setup and design checklists below (as a group does not mean that all members need to be physically present, just that all of the steps have been
completed for your project). As an individual complete the setup checklist below. Note that you need to complete some group setup tasks first.

#### Group Checklist for the Project Setup

1. Your project repository has been created in the class GitHub organization and all team members are part of the GitHub team for your project (created by GitHub classroom). That is everyone has completed the [Getting Started](#getting-started-before-the-first-spring-planning-meeting) instructions above. 
1. The GitHub classroom assignment initializes your project with a [skeleton](https://github.com/csci312-common/project-starter). Update the `package.json` file(s) with the project name, a project description, contributors, repository, etc.. The READMEs provide more detail, but in summary the skeleton includes both client and server NPM packages (the former initialized with Create React App) and a combined "top-level" package with the "glue" for developing and deploying the application in different settings. *Review the README carefully for instructions on how to install dependencies, run the tests, etc..*
1. All team members can successfully clone the repository and run the project in their development environment. 
1. `npm test` and `npm run lint` execute without error for all project components (i.e. client and server), even if there are no actual tests. For the skeleton this is actually four separate checks: tests and linting for both client and server.
1. The project repository is successfully integrated with Travis CI, i.e. Travis CI tests all components of the project and reports "build: passing".
1. The skeleton is deployed to Heroku or Basin as appropriate for your project.

    If you deploy to Heroku, the initial application owner (the person who
    creates the application) should setup their teammates as "collaborators"
    within Heroku.  Check out the instructions for the [application
    owner](https://devcenter.heroku.com/articles/collaborating) and the
    [collaborators](https://devcenter.heroku.com/articles/collab).

1. The top-level `README.md` has been updated with the following:
    1. A [Travis CI badge](https://docs.travis-ci.com/user/status-images/) showing build status for the master branch (should be "build: passing")
    1. A brief explanation of the need your application addresses
    1. A link to the deployed application on Heroku or Basin
1. Have integrated at least one Pull Request (for example updating the README) in which one teammate creates the PR and another teammate reviews the PR.
1. A commit tagged "sprint0" pushed to GitHub marking the completion of the project setup, You can tag the last commit as "sprint0" with `git tag sprint0`. When you push to GitHub use the `--tags` option to ensure that your tags are pushed as well, e.g. `git push origin master --tags`.

#### Group Checklist for Sprint 0 Design Review

1. Populate your product backlog with your "epic" User Stories, that is the main features your application will implement. These User Stories should be in Connextra format, e.g. "As a [stakeholder], I want to..." and be S.M.A.R.T..
1. Create a set of lo-fi storyboards for the main views in your application. These storyboards should show what will become the main React components in your application. The storyboards should be attached to the relevant backlog items.
1. Create [CRC cards](../lectures/crc-cards) for main "nouns" in your system. The nouns will be become the Models in your application and the verbs will often become routes in your server (Controller) or actions in your React components. For example, for Film Explorer, the main "noun" is `Film`. Images or transcriptions of the CRC cards should be attached to backlog items for the server side of your application (not all backlog items will necessarily be User Stories). 

I will provide feedback on your initial design approach before you start Sprint 1 to help your team get headed in a good direction.

#### Individual Checklist for the Project Setup

As an individual make sure you that you can successfully run the project in your development environment. When you have done so take and submit a screenshot to the "Project Setup: Individual" [Gradescope assignment](https://gradescope.com). Your screenshot should show the Create React App placeholder application.

## Sprint "1+"

### Sprint Planning Meeting

Each sprint will start with a [planning meeting](https://www.scrumguides.org/scrum-guide.html#events-planning) where you the answer the following questions:
* What is the goal of this sprint, i.e. what backlog items can be delivered in this sprint?
* How will you complete the work to implement your sprint goal(s)?

#### Setting the Sprint Goal

Choose one or more of your highest priority items from the Product Backlog as your Sprint Goal. The Sprint Goal (or [Sprint Backlog](https://www.scrumguides.org/scrum-guide.html#artifacts-sprintbacklog)) is the set of functionality that you will implement during the Sprint. Accurately scoping the Sprint Goal depends on knowing how much work each story will require and your team's capability (velocity). Both will be difficult to estimate at first. Thus be prepared to adjust your Sprint Backlog as you begin to determine out how you will implement the items you have chosen for your Sprint Goal.

Given that the first half of the semester focused on React, and that we are just now learning about databases and other back-end technologies, I would suggest focusing your first Sprint on the front-end of your application and implementing only a minimal memory-backed server (recall from the Film Explorer example that you can build a very useful server using in-memory data structures instead of a database). Similarly, I would suggest postponing "necessary evils", such as user authentication, to subsequent Sprints so that you can focus on the core features of your application.

#### How Will You Implement the Sprint Goal?

Begin designing the features you selected for your Sprint Goal. As you do so, aim to break complex User Stories down to smaller User Stories (on the order of a single day's coding effort) and their corresponding Scenarios. Your goal is to be able estimate the Story Points for each item in the Sprint Backlog. Each item, and its corresponding point value, should be entered into your team's backlog tracking tool.

As you refine the User Stories, begin to create or update existing [CRC cards](../lectures/crc-cards) for the nouns and verbs in the stories. Using your lo-fi storyboards, break your Views into React components. As you refine the design for each item, update the tracker with the additional information (e.g. attach pictures of the storyboards, CRC cards, etc.). Each item in the backlog should have all the information need for development.

As you get deeper into the design process, you will likely find it helpful to begin to take ownership of different stories and split into smaller sub-groups to work on those specific items.

At the end of the meeting, you should have defined your Sprint Goal and have an initial design for those features of your application. Each team member should have taken responsibility for one or more items from the backlog.

### Sprint "1+" Completion Checklist

At the end of each sprint your team should complete the following tasks:
1. A tagged commit on master (one of "sprint1", "sprint2", or "sprint3") pushed to GitHub marking the completion of the sprint.
1. A set of closed User Stories or other work items in your sprint backlog tracker assigned to that sprint iteration.
1. Working deployment (to Heroku or on Basin) of the tagged commit demonstrating the completed User Stories.
1. The Travis CI build for your tagged commit is passing ("green").
1. Each team member has completed the confidential self- and peer-evaluation [survey](https://docs.google.com/forms/d/e/1FAIpQLScigXSAzfT8VFd7l2vKRwoGV7BFoWTJgd3cgeuehM7ivva-MA/viewform?usp=sf_link) (**due 24 hours after the Sprint Retrospective**).
1. A short in-class demo showing the features that you completed in that sprint.

The demo is a short (no more than 4 minutes) presentation demonstrating the just-completed features of your application. There are no slides, instead you will demonstrate your software live while describing the relevant user stories. The goal is to elicit feedback from your classmates and or customer (if relevant). The demonstration should run from your deployed application not a local development setup. Since the demo is so short, only 2-3 team members need to present (but it does need to be a different set of team members for each sprint).

### Sprint Retrospective

Immediately after the demonstrations, each team will conduct a [Sprint Retrospective](https://www.scrumguides.org/scrum-guide.html#events-retro). The Retrospective is "an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint." Ask yourself what aspects of your development process and tools worked well and which could be improved (those need not be mutually exclusive lists). At the conclusion of the Retrospective your team should have identified improvements that you will implement in the next Sprint. *Make sure to keep a record of your discussion and any improvements you plan to make.* The outcomes of your Sprint Retrospectives will be part of final project report.

## End of the Project Deliverables

The checklist for the end of the project is largely a superset of the "Sprint
1+" deliverables. Unless otherwise noted, all deliverables are due December 10 at 5:00PM. The specific deliverables are:
1. A commit tagged "sprint3" on master pushed to GitHub marking the completion
   of the sprint (and project).
1. A set of User Stories or other work items in your sprint backlog tracker
   assigned to sprint 3 marked as "done".
1. Working deployment (to Heroku or on Basin) of the tagged commit demonstrating you application (there should be a valid link in the README of your repository to your deployment so we can find it).
1. The Travis CI build for your tagged commit is passing ("green").
1. Each team member has completed the confidential self- and peer-evaluation [survey](https://docs.google.com/forms/d/e/1FAIpQLScigXSAzfT8VFd7l2vKRwoGV7BFoWTJgd3cgeuehM7ivva-MA/viewform?usp=sf_link) (**due 24 hours after the sprint finishes**).
1. Final checkpoint (a checklist, detailed below, to ensure that your project could be handed-off to another team).
1. Instead of a short demo, you will give a longer final technical presentation on 12/09.
1. A short write-up *as a team* summarizing the project submitted to [Gradescope](https://gradescope.com) (details below).
1. A short write-up *as an individual* summarizing your contributions to and experience working on the project submitted to [Gradescope](https://gradescope.com) (details below).

#### Final checkpoint

The final checkpoint is intended to ensure that your project could be "handed off" to a future team for enhancements and maintenance, that is that a future CS312 group could get your application "up and running" in both a development and production environment without your help.

Make sure the following is true for your application *on the master branch when starting from a fresh clone of your repository*:
* You can successfully install all dependencies with `npm install && npm install --prefix client && npm install --prefix server` (or by changing into the respective directories and executing the install commands).
* Executing `npm start` in the top-level directory successfully starts the application in the development environment. If any additional steps are needed to the run the application in development (e.g. starting a database, migrating and seeding the database, etc.) document those steps (including any commands) in your `README.md` file.
* All tests and linting pass, i.e. the following commands do not give errors (should be true if your build is "green" in Travis):

    ```
    npm test --prefix client
    npm test --prefix server
    npm run lint --prefix client
    npm run lint --prefix server
    ```

* Your application can be deployed to Heroku or <http://basin.cs.middlebury.edu> as appropriate. All necessary deployment steps should be documented, including any Heroku add-ons that need to be provisioned, environment variables that must be set, database migrations, etc.. In the case of "secret" (or not-secret) environment variables, note that such variables are needed and send an example `.env` file to us (but don't include those secrets in your README). For example, "the 'AwesomeApp' requires a Google Maps API key and a Google authentication client ID". Any other information needed to use the application in production, such as an "admin" password, should be similarly documented. 

In short, using just the information in your `README.md` file and any `.env` file you send us, we should be able to successfully develop and deploy your application starting from a fresh clone of your repository.

#### Final Technical Demo

At the end of the semester you will give a 15 minute technical presentation
about your project. Your presentation should include:

* A demonstration of your deployed project. Your demo should include a walk-through of the features from a user perspective(s) as well as a description of any important back-end functionality you implemented (e.g. specialized algorithms, interesting technologies you utilized).
* A discussion of the major challenges you faced. These can be both technical as well as challenges of working in a (large) team.
* Comment on your scrum process:
    * What are some of the challenges/benefits of the Scrum process from your teams' perspective?
    * What was your final velocity? Did it change over time?
    * What changes did you make to your development process based on your Sprint Retrospectives?
* With the benefit of hindsight, what, if anything, would you have done differently? What lessons did you learn? Again these can be technical (e.g. we would have designed our application differently) or process-focused.
* Future work: What is left to be completed to get to "version 1.0" of your project? What will happen to your application in the future?

We do not expect that everyone will be present or that everyone will actually be a presenter. However everyone is expected to contribute to creating and refining the presentation. If you are not present make sure that you are equivalently contributing to your team in other ways.

We expect your presentation will have three "main" sections:
1. An introduction, likely using slides, which briefly describes the problem you are solving and provides any background the audience needs to understand your application. For example: Who are your users? What constraints were imposed on your design (by your customer, the College, etc.)?
1. The demonstration. Your demonstration should be organized and polished. Make a plan for how you will show all the features you have implemented, and what you will say about each. If there is a natural "story" to how users will interact with your application, i.e. first they do 'X' then 'Y', try to organize your demo around those stories. Some features, e.g. backend features may not be amenable to demonstration, and instead may be best described with slides.
1. A description of the process, also likely using slides. Address the questions the above. One of the goals for this portion of the presentation is learn from our classmates experience. I suspect that there will be some common themes, but also unique challenges and solutions that we can all learn from. 

#### Final Team Write-up

As a team, submit a three-page (max) write-up to Gradescope summarizing your project. The report must discuss the following:

* What was the original project plan/goal? How much of that plan did you accomplish?
* What were some of the challenges in implementing the project?
* What were some of the challenges/benefits of the Scrum process from your teams' perspective?
* What changes did you make to your development process based on your Sprint Retrospectives?
* What was your team's "velocity" by the end? Specifically, how much work could your team accomplish during a sprint (state this in whatever terms you were using to score User Story difficulty). Was this consistent over the sprints?

In addition to the above, we should be able to see in GitHub the User Stories/work items and estimated difficulty that you assigned to each Sprint Goal (i.e. what you planned to do for that sprint) and which items were completed by the end of the Sprint (i.e. what you accomplished during the sprint). In an Appendix (which does not count towards your page limit), describe how to find the above information in your tracker (i.e. how Sprint goals are tagged, how "done" is indicated, etc.). If the above information is not available in your tracker, please include it in a table in the Appendix.

We expect that there will be substantial overlap between the final presentation and write-up. That is intended. Think of the write-up as the "take home" accompaniment to your presentation.

Only one group member needs to submit your write-up to Gradescope. When they do so, the submitter should add their group members as shown [here](https://www.gradescope.com/help#help-center-item-student-group-members).

#### Final Individual Write-up

As an individual, submit a 1.5-page (max) summary to Gradescope of your overall contributions to and experiences working on the project. Your report must discuss the following:

* What were your overall contributions to the project? Certainly use your backlog tracker, GitHub, etc. for reference, but this should be a high-level summary.
* Describe your role(s) in the team.
* What were some of the challenges you encountered while working on the project?
* What were some aspects of project to which you think you were a particularly valuable contributor? These could be technical and/or team/process-focused.

## Project Evaluation

Your score for the final project will be determined in part by the overall success of your project, but will mostly be determined by your participation and contributions to the project in both coding and non-coding activities.

Project Grading Rubric:

| Element | |
| ------- | --- |
| Project Setup and Sprint 0 | 11% |
| Three project sprints | 54% |
| Final checkpoint | 3% |
| Final technical presentation | 12% |
| Individual final write-up | 10% |
| Team final write-up | 10% |


### Each Project Sprint

Each project sprint will be evaluated on these metrics:

- User stories: I will be looking for SMART user stories. They should cover the work done over the sprint and include attached CRC cards/ design sketches where appropriate.
- Agility/scrum: This will be shown through a consistent pattern of commits, use of scores to keep track of velocity, and good use of the backlog.
- Integration: This is the use of feature branches and pull requests to push the project forward. I should not see failing tests or self-merges of pull requests. Instead, I should see evidence of multiple pairs of eyes on the pull requests before merges into the master.
- Implementation: The code you produce should be maintainable and supported with tests. 
- Functionality: The project actually does what was promised by the end of the sprint.

For each metric, I will score the project with one of the following marks:

| Metric | Long form |
| ------ | --------- |
| NA | Missing or not applicable |
| BE | Below Expectation |
| ME | Meets Expectation |
| EE | Exceeds Expectation | 

These metrics will be considered for the project as well as for individuals. To facilitate tracking contributions when Pair Programming, use GitHub's [co-authoring feature](https://help.github.com/articles/creating-a-commit-with-multiple-authors/). Add the following line to the end of your commit message (after a blank line):

    ```
    Co-authored-by: name <name@example.com>
    ```

    The key information is the e-mail address, which must be the e-mail address associated with the person's GitHub account. Each commit can have multiple co-authors.




## Project FAQ

#### Are there any technologies we can't use?

You are welcome (and encouraged) to use any of the technologies we have worked with in class (and libraries for those technologies, e.g. various React libraries). Outside of those technologies, please check in with the instructor(s). An example in the latter category would be the Firebase "backend-as-a-service". Firebase would not be a permitted technology for your project. Not because Firebase is bad in some way, but because one of the pedagogical goals for this course is implementing both the client *and* the server, and Firebase would obviate the latter.
