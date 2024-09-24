---
title: "CS 105 - Exercise Three"
date: "2024-09-16"
due: "2024-09-20T11:15"
name: "Exercise 03"
published: true
---

#### Goals

- Continue to develop your spatial sense
- Think a little more about repetition
- Be able to create custom blocks

## Prerequisite

There is no starter code for this exercise, so go ahead and visit <https://snap.berkeley.edu/snap/snap.html> and make sure you are logged in.

## Objective

For this exercise, you are going to draw some basic shapes. I will show you how to create your own blocks and then you will use them to draw me a picture.

### Draw a square

Using just ![pen down](../images/snap-blocks/pen-down.png#inline), ![move](../images/snap-blocks/move.png#inline), and ![turn right](../images/snap-blocks/turn-right.png#inline), draw a square that has sides of length 150. Don't worry about using hat blocks, we will just click on the script to run it.

Go ahead and do it before reading further.

Really, shoo -- go do it.

...

...

...

...

...

...

...

...

...

...

...

...

Okay, you probably wrote something that looked like this:

![A simple square](../images/exercises/exercise03/simple-square.png)

This is a totally reasonable way to draw a square. _However_, there is a lot of repetition in there.

![Annotated simple square](../images/exercises/exercise03/simple-square-annotated.png)

This isn't a problem, per se. It will draw a square without a problem. However, recall that one of the important aspects of being a computer scientist was _evaluating_ algorithms. In that vein, the repetition is less appealing.

There are two primary reasons for this.

1. What if we wanted to change the size of the square? We would have to change the length in four different places. That is a bit of pain, and it increases the probability that we will make a mistake somewhere.

2. It makes the script more difficult to read. To figure out what the script does, the reader would need to count the number of repetitions, and this form makes that more difficult to do (imagine if this was a [dodecagon](https://en.wikipedia.org/wiki/Dodecagon), or a [megagon](https://en.wikipedia.org/wiki/Megagon) for that matter!).

So, we would like to make this better.

### Revisiting repetition

Previously, we used the ![forever](../images/snap-blocks/forever.png#inline) block to repeat things. While that would work, the sprite wouldn't be able to do anything else, it would keep running around the edges of the square forever (or at least until the script ended).

If you look in the "Control" palette, you will find the ![repeat for count](../images/snap-blocks/repeat-count.png#inline) block. This allows you to control the number of repetitions.

Rebuild you square building script using this block.

#### Tips

- _You can click the ![clear](../images/snap-blocks/clear.png#inline) block if you want to clean off the stage._
- _The sprite is draggable. While you are playing, you can just drag it around on the stage to draw shapes in different places._

### Draw other shapes

Once you have made this change, it becomes very easy to draw the other regular polygons, all we have to change is the number of times the script repeats (the number of sides), and the angle of the turn.

For example, to draw a triangle, change the count to 3 and set the angle to 120.

Why 120? Aren't the inner angles of an equilateral triangle all 60? Yes they are, but the sprite's turn isn't the same as the inner angles of the shape.

![Diagram of making the turn to draw a triangle](../images/exercises/exercise03/outside-angle.png)

If you figure out what the inside angle is, subtract it from 180 (a straight line) to figure out which angle the sprite needs to turn.

Alternatively, you could realize that to complete the shape, the sprite needs to turn in a complete circle, or 360 degrees, so the angle is just 360 divided by the number of sides.

Try drawing a collection of different shapes.

I suggest making yourself a little reset script so you can reset the sprit and clear the screen if you have made a mess or lost the sprite offscreen somewhere.

![Reset script](../images/exercises/exercise03/reset.png)

Experiment a little. What happens if the angle isn't (360 / number of sides)?

Try multiples of the right angle (e.g. 5 sides and 72 degrees gives you a pentagon, what does 5 sides and 144 give you? ).

If you increase the number of sides you will find that you start to get something that is indistinguishable from a circle (you will need to shorten the length of the sides to keep the shape on screen). This is actually how we usually draw circles on a computer.

### Making your own blocks

If you were thinking about drawing something more complex, you might want to have a collection of squares and triangles and other shapes.

While the scripts for drawing these shapes is pretty small, we still don't want to copy it all over the place. Instead, we would like to be able to just have a block that draws a square. It should come as no surprise that Snap! lets us do exactly that.

At the bottom of every palette you will see a ![Make a block](../images/snap-icons/make-a-block.png#inline) button.

Since this is a drawing operation, we will make the block in the "Pen" palette. Go there and click the ![Make a block](../images/snap-icons/make-a-block.png#inline) button.

You should see this dialog box:

![Make a block dialog](../images/exercises/exercise03/make-a-block-dialog.png)

Give the block a name. As you can see, I called mine `draw square`. You can leave everything else alone right now (though note that if you didn't switch to the "Pen" palette before clicking the button, you can change which palette the block will belong to now).

Click "OK".

You will now see this dialog:

![Block editor dialog](../images/exercises/exercise03/block-editor.png)

You should also notice that a new ![draw square](../images/exercises/exercise03/draw-square-block.png#inline) block has appeared in the "Pen" palette.

This is where we will specify what the block can do. Notice that it has a custom hat block which essentially says "when someone uses this block, do the following".

You can drag blocks into the editor from either the scripting area or the palettes.

Drag code for drawing a square into the editor and attach it to the hat block.

If you click "Apply", the ![draw square](../images/exercises/exercise03/draw-square-block.png#inline) block will now contain the code in the editor. If you click "OK", the new code will be saved and the editor will close. _You can always return to the editor by right clicking on the block and selecting 'Edit' from the menu._

Try out your new block. The cool thing is that you can now make multiple squares by using the ![draw square](../images/exercises/exercise03/draw-square-block.png#inline) block multiple times.

### Add an input to the block

In many of the blocks we have used so far, there was some way for the user to change the behavior by changing the input to the block (e.g., setting how many steps for the sprite moves, or how many degrees to turn).

It would be handy if our ![draw square](../images/exercises/exercise03/draw-square-block.png#inline) block allowed the user to determine the size.

Open the editor for the ![draw square](../images/exercises/exercise03/draw-square-block.png#inline) block (right click on it and select "Edit" from the menu).

We are going to change the name of the block so that it looks like this: ![draw square with input](../images/exercises/exercise03/draw-square-block-2.png#inline)

Click on the little "+" after the word square in the hat block.

![Click the arrow in the name](../images/exercises/exercise03/block-editor-2.png)

This allows us to add a word to the name of the block. You will see a new dialog box.

![Input name dialog](../images/exercises/exercise03/input-name-dialog.png)

Type in "length" and select "Title text", then click "OK".

Click the last "+" again.

Type in length again, but this time select "Input name" before clicking "OK".

The block editor should now look like this:

![draw square definition](../images/exercises/exercise03/draw-square-definition-1.png)

The orange lozenge with "length" in it is a stand in for whatever value the user will provide.

To use the user's value, you can drag the orange lozenge to wherever you want to use the value:

![draw square definition](../images/exercises/exercise03/draw-square-definition-2.png)

Click "OK".

You should now have a ![draw square with input](../images/exercises/exercise03/draw-square-block-2.png#inline) block that allows the user to set the size.

### Play

Create at least two other blocks that draw different shapes.

Write a script using the ![green flag hat](../images/snap-blocks/flag-hat.png#inline) so that when a user clicks the ![green flag](../images/snap-icons/green-flag-button.png#inline) the sprite will draw a picture. The picture can be representational (e.g., a house) or abstract (provided there is evidence of some aesthetic intention, not just a random collection of shapes).

#### What I will be looking for

- Three new blocks (counting the square with the configurable length)
- A script that draws a picture when the user clicks the ![green flag](../images/snap-icons/green-flag-button.png#inline)
- The picture should use all of the custom blocks
- At least one custom block should be used more than once
- If the code is run a second time, it shouldn't mess up the picture (i.e., the main script should clear the screen and reset the position of the sprite)

## Submitting

Save the exercise using the instructions in the [Submission Guidelines](../resources/submissions).

Visit the [exercise page](https://middlebury.instructure.com/courses/15553/assignments/289624#) on Canvas to submit your work.
