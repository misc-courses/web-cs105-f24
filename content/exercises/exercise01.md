---
title: "CS 105 - Exercise One"
date: "2024-09-09"
due: "2024-09-11T12:05"
name: "Exercise 01"
published: true
---

#### Goals

By the end, you should

- have an account for working with Snap!
- know the elements of the Snap! interface
- be able to chain blocks together to make a simple program
- be able to use C-blocks to provide repetition and choice in Snap!
- be able to change the costume of the sprite

## Prerequisite

In this class, we will be using [Snap!](https://snap.berkeley.edu/) as our computational playground. While you can jump in and use Snap! immediately, it will be best if you create an account.

Visit the Snap! [sign up page](https://snap.berkeley.edu/sign_up) and create an account for yourself (the username you chose won't matter -- just bear in mind that others will see it, so don't pick something too embarrassing).

## Meet the Snap! environment

Start by opening the [starter project](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22E01-CatchAlonzo).

You will see something like this:

![Snap! workspace](../images/exercises/exercise01/workspace.png)

If you just see the stage, click the full screen button ![full-screen button](../images/snap-icons/full-screen-button.png#inline).

On the left-hand side, you have the **palettes** of **blocks** (each palette has its own collection of blocks). These are the basic building blocks that we will construct our scripts with.

In the middle is the **scripting area**, where you will specify the behavior of the **sprites**.

On the right, you can see the **stage**, where the sprites will perform their actions (while this seems very simplistic, you will see that we can coax quite a bit of complexity out of this simple setup).

The sprite is wearing a **costume**, which determines what the sprite looks like on the stage. This sprite is dressed up as [Alonzo](https://snapwiki.miraheze.org/wiki/Alonzo), the mascot of Snap!.

## Save a copy

Before you make any edits, save the project so you have your own copy.

Click on the ![file button](../images/snap-icons/file-button.png#inline) and find the "Save" option. You should see a Save dialog like this:

![Save Dialog image](../images/exercises/exercise01/save-dialog.png).

Make sure cloud is selected, and then click the "Save" button. You now have your own copy of the project.

## Make Alonzo move

We are going to tell Alonzo to move every time we click on him. We will do that by writing a short program that looks like this:

![Short program](../images/exercises/exercise01/random.png)

This program has two blocks.

The first block, `when I am (clicked)` is a **hat block**. You will find this in the "Control" palette. _Notice that the blocks are color coded so you can tell which palette it comes from_. Drag the block out into the scripting area.

Blocks like this go on top of a sequence of commands to say when to execute the steps. This is something called **event-driven programming**. You do not need to use hat blocks -- clicking on blocks will run them directly. However, most of our programs will include them. This one will respond when the sprite is clicked.

The second block is a "Motion" block. Look for the ![go to block](../images/snap-blocks/go-to-random.png#inline) block. Drag it out into the script area and place it under the hat block.

_You should note that the part that says "random position" is in a box with a slightly darker background and a little arrow. This is a drop-down menu. If you click it, you will see some other options like "center"._

And just like that, you wrote your first program! If you click on Alonzo, he will jump to some new location on the stage.

## Turning this into a game

We are going to turn this simple program into something a little more like a game. Rather than having Alonzo just sit there waiting to be clicked, we are going to have him run around the screen.

Find the `forever` block in the "Control" palette.

![The forever block](../images/snap-blocks/forever.png)

The `forever` block is called a **C-shaped block** (for obvious reasons). You can put blocks _inside_ of the C. The `forever` block will run all of the blocks you put inside of it. When it reaches the end of the list, it will jump back up to the top and start over. It is called the "forever" block because it will keep this up forever. It is like the blocks inside are in [Groundhog Day](https://en.wikipedia.org/wiki/Groundhog_Day) or [Russian Doll](https://en.wikipedia.org/wiki/Russian_Doll_%28TV_series%29) -- they are forced to relive the same sequence over and over.

<iframe src="https://giphy.com/embed/3o7WIQ4FARJdpmUni8" width="480" height="334" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bill-murray-groundhog-day-well-its-again-3o7WIQ4FARJdpmUni8">via GIPHY</a></p>

The only way to stop the repetition is to stop the script (clicking the red stop button ![stop sign button](../images/snap-icons/stop-button.png#inline) in the upper right will do this, but we will see another way shortly).

Put the `forever` block around the `go to random position` box. Now when you click Alonzo the first time, he will start jumping around the screen.

Whoa Alonzo -- slow down!

### Slow down Alonzo

Alonzo is zooming all over the place because as soon as he sets down somewhere, the `forever` block repeats and he shoots off somewhere new.

To get Alonzo under control, we are going to make him wait a moment before he jumps again. Find the ![wait (1) secs](../images/snap-blocks/wait.png#inline) block in the "Control" palette.

Add this to the program. Where should the block go? You want Alonzo to leap immediately when you click him, but then wait a moment before jumping again. Think about that, and then add the ![wait (1) secs](../images/snap-blocks/wait.png#inline) block into your program. Try it out. Did it work? If it didn't, try the block in a different location.

Once the behavior is correct, you can change the timing a little to lengthen or shorten the amount of time Alonzo waits for you.

### Make Alonzo acknowledge clicks

After you click Alonzo, he now is happily jumping all over the place, making it harder to click him a second time. What happens when you click him a second time?

Well, when you click him, he starts jumping around at random. Since he is _already_ jumping around, it is a little difficult to tell that you did anything. So, we are going to have Alonzo face the other direction when you click on him.

If you click on the "Costumes" tab in the scripting area, you will see that the sprite actually has two costumes.

![Alonzo's two costumes](../images/exercises/exercise01/costumes.png)

To make Alonzo face the other direction, we will just tell the sprite to switch costumes.

Go to the "Looks" palette. You will find the ![next costume](../images/snap-blocks/next-costume.png#inline) block.

Click on the ![next costume](../images/snap-blocks/next-costume.png#inline) block. You can see that running the block switches the sprite to the next costume. If you click it again, it switches back (if you had more costumes, the sprite would visit each one in turn, looping around only when it reached the end of the collection).

Add this block to your code so that Alonzo changes direction once when he is clicked before jumping somewhere new. You want Alonzo to change his costume when he is clicked, _not_ every time he jumps. So where will you put the block?

### Improve the game

As games go, this is still pretty meager. We need to add an objective. Let's say we need to click Alonzo a certain number of times to end the game. We could count the number of successful clicks, but we are going to do something a little different.

If you look in the "Looks" palette, you will find a the ![change ghost block](../images/snap-blocks/change-ghost.png#inline) block. The ghost effect makes the sprite become transparent. Click the block once and you will see Alonzo fade a little. If you keep clicking, the sprite will fade away to nothing.

You can think of each sprit as having a `ghost` value which is a number between 0-100, where the higher the number the more _ghostly_ the sprite becomes (i.e., more translucent). When you run the ![change ghost block](../images/snap-blocks/change-ghost.png#inline) block, it adds 25 to that number (while remaining within the range from 0-100). Initially, the sprite has a `ghost` value of 0. If the value becomes 100, the sprite is invisible. (If you have made the sprite disappear, click on the ![set ghost effect to 0](../images/snap-blocks/set-effect.png#inline) block to reset it).

Add the ![change ghost block](../images/snap-blocks/change-ghost.png#inline) block to your code so that Alonzo fades a little every time he is clicked. Like the costume change, Alonzo only wants to fade once for every click. Change the amount Alonzo fades to be a smaller number -- 25 means that Alonzo will be gone in only four clicks.

Make sure this works before moving on.

Now, let's add a penalty to the player for missing Alonzo. Every time Alonzo jumps, change the ghost effect by -5. So, every time Alonzo jumps independently, he re-solidifies a little bit.

If you run the game now, Alonzo will jump around and as you click him, he will fade away. If he jumps before you click, he will re-solidify.

### Ending the game

We will end the game when Alonzo is completely transparent. To end the game, we will add this collection of blocks:

![Alonzo endgame](../images/exercises/exercise01/game-end.png)

Use the block colors to find all of these blocks in the palettes. Note that while the `if` and `stop` blocks are different shades, they are actually the same color and both found in the same palette. Snap! uses something called "zebra coloring"; two different shades of the same color are used for nesting blocks of the same color to make it easier to see the boundaries.

Read through the sequence of blocks and try to figure out what it does.

If you insert this into your code at the top of the code in the `forever` block, the game will end when Alonzo has been fully ghosted. Try it out and see if the behavior matches your expectations.

Congratulations! You've made it through the first exercise. Just to make sure, make sure that your program does all of these things:

- Alonzo starts jumping around at random when you click on him
- Every time you click on Alonzo, he faces the other direction (and _only_ when you click on him)
- Every time you click on Alonzo, he fades away a little bit
- Every time Alonzo jumps and you didn't click on him, he should get a little more solid
- If Alonzo ever becomes completely transparent, the game ends and Alonzo stops jumping (until you click on him again)

I encourage you to play around. Explore the blocks and see if there are other things that you can make Alonzo do, just make sure that these core things are maintained.

## Submitting

You will submit your work through Canvas on the [assignment page](https://middlebury.instructure.com/courses/15553/assignments/289621).

Please see the [submission guidelines](../resources/submissions) for details on how to submit your work.
