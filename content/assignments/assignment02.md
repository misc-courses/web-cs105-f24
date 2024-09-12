---
title: "CS 105 - Assignment Two"
date: "2022-02-25"
due: "2022-03-07T23:59:00"
name: "Assignment 02"
published: false
---

#### Goals

- Demonstrate your ability to create custom blocks
- Demonstrate your familiarity with spatial programming
- Demonstrate your knowledge of the use of reporters and predicates
- Demonstrate your knowledge of variables

## Tasks

Start a new [editor session](https://snap.berkeley.edu/snap/snap.html#). Save the project as `Assignment02`. Please do all of your work in this project.

### Draw polygons (take two)

Our generalized polygons are only somewhat useful. The problem is that trying to control the size of the shape purely by controlling the length of the sides is quite challenging for anything beyond a square.

A better approach is to think of the _radius_ of the shape -- the distance from the center out to the points of the shape. To figure out where the points of the shape are, we need to reach back to your Geometry or Trigonometry class. The points of the shape are essentially points on a circle of radius R.

![Trig diagram](../images/assignments/assignment02/trig.png)

Write a new block that looks like ![draw polygon block](../images/assignments/assignment02/draw-polygon.png#inline).

To get the sine and cosine functions, you need to use the ![of block](../images/snap-blocks/of-operator.png#inline) reporter block from the Operators pallet. Notice that this says that it reports the `sqrt` of the input. However, if you click on the function name, a menu will drop down and you can chose `cos` or `sin`.

#### Expectations

- You should create a block that looks exactly like this: ![draw polygon block](../images/assignments/assignment02/draw-polygon.png#inline)
- When run, the block should draw a polygon with the specified sides and radius
- The polygon should be _centered_ on the current location of the sprite
- The sprite should return to the center of the shape at the end of the drawing
- The block should run clean -- it should handle pen up and pen down so that the drawing draws, but the pen is raised at the end.

### Drawing with Shapes

For the second part of this assignment, I would like you to write a script that allows the user to draw shapes when they click on the stage.

If you look at the options on the ![go to block](../images/snap-blocks/go-to-random.png#inline) block, you will see one of the options is to go to `mouse-pointer`. If you put this in a ![forever block](../images/snap-blocks/forever.png#inline) block, the turtle will follow your cursor.

Create a new predicate ![mouse on stage predicate](../images/assignments/assignment02/mouse-on-stage.png#inline) that reports `True` only when the cursor is on the Stage. Use this to only track the cursor with the sprite when the cursor is on Stage.

If you look in the Sensing pallette, you will find a predicate that will tell you if the mouse button is down. If the mouse is down, draw a shape of your choosing using the ![draw polygon block](../images/assignments/assignment02/draw-polygon.png#inline) block.

_You will want to turn off the ability to manually drag the sprite around. At the top, under the name of the current sprite, you will see a checkbox called `draggable`. Deselect it._

#### Expectations

- When the ![green flag](../images/snap-icons/green-flag-button.png#inline) is clicked, the sprite will follow the cursor around the stage
- There is a ![mouse on stage predicate](../images/assignments/assignment02/mouse-on-stage.png#inline) that is used to limit the sprite to just the Stage.
- When the user clicks the mouse, a shape will be drawn, using the ![draw polygon block](../images/assignments/assignment02/draw-polygon.png#inline).

## Reflection

I would like you to write a short reflection about your process of completing each part of the assignment. The reflections should be embedded in your project as comments. To make a comment, right click in the script area of the Snap! editor. A context menu should pop up and give you the option to 'add comment'. Create a separate comment for each piece of the assignment.

Each reflection should contain the following things:

- If the block or script currently doesn't work, a description of what is not working and what you have tried to do to fix it
- If the block or script is working, a description of what was the hardest part to accomplish
- A description of what help you received to accomplish each piece
- A description of what you learned
- Your assessment of your ability to repeat this work later completely independently

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [assignment page](https://middlebury.instructure.com/courses/10245/assignments/166914) on Canvas to submit the URL.

---

# Challenges

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

### Refine the drawing program

- If the mouse isn't down and the user types the 'c' key, clear the stage.
- When the user clicks, check if one of the number keys is down. If any key between 3 and 9 is down, use that to set the number of sides of the drawn shape, otherwise, draw a triangle.
- In the original version, dragging the cursor while the button is down will draw a line of shapes. Add a variable so you only draw one shape per click (i.e., the user needs to release the mouse button before another shape will be drawn).

Save this challenge with a separate name and submit it [here](https://middlebury.instructure.com/courses/10245/assignments/166915).
