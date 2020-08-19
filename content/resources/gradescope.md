---
title: "Working with Gradescope"
name: "Gradescope"
date: "2020-08-19"
published: true
---

Alongside GitHub classroom, we will be using the online platform [Gradescope](https://gradescope.com) for grading your programming assignments and practical exercises. Gradescope helps us to provide fast and accurate feedback on your work. Programming assignments and practical exercises will be submitted through Gradescope alongside GitHub classroom, and assignment and exam grades will be returned through Gradescope. As soon as grades are posted, you will be notified immediately so that you can log in and see your feedback. You may also submit regrade requests if you feel we have made a mistake. Your Gradescope login is your Middlebury email, and your password can be changed [here](https://gradescope.com/reset_password). The same link can be used if you need to set your password for the first time.

_Gradescope e-mails have historically been routed to junk mail folders. We recommend "whitelisting" gradescope.com. And if you don't receive an expected e-mail check your junk mail folder._

The workflow is detailed below, but in short, after pushing your submission to GitHub classroom, you will submit your repository to Gradescope. Gradescope will run a set of automated tests on your code, some of which you will be able to see and some that are hidden until after the due date. Your assignments are graded based on those tests (each of which has an associated point value), so make sure to follow the specification exactly. After the due date, the instructors will grade any "manual" portions of the assignment, adjust automated scores if needed, and provide feedback on your code (via line-level comments in Gradescope).

#### Submitting to Gradescope

1. After logging into Gradescope, you will see a set of courses and after selecting CSCI312, a list of open assignments. Select the assignment you are submitting (there may be multiple open assignments at any given time so make sure to choose the correct assignment).
1. You should see a submission window like shown below. Follow the steps in red, that is select GitHub submission, the repository you wish to submit, and then the branch (almost always the "master" branch). _The first time you submit an assignment, Gradescope will ask for permission to access your GitHub repositories._ You will need to agree (but you don't need to request access to any organizations of which you may be a member, just your individual account).

<img src="../images/resources/gradescope_submission.png" width="400" />

1. After you submit, it will take a few seconds to a few minutes for the tests to complete (depending on the complexity of the assignment). When the tests complete you should see a screen like shown below. Hopefully all of your tests are "green" (passing)! Note that you may not see a score until after the due date when the hidden test results become visible. If you do see errors ("red" tests) revisit that section of the assignment. Note that code that passes all of the _visible_ tests is not guaranteed to be fully correct (that is receive full credit), but failing tests definitely indicate a problem.

<img src="../images/resources/gradescope_result.png" width="500" />

#### Reviewing Your Graded Submission

When your graded submissions are published you will receive an e-mail. As you review your submission click through each section to see which rubric items were selected and any comments on/in your code.
