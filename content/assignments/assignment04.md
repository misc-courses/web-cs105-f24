---
title: "CS 105 - Assignment Four"
date: "2024-10-09"
due: "2024-10-16T11:15:00"
name: "Assignment 04"
published: true
---

#### Goals

- Demonstrate your ability to manipulate text in Snap!
- Get practice with abstraction, loops and conditionals

## Challenge

Tsthay eekway eway areyay oinggay otay eachtay ethay omputercay Igpay Atinlay!

This week we are going to teach the computer Pig Latin!

Some of you will be familiar with Pig Latin, but I suspect most of you will at the very least need a refresher on the rules:

If the word starts with a vowel,

- append **yay** to the end

Examples:

- "ice" becomes "iceyay"
- "eye" becomes "eyeyay"

Otherwise,

- move all of the leading constants to the end of the word
- append **ay** to the new word

Examples:

- "doctor" becomes "octorday"
- "who" becomes "owhay"

This problem is a little easier if we break it down a little, so I've broken this into four parts.

Also, I think you will find it helpful to have the extra blocks that understand words and sentences, so Import the `Words, sentences` library. (Click the ![file button](../images/snap-icons/file-button.png#inline), pick `Libraries...`, select `Words, sentences`, and then click the 'Import' button).

## Part 1: Make a vowel checker

Create a predicate block ![is vowel predicate](../images/assignments/assignment04/is-vowel.png#inline) that takes in a single letter and reports `true` if the letter is a vowel and `false` if it does not. (we will restrict ourselves to 'a', 'e', 'i', 'o', and 'u' and ignore special cases like "sometimes 'y'").

Don't forget about capital letters.

You can assume the user will enter a single letter.

#### Expectations

- There should be a block that looks like ![is vowel predicate](../images/assignments/assignment04/is-vowel.png#inline)
- It should report `true` if the provided letter is a vowel and `false` otherwise
- The block should handle capital letters

## Part 2: Change a single word

Create a reporter block ![word to pig latin reporter](../images/assignments/assignment04/word-to-pig.png#inline).

This block should take in a single word (again, don't worry if it is misused) and report back the Pig Latin equivalent.

_Tip: The word could start with an arbitrary number fo consonants. I recommend the use of a variable and a loop so you can strip the consonants off and glue them on the end one at a time until you hit a vowel._

#### Expectations

- There should be a block that looks like ![word to pig latin reporter](../images/assignments/assignment04/word-to-pig.png#inline)
- The block should report back a Pig Latin version of a word that is entered

## Part 3: Convert a whole sentence

Create a reporter block ![sentence to pig latin reporter](../images/assignments/assignment04/sentence-to-pig.png#inline) that converts a sentence into a Pig Latin sentence.

\_Tip: I suggest looking at the blocks from the `Sentences, words` library to see if there is something that could be useful and allow you to make use of your new ![word to pig latin reporter](../images/assignments/assignment04/word-to-pig.png#inline) block.

#### Expectations

- There should be a block that looks like ![sentence to pig latin reporter](../images/assignments/assignment04/sentence-to-pig.png#inline)
- The block should report back a Pig Latin version of a sentence that is entered

## Part 4: User interaction

For the final piece I would like you to use your new ![sentence to pig latin reporter](../images/assignments/assignment04/sentence-to-pig.png#inline) block to convert arbitrary sentences to Pig Latin.

Write a script that starts when the ![green flag button](../images/snap-icons/green-flag-button.png#inline) is clicked. A message should appear asking the user for a sentence. The user enters the sentence, and the Sprite `Say`s the message in Pig Latin.

#### Expectations

- There should be a script that starts when the ![green flag button](../images/snap-icons/green-flag-button.png#inline) is clicked.
- The script should ask for a sentence from the user
- The Sprite should `Say` the converted Pig Latin message

## Reflection

I would like you to write a short reflection about your process of completing the assignment. The reflection should be embedded in your project as a comment. To make a comment, right click in the script area of the Snap! editor. A context menu should pop up and give you the option to 'add comment'. Create a separate comment for each piece of the assignment.

Each reflection should contain the following things:

- If the block or script currently doesn't work, a description of what is not working and what you have tried to do to fix it
- If the block or script is working, a description of what was the hardest part to accomplish
- A description of what help you received to accomplish each piece
- A description of what you learned
- Your assessment of your ability to repeat this work later completely independently

## Submitting

You will submit your work through Canvas on the [assignment page](https://middlebury.instructure.com/courses/15553/assignments/289614).

Please see the [submission guidelines](../resources/submissions) for details on how to submit your work.

---

# Challenges

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

## Challenge

A naïve implementation will not handle capital letters correctly. For example, 'Lovelace' would become 'ovelaceLay'.

You challenge is to fix this. Identify when the first letter is a capital, convert it to lowercase, and then uppercase the new first letter.

Save this challenge with a separate name and submit it [here](https://middlebury.instructure.com/courses/15553/assignments/289615).
