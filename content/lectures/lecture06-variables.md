---
title: "Variables"
name: "Variables"
date: "2024-09-23"
published: true
---

# Variables

## Goals for the day

- Learn what a **variable** is and how to use it in a script
- Be able to create script and sprite level variables and be able to describe the difference
- Be able to use for loops

## Introducing the variable

I have been listing off the few simple things that I computer can do

- Basic math
- Change which operation to perform next
- Remember things

We have covered the first two, time for the third…

Specifically, we are going to talk about how computers remember things inside of programs (_they can also remember things for longer -- we'll talk about that at another time_)

We have a name for these: **variables**

A variable can remember one thing. It can be a complex thing, as we will see later, but it can only hang on to one thing at a time

One way to think about variables is that they allow us to associate a name with a value so we can refer to it again later. We can change what the name refers to, but the name can only refer to a single thing at a time. Remember that computers can't handle ambiguity

## Parameters as variables

In a minor way, we have already used variables. When you made your own blocks, the input to the block became a variable you could use with the blocks inside

Remember our `double` block

![double block](../images/lectures/lecture06/variables_block-parameter.png)

The value you enter in becomes bound to the name inside of the block

## Making new variables

Let's make a new version of Catch Alonzo

This time we will _count_ how many times Alonzo is clicked

We will also separate out the movement from the clicking. Here is a simple script that makes Alonzo jump around.

![Script to make Alonzo jump around](../images/lectures/lecture06/variables_alonzo01.png)

Now, we will create a second script that increments a counter when Alonzo is clicked. We need a variable to hold the number of times that Alonzo has been clicked. In the Variables palette, we click 'Make a variable' and make a sprite level variable, which we will call `score`.

Once we do that, we can increment the score every time Alonzo is clicked

![Script to increase score on clicks](../images/lectures/lecture06/variables_alonzo02.png)

Now, let's change that forever to a loop that will stop when we hit the score we want

![Update to stop jumping after score hits 5](../images/lectures/lecture06/variables_alonzo03.png)

Finally, let's reset the score at the start of the script so we can play more than once

![Update to reset the score](../images/lectures/lecture06/variables_alonzo04.png)

In class, we discussed if the reset should go at the top or the bottom. While both work, resetting at the top makes more sense.

- The score stays 5 when we are done so we can feel our victory
- We aren't reliant the score being zero when we start

I described this as **defensive programming** -- programming as if someone was trying to break our code and removing as many assumptions about the state of the world when we begin as we can.

## Counting loops

<!-- Start this with the spinning spiral offscreen, triggered by the green flag. We should also have a clear block ready. -->

<!-- For each build, make a new copy. -->

Another way to get a built in variable is with the for I = _ to _ block

![A for loop to draw a shape](../images/lectures/lecture06/variables_for-loop01.png)

Can you predict what is going to be drawn? To show you the value is changing, we can use the say and step through it

What happens when I add a block to go back to the origin to the beginning

![Update to add starting at the origin](../images/lectures/lecture06/variables_for-loop02.png)

It isn't much different until we run it a second time. Why did we get something different on the second run?

What will happen if I do this a bunch of times?

![Update to add an outer loop](../images/lectures/lecture06/variables_for-loop03.png)

## Script variables

At the moment, our script will only draw at the center of the Stage. How could we make it draw where ever the sprite starts?

We need to save where the sprite starts so we can go back to it. Where can we save that? More variables!

![Update with variables so we can start anywhere](../images/lectures/lecture06/variables_for-loop04.png)

Since these values are only relevant to the script we are writing, we can create **_script variables_**. These are variables that are only visible inside of the script they are created in

This is a concept called **_scope_**

Why would we want to do this?

- As we increase the complexity of our code, we have to worry about variables having the same name
- It is messy to have variables that are not meaningful to the current problem cluttering up the place
