---
title: "CS 105 - Exercise Two"
date: "2024-09-11"
due: "2024-09-13T11:15"
name: "Exercise 02"
published: true
---

#### Goals

By the end, you should

- be able write a script that draws something on the stage
- understand how location and direction work in Snap!
- be able to debug your code

## Prerequisite

- Open up the [starter project](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22E02-Maze)
- Save the project so you have your own copy

## Objective

_Aside: When you opened the project, you will have noticed that the stage isn't as plain as it was the last time. If you click on the "Stage" button on the right, you will see that the scripting area changes. Now, rather than a tab called "Costumes", there is a tab called "Backgrounds". You can add new backgrounds to your projects by just dragging images into the "Backgrounds" pane._

In this exercise, you are going to tell the sprite how to traverse this maze without hitting the walls. To keep you honest, we are going to tell the sprite to draw the path it follows so we can tell if it ran into the walls or not. This is what it should look like at the end (you are welcome to have different turns (for instance, you don't need to get the line through the curvy bit as smoothly as mine), just so long as there is a line drawn from the start to the end that doesn't touch the blue walls):

![Goal](../images/exercises/exercise02/goal.png)

I have given you some code to get you started (if you don't see it, make sure that you have returned to the sprite and clicked on the "Scripts" tab).

![Starter code](../images/exercises/exercise02/starter.png)

The first thing I would like you to add is the ![pen down](../images/snap-blocks/pen-down.png#inline) block. When this is down, everywhere the sprite goes, it will leave a trail behind. Click this onto the end of the script I gave you (we refer to each linked collection of blocks as a **script**).

Now, add a combination of ![move](../images/snap-blocks/move.png#inline) blocks, ![turn left](../images/snap-blocks/turn-left.png#inline) blocks, and ![turn right](../images/snap-blocks/turn-right.png#inline) blocks to maneuver the sprite through the maze. Recall that you can run the script by clicking the ![green flag button](../images/snap-icons/green-flag-button.png#inline) or by clicking on the hat block itself on the top of your script.

_Hint #1_ Don't try to get the sprite home all at once. Add a block, and then run the script to see if the sprite is where you want it to be before adding another. The incremental approach will save you a lot of headaches as our scripts get more complicated. When things go wrong, it is easier to fix if you know it is just the last block you added that is the problem...

_Hint #2_ You are going to make a very long script, with a lot of ![move](../images/snap-blocks/move.png#inline) blocks, ![turn left](../images/snap-blocks/turn-left.png#inline) blocks, and ![turn right](../images/snap-blocks/turn-right.png#inline) blocks. Explore the context menu that comes up when you right click on a block. The 'duplicate' option will make a copy of the block you clicked _to the end of the script_. This is good for grabbing repetitive chunks. The menu option that looks like a tiny copy of the block copies just that one block. The 'extract' option will remove the block from the middle of a script and allow you to place it elsewhere. The 'delete' option just removes the block altogether. The `relabel` option provides you with other options for the block. So, for example, If you have a ![turn left](../images/snap-blocks/turn-left.png#inline) block, 'relabel' will allow you to switch it to a ![turn right](../images/snap-blocks/turn-right.png#inline) block (this work similarly for other blocks with related functionality).

_Hint #3_ To delete more than a single block at a time, just drag the blocks onto the palette area.

_Hint #4_ It can be a pain to keep going over to the green flag and clicking it. You can click anywhere on your script to run it.

### Tidying up

As you run your script a few times, you will find that the pen lines all over the place are a problem. Especially since the sprite draws when it resets itself back to the start.

The solution is to add a ![clear](../images/snap-blocks/clear.png#inline) block to your script. Add it right before the [pen down](../images/snap-blocks/pen-down.png#inline) block.

### Debugging

The other thing you will find is that you can't see what the sprite is doing. When you start the script, you see the result immediately. It can be helpful to get the sprite to slow down and show the steps.

At the top of the window, you will find the "Show stepping" button ( ![stepping icon](../images/snap-icons/stepping.png#inline) ).

Click it.

The button will highlight and you will see a slider appear next to it. The slider controls the step speed. Move the slider to the middle of its range.

When you run your script now, you will see that Snap! highlights each block before carrying out the action, and pauses between actions so you can see what the effect was.

## Submitting

Save the exercise using the instructions in the [Submission Guidelines](../resources/submissions).

Visit the [exercise page](https://middlebury.instructure.com/courses/15553/assignments/289622) on Canvas to submit your work.

# Challenge

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

Redo the maze using only ![go to x-y](../images/snap-blocks/go-to-xy.png#inline) blocks.

Once this is working, submit it on [Canvas](https://middlebury.instructure.com/courses/15553/assignments/289623).
