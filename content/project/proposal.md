---
title: "CS 312 - Project Proposal Guidelines"
path: "/project/proposal"
name: "Proposal"
published: true
---


*Proposal stage is complete. Here are the [submitted proposals](proposals_2019.pdf).*

## The Project

We will spend the second half of the semester working on large-scale web applications in teams of 6-7 students (4 projects total). The primary requirements for the project are technical (see the list below). There a relatively few constraints on the goal/content/purpose of the application. Think broadly!

Project technical requirements:

* Your project should have non-trivial front-end and back-end functionality.
* The project should use React for its front end.
* The back end will be a Node.js-based server.
* Your application must store some data in a database.
* The front end should follow the SPA approach we have been learning about in class (although your application need not be truly "single" page, you can link several SPA-ish pages together).

The scope is always hard to estimate. However, with 6-7 students over 6 weeks,
your team's total capacity should be over 300 person-hours. Scope your
project with that capacity in mind. You can build a substantial application in
300+ hours! 

## The Proposal

At this stage, I am looking for a collection of proposals. Consider this
optional assignment a Request-for-Proposals (RFP). You are encouraged, but not
required, to submit a proposal. I will vet the proposals for suitability and
scope before sending them out to the class.

If you wish to propose a project, please prepare short written proposal,
approximately one page in length (no less than 3/4 page and no more than 2
pages). You proposal should contain the following information. *For
consideration, submit your proposal via e-mail
(due 5p on 2019-10-08).*

1. The title of the project
1. The names of the proposer(s) (can be multiple people)
1. The target users or other stakeholders
1. The main functionality of the application. Specifically, you should describe the major "epics", i.e. the big coarse-grained user stories.

   This component should make up the bulk of your proposal.

1. The role the back end will play in supporting the application
1. What, if any, external resources, such as APIs, do you plan to incorporate

    Incorporating an external API is not discouraged, as long as it is
    "self-serve". For example, you can automatically obtain a Google Maps API
    key and the API has a free quota that is more than sufficient for a class
    project. In contrast, any API that requires "manual" approval by the
    provider will likely be a problem. You only have 6 weeks to complete the
    project, and so waiting 3 weeks for API approval is not practical.


### FAQ

#### Is the project "bound" by the proposal? 

The proposal is not a contract. We expect the projects to evolve (often
substantially). That said, your proposal needs to be specific enough (and
"thought through" enough) that you and we can estimate the scope (and your
classmates have a good idea of that they would be signing up to do). A great
proposal will provide a clear starting point for your first development
iteration ("sprint").

#### What kinds of projects are not a good fit?

<!-- 
Adapted from http://cs169.saas-class.org/faq/external-customer
 -->

* A mostly "static" website, or a site that could be managed with an off-the-shelf Content Management System (CMS), e.g. WordPress or Drupal.
* Native mobile applications.
* Applications that rely on commercial frameworks or APIs, e.g. Salesforce.
* Applications that handle sensitive data (e.g. health data protected by HIPAA or FERPA-protected student data).
* Applications you plan on turning into a company in the future. The ownership of the code (and or IP) could be tricky.

#### What kind of projects have been successful in the past?

There is no one phenotype for a successful project, your teamwork and development process is more important to the success of your project than the topic. React is most useful in highly interactive applications (think Google Maps or Mail) and so projects with more interactive UIs will take better advantage of its capabilities.