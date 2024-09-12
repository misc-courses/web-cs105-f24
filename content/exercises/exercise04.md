---
title: "CS 105 - Exercise Four"
date: "2022-02-23"
due: "2022-02-28T23:59"
name: "Exercise 04"
published: false
---

#### Goals

- Learn to use conditionals to change execution
- Use reporters to compute new values
- Get more practice making blocks

## Prerequisite

There is no starter code for this exercise, so go ahead and visit <https://snap.berkeley.edu/snap/snap.html> and make sure you are logged in.

## Objective

Our goal is to make some (simplistic) generative art. The results will largely just be a random collection of colored lines, but hopefully you will find it somewhat aesthetically interesting (my son thought it looked pretty cool, but he was nine when I declared this, so take that as you will).

## Composing a predicate

The first thing that we are going to do is to build a predicate that will tell us if the sprite is on the stage or not. We will build up to this in steps.

### Test the right edge of the stage

The first thing we will do is to build up a simple test to see if the sprite is to the left or the right of the right edge of the stage. We need two pieces of information: the x position of the sprite and the x position of the right edge of the stage.

We already have a block that tells us the x position of the sprite: ![x position block](../images/snap-blocks/x-position.png#inline).

To get the position of the right of the stage, we need to work a little harder. There is a block I have been calling the "X of Y" block. You will find it in the Sensing palette. You will see that it initially looks like it has something to do with costumes: ![x of y block](../images/snap-blocks/x-of-y.png#inline). It allows us to check any property of the sprites or the stage. In the right hand input, select 'Stage'. Then, on the left input, select 'right' (you must do it in that order or the 'right' option won't be there).

Now, we want to check if the x position of the sprite is less than the right side of the stage. In the Operators palette, you will find the less than block: ![less than block](../images/snap-blocks/less-than.png#inline). Note that it is a _predicate_ block because it will report a value that is True or False. Use it to express this relationship.

We can check the value of the block by clicking on it. Click on it now, and it should say True. Drag the sprite until the tip is just off stage. Click on the block again, and it should say False.

### Write expressions for the other three sides

Once you have the right side test working, build expressions for the other three sides. Keep them separate until you have tested each one.

Testing the other three sides is a little harder, because you can't drag just the tip of the sprite off screen in the other three directions -- at least not when it is facing the right. So, just use the ![point in direction](../images/snap-blocks/point-in-direction.png#inline) with 0, 270 and 180 to spin the turtle so you can test the other walls using the drag test.

### Write compound statements

What we really want is an expression that tells us the sprite is on the stage. We know the sprite is on the stage if it's x position is less than the right edge AND it is greater than the left edge AND the y position is less than the top edge AND it is greater than the bottom edge.

I capitalized the ANDs to highlight the logical operator we want to use to combine these expressions together. You will find the AND block (![AND](../images/snap-blocks/and.png#inline))in the Operators palette.

To combine the four expressions together, you will need three ![AND](../images/snap-blocks/and.png#inline) blocks.

Test with your sprite again to make sure it works.

### Make a new block

The new expression should work, but would be unwieldy to use in your code and it would be difficult for others to quickly tell what they were looking at. Abstraction to the rescue!

Create a new block in the Sensing palette. Make sure it is a predicate and call it "on stage?". The question mark isn't required, but it provides further hints to the reader that this is a Boolean predicate.

When the editor comes up, notice that has the ![report block](../images/snap-blocks/report.png#inline) already in place for you (if it doesn't, you didn't chose "predicate" in the last step, click "Cancel" and try again).

![on stage? editor](../images/exercises/exercise04/on-stage-dialog.png)

Drag your Boolean expression into the input of the ![report block](../images/snap-blocks/report.png#inline)

Click "OK" and then test your new predicate block.

## Get the Sprite to run around the screen

Our next goal is to use your new predicate to make the sprite run around the stage without leaving the view.

_Note that there is a block "if on edge, bounce" that does a version of the behavior already, but we are going to ignore it for the time being_

### Bounce off the right hand wall

Make sure that the sprite is facing 90 degrees (straight right) first.

We are going to use the "repeat until" ![repeat until  block](../images/snap-blocks/repeat-until.png#inline), which repeats the enclosed commands until the input predicate is true.

Put a ![move block](../images/snap-blocks/move.png#inline) inside of the loop. You can leave the steps at 10.

We want the sprite to stop moving forward if it leaves the screen, so we can't use our new ![move block](../images/exercises/exercise04/on-stage.png#inline) block directly since that is True while the sprite is on stage and False when it isn't, which is the opposite behavior from the one we want.

Find the NOT block (![not block](../images/snap-blocks/not.png#inline)) in the Operators palette to invert the value of your custom predicate.

If you run this script, the sprite should drive forward until the tip leaves the stage, at which point it will stop.

But we want bouncing! (well, at least I do, I can't speak for you...)

Add a ![move block](../images/snap-blocks/move.png#inline) after the loop that moves the sprite backwards by the amount it was moving forward (i.e., by -10 if you kept the default 10). This backs the sprite back up so it is back on stage.

Duplicate your script (right click on it and select "duplicate") and attach the second copy under the first. Make all of the positive values negative and all of the negative values positive. It should look like this:

![Back and forth script](../images/exercises/exercise04/back-and-forth.png)

If you click on the script, the sprite should run forward until it hits the right hand wall, and then run backwards until it hits the left hand wall. If you put a forever block around it, it will bounce back and forth between the two walls.

### Getting a bit random

Okay, so I would classify that as momentarily satisfying. Let's make it better. Rather than just having the sprite backup until it hits the other wall, let's have it turn in some randomly chosen other direction and head off that way.

Get rid of second ![repeat until  block](../images/snap-blocks/repeat-until.png#inline) and the final ![move block](../images/exercises/exercise04/on-stage.png#inline). You should now have something that looks like this:

![single bump script](../images/exercises/exercise04/bump.png)

If you run this one, the sprite will run up to the wall and then repeatedly smash itself into it. To keep that from happening, add a ![turn right block](../images/snap-blocks/turn-right.png#inline). If you leave the default 15 degrees in place, the sprite should run to the wall and then trace around the periphery of the stage. Why is that? _Spend a moment thinking about it and make sure you understand what is going on before you move on. If you can't figure it out, ask!_

This is more interesting than the back and forth, but I promised randomness. If you look in the Operators palette, you will find the ![pick random number block](../images/snap-blocks/pick-random.png#inline). This reporter will pick a random number between any two that you input. Every time it is activated, it will give you a new random number.

Use the random number block for the angle of the turn. To get the full range of possible angles, we want the range to be from 0 to 360. However, 0 and 360 are both the same, and neither turns the sprite at all. So make your range between 1 and 359.

Now when you run the script, the sprite should bounce all over the place like a superball in an empty carpark.

<hidden-block message="Learn more about random">
In every language that I have ever used, there is some way to generate random numbers. Randomness and computation may seem like strange bedfellows... because they are. The idea of adding a random element to algorithms seems at odds with our view of computers being the epitome of precision and logic.

However, randomness comes up all of the time. In computational art and games, randomness is used to simulate elements of human unpredictability or nature's extreme complexity. It is also used for approximating solutions to problems that are too difficult to compute (yes, those exist!).

Of course, the truly bizarre thing is that random number generators are not actually random. They are merely very complex mathematical sequences that seem random. The sequences are very long and we have techniques to make sure we don't start in the same place too often, but if we _do_ start in the same place, we will get exactly the same sequence of numbers...

</hidden-block>

## Art time!

Put the pen down. The sprite will now draw a chaotic path back and forth across the stage. This is a little scribbly looking, but I think we are starting to get something interesting.

### Formalize our script

It is time to clean up a bit so we are ready for the next bit.

Add a ![flag hat block](../images/snap-blocks/flag-hat.png#inline) to the start of the script. Before the sprite starts zooming around, clear the stage and put the pen down.

### Adding color

To make this more interesting, we are going to add some color. You can experiment with this a little bit before moving on. Go to the Pen palette and find the ![set pen color block](../images/snap-blocks/set-pen-color.png#inline). Click on the color swatch to pick a color and then click the block to change the pen's color. As the sprite zips around, it is gradually filling in the stage, and changing the color makes some interesting patterns.

We want to add this to our script however.

Before the blocks that move the sprite, set the color to something other than black or gray. Then, inside of the repeat until block, use ![change pen block](../images/snap-blocks/change-pen.png#inline) to change the hue of the pen by 1. The pen should now start cycling through the colors of the rainbow as the sprite moves. To make it look better, set the pen size to be a larger number, like 8 (add this to your script as well).

<hidden-block message="Learn more about hue">
There are a number of different ways to talk about color numerically. One approach is to describe the color in terms of Hue, Saturation, and Brightness. The hue describes the actual color we perceive, the saturation controls the richness of the color, and the brightness controls, well, the brightness.

You can think about the hue as being on a wheel, similar to direction. In Snap!, hue is a value between 0 and 100. However, if you keep adding, the colors just loop around (the same way that 361 degrees is the same as 1 degree).

If you look at the color picker than comes up when you click the color swatch on the ![set pen color block](../images/snap-blocks/set-pen-color.png#inline), this is actually showing you the relationship between hue and brightness. Hue is on the x axis and brightness is on the y axis (the colors are shown fully saturated).

</hidden-block>

#### What I will be looking for

- There should be a new ![on stage block](../images/exercises/exercise04/on-stage.png#inline) predicate that correctly indicates when the sprite is on or off stage
- When the user clicks the ![green flag](../images/snap-icons/green-flag-button.png#inline), the stage should clear, and the sprite should start drawing colored lines and bouncing randomly around the stage
- The sprite should run until it hits a wall and then turn some random angle and set out in the new direction
- The color should change as the sprite moves

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/166218) on Canvas to submit the URL.

# Challenge

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

Limit the range of hues. The result tends to be more aesthetic if you keep the range of hue down to around 20. This is a good practice for using conditionals.

Once this is working , **share** the project and submit it on [Canvas](https://middlebury.instructure.com/courses/10245/assignments/166219).
