---
title: "CS 105 - Assignment One"
date: "2024-09-16"
due: "2024-09-23T11:15:00"
name: "Assignment 01"
published: true
---

#### Goals

- Demonstrate your ability to create custom blocks
- Demonstrate you ability to think spatially

## Tasks

Start a new [editor session](https://snap.berkeley.edu/snap/snap.html#). Save the project as `Assignment01`. Please do all of your work in this project.

### Draw polygons

In [Exercise 3](../exercises/exercise03), you created some basic blocks to draw general a square and two other shapes. Now, I would like you to generalize that to write a block that can draw arbitrary n-sided polygons.

#### Expectations

- You should create a block that looks exactly like this: ![draw polygon block](../images/assignments/assignment01/draw-polygon.png#inline)
- When run, the block should draw a polygon with the specified sides and side length
- The block should run clean -- it should handle pen up and pen down so that the drawing draws, but the pen is raised at the end.

### Draw a brick wall

I would like you to make a ![draw brick wall](../images/assignments/assignment01/brick-block.png#inline) block. When called with the value 10, it should produce a wall that looks like this:

![brick wall](../images/assignments/assignment01/bricks.png)

To help you manage the complexity, I would like you to create three other custom blocks: ![draw brick](../images/assignments/assignment01/draw-brick.png#inline), ![row A block](../images/assignments/assignment01/rowA.png#inline), and ![row B block](../images/assignments/assignment01/rowB.png#inline).

The ![row A block](../images/assignments/assignment01/rowA.png#inline) block should draw a line of 6 full bricks.

The ![row B block](../images/assignments/assignment01/rowB.png#inline) block should a line with 5 full bricks and two partial bricks on each end (careful -- they are not quite half size).

The ![draw brick](../images/assignments/assignment01/draw-brick.png#inline) block should draw a single brick. In my picture, the bricks are 30 long and 10 wide (or high), and the "cement" is 4 wide. The ![draw brick](../images/assignments/assignment01/draw-brick.png#inline) block should manage the pen color and raising and lowering of the pen.

**Drawing filled rectangles** We have already developed a technique for drawing rectangles. However, you should not use that here, as there is a simpler way when you want a filled rectangle. Simply set the pen size to the rectangle height you want and move forward by the length. If you try this, however, you will end up with something a bit lozenge shaped, because the pen adds round caps on both ends (which makes corners look better -- something we are not interested in here). We can turn that off.

Internally, the pen has a property called "flat ends" which is False by default. Use the ![set flat ends block](../images/snap-blocks/set-flat-ends.png#inline) in your brick block to switch on flat line ends. Turn it back off after the brick is drawn.

#### Expectations

- You must create the four blocks
- The ![draw brick](../images/assignments/assignment01/draw-brick.png#inline) block should draw a brick of the appropriate color and size (color is your choice)
- The ![draw brick](../images/assignments/assignment01/draw-brick.png#inline) block should manage the pen. The pen should be raised at the end, and the flat ends settings turned back off.
- The ![row A block](../images/assignments/assignment01/rowA.png#inline) block should draw a line of 6 full bricks
- The ![row B block](../images/assignments/assignment01/rowB.png#inline) block should a line with 5 full bricks and two partial bricks on each end. The row should be **exactly** the same length as the row produced by the ![row A block](../images/assignments/assignment01/rowA.png#inline) block block
- The spacing between rows should be the same as the spacing between bricks
- The ![draw brick wall](../images/assignments/assignment01/brick-block.png#inline) block should draw a brick wall of the input number of rows. **However** to make your life easier, we will only test even numbers of rows (so the wall will always start on a A row and end on a B row)
- All blocks should match the posted images (same text and type)

## Submitting

You will submit your work through Canvas on the [assignment page](https://middlebury.instructure.com/courses/15553/assignments/289608).

Please see the [submission guidelines](../resources/submissions) for details on how to submit your work.

---

# Challenges

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

## Challenge A

We can use the same general strategy that you used to make n-sided polygons to make n-pointed stars (or star-like things). Rather than drawing a _side_, we draw a _point_. The trickiest part here is the angles.

For the polygon, you are going to just draw a straight side and then turn to face along the new side.

![diagram of the polygon turn](../images/assignments/assignment01/polygon-turn.png)

For a star, you are going to draw a point instead, but importantly, the turtle should be facing the same way it would be if you were drawing a polygon. You can do this by turning _away_ from the center of the shape by the same angle, running forward, then turn back by _twice_ the angle, and then draw the other side of the point.

![diagram of the star point turn](../images/assignments/assignment01/star-turn.png)

Save this challenge with a separate name and submit it [here]().

## Challenge B

There are two refinements that you could make to the brick wall to make it more interesting:

The first would be to make sure it works correctly no matter how many rows are requested (i.e., handle requests for an odd number of rows properly).

The second would be to add a second input allowing the user to specify the number bricks in a row. This will, of course, necessitate changes to the internal blocks as well.

Save this challenge with a separate name and submit it [here](https://middlebury.instructure.com/courses/15553/assignments/289610#).
