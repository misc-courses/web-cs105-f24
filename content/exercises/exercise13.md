---
title: "CS 105 - Exercise Thirteen"
date: "2022-05-02"
due: "2022-05-08T11:15"
name: "Exercise 13"
published: false
---

#### Goals

- Incorporate a lot of what you have learned into a simple game
- Practice abstraction, list manipulation, conditionals, loops, message passing, and sound handling

## Prerequisite

For this exercise, I have set you up with a [starter file](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22E13-runner-starter) that contains the assets for the game.

## Objective

You are going to write a little game I am calling **Castle Runner**.

![castle runner in action](../images/exercises/exercise13/castle-runner.png)

The game belongs to a genre known as ["side scrollers"](https://en.wikipedia.org/wiki/Side-scrolling_video_game). It is a classic form, where the view scrolls to follow the player's point of view. In our game the scenery will scroll from right to left, and our character will stay centered in our view, providing the appearance that it is running to the right.

Gameplay is very simple. The character is constantly running to the right along the stone walls. As gaps appear, the character has to jump over them. The game is over when the character slips into one of the holes. The score is the number of seconds the character has lasted.

## The Runner

When you open the project, you will see there are three sprites: `Runner`, `Ground`, and `Score`. We will start with the `Runner`.

We will be making use of another classic game technique: sprite graphics (this is where the "sprites" of Snap! actually come from). The basic idea was that drawing pictures out computationally all the time was time consuming. It is much easier to have a pre-drawn image that is just shown on the screen. However, we usually don't just want a static image, we want our characters to move. So, the solution is to draw the character in lots of different poses, and then flip between them (this should remind you of flip-book animation)

If you open the costume table, you will see that I have added a number of different costumes. If you quickly click through them, you will see that each one is a different running pose. If you click fast enough, it will look like the character is running.

_As a side note, I must give credit to "irmirx", who posted these to the [OpenGameArt.org forum](https://opengameart.org/content/animated-runner-character#). If you look around online, you will find a lot of sprite sets. Note that not all of them are copyright free. They are also often in sheets (all in a single image), which is great for how many video games are made, but not so great for us._

### Animate the runner

To animate our runner, we just need to cycle through the costumes.

Put ![next costume block](../images/snap-blocks/next-costume.png#inline) inside of a ![forever block](../images/snap-blocks/forever.png#inline).

Our little runner really books. Let's slow it down. Add a .1 second wait to the loop. This looks better, but it is doing a weird little stutter because we have images for jump up and come back down in the mix as well. So, we need to do a little refining.

#### Refinement

To fix this, we want the runner to switch back to the first run pose after the sixth pose, rather than moving on to the jump pose.

We can query the current costume number with ![of block](../images/snap-blocks/of.png#inline) from the Sensing palette.

Use the ![if else block](../images/snap-blocks/if-else.png#inline). If the current costume number is 6, then use ![switch costume block](../images/snap-blocks/switch-costume.png#inline) to switch to costume 'run1'. Otherwise, advance to the next costume.

Add another ![switch costume block](../images/snap-blocks/switch-costume.png#inline) above the loop to make sure we start in the right pose.

The runner should be back in business now.

#### Abstract

Let's add a little abstraction. If you look in the Motion palette, you will find some custom blocks waiting for you. Open up ![step block](../images/exercises/exercise13/step.png#inline). Drag the blocks you just created out of the ![forever block](../images/snap-blocks/forever.png#inline), and into ![step block](../images/exercises/exercise13/step.png#inline). Add the ![step block](../images/exercises/exercise13/step.png#inline) to the ![forever block](../images/snap-blocks/forever.png#inline) so your script looks like this:

![run loop](../images/exercises/exercise13/run-loop.png#inline)

Make sure that the runner is still running away.

Add a ![green flat hat block](../images/snap-blocks/green-flag-hat.png#inline) to your script so the runner will take off when the ![green flat button](../images/snap-icons/green-flag-button.png#inline) is clicked.

## The Ground

Let's turn our attention to the `Ground` sprite now.

The idea here is for the walls to steadily move from right to left, with occasional gaps. If you look at the costumes for this sprite, you will see there are three of them, of different sizes.

Here is the algorithm we are going to use (the details of the steps are described in the following sub-sections)

- Place the `Ground` sprite just off-stage on the right so we can't see it
- Switch to a random costume
- Create a clone, which will move to the left
- Wait for the clone to get fully on screen, plus some additional amount (for the gap), and repeat the process

### Place the `Ground` sprite just off-stage

The walls are all set up so that their "position" refers to the upper left hand corner.

Start with a ![green flat hat block](../images/snap-blocks/green-flag-hat.png#inline) so this script runs when we start.

Use ![go to xy block](../images/snap-blocks/go-to-xy.png#inline) to place the sprite 5 beyond the right edge of the stage. Set the `y` coordinate at -100.

### Moving the clone to the left

Before we finish with the main script, let's talk about the clones. The clones should drift to the left until they disappear off stage. At which point they should delete themselves.

Pull out the ![when I start as a clone hat](../images/snap-blocks/when-clone.png#inline).

Use the ![repeat until block](../images/snap-blocks/repeat-until.png#inline).

Inside of the repeat, use ![change x block](../images/snap-blocks/change-x.png#inline) to drift the clone to the left. I found -4 to be a good speed.

For the predicate on the loop, check if the right side of the clone (use ![my block](../images/snap-blocks/my.png#inline), if you click the black arrow, you will see that you can check for the bounds of the sprite with it) is less than the left side of the stage.

Add ![delete clone block](../images/snap-blocks/delete-clone.png#inline) after the loop to clean up.

You can test this by clicking the ![create clone block](../images/snap-blocks/create-clone.png#inline) right in the palette. You should see a ground piece sail across the stage and disappear on the other side.

### Creating new clones

Now that we have the clone behavior sorted, we can return to the main `Ground` script and add some blocks to spawn new clones.

Create a new script variable called `clone` (we will want this in a moment).

Add a ![forever loop](../images/snap-blocks/forever.png#inline).

Inside of the loop, set the `clone` variable to ![new clone block](../images/snap-blocks/new-clone.png#inline). Note that unlike ![create clone block](../images/snap-blocks/create-clone.png#inline), this block is a reporter. This allows us to refer to this particular clone in our script.

Next, add a ![wait until block](../images/snap-blocks/wait-until.png#inline). This allows us to pause a script until some condition has been met.

Our condition will be that the right of the `clone` is less than the left of "my" left. In other words, the clone is no long overlapping.

![wall and its clone](../images/exercises/exercise13/walls.png)

If you run the script now, you will see an endless number of blocks emerging from the right and drifting to the left. There is a slight gap between them caused by some vagaries in how the size is determined, but it isn't quite the gap we want. We want something that our runner would have to jump over.

Change the condition so that rather than just being ![my left](../images/exercises/exercise13/my-left.png#inline), it is the sprite's left minus a random number between 100 and 130 (use ![random block](../images/snap-blocks/pick-random.png#inline)). You should now see a more significant gap between each sprite.

### Switching costumes

To add some more interest, let's switch the costume of the `Ground` sprite at random. Add the following to your loop (it doesn't really matter where).

![random costume selection](../images/exercises/exercise13/random-costume.png#inline).

### Putting it together

If you drag the `Runner` down on top of the ground, and click the ![green flat button](../images/snap-icons/green-flag-button.png#inline), the runner will look like it is running along the top of the walls (though it also runs across the gaps -- we will have to fix that).

## Jumping and falling

Now it is time to start transforming this into a game.

We want to the runner to run when it is on the ground, and fall when it is not on the ground.

### Test if we are on the ground

You will find that there is another custom block in the Operators palette: ![on ground reporter](../images/exercises/exercise13/on-ground.png#inline).

This new block is a reporter that will report either True or False depending on whether or not the runner is "on the ground".

So, how do we tell if the runner is "on the ground"?

We could use ![touching block](../images/snap-blocks/touching.png#inline) to determine if the sprite is on the ground. However, this isn't quite enough. If our character falls between the walls, then it might touch the sides as it goes past, which is not quite the same as being _on_ the ground.

We could also compare the location of the bottom of the runner and the top of the ground. This would avoid the "hitting the sides of the walls on the way down" problem, but would ignore the difference between ground and gaps.

The truth is we need both of these, combined with an ![and block](../images/snap-blocks/and.png#inline).

![on ground script](../images/exercises/exercise13/on-ground-script.png)

That extra 20 in the equation is to handle slight variations where the bottom of the sprite is "close enough".

Add an ![if else block](../images/snap-blocks/if-else.png#inline) to the loop for the runner. If it is "on the ground", it should step, otherwise do nothing.

Click the ![green flat button](../images/snap-icons/green-flag-button.png#inline) and position the sprite so it is just barely overlapping the top of the ground.

It should run when on the wall pieces and pause in the gaps.

### Falling

What we want is for the sprite to fall down in the holes.

Go back to the Motion palette and find the ![fall block](../images/exercises/exercise13/fall.png#inline).

The behavior for the fall block is pretty simple.

First, switch the costume to "fall".

Second, we want to move down a bit. We will use the ![glide block](../images/snap-blocks/glide.png#inline) this time. Set the secs to .01. Set the x position to ![x position](../images/snap-blocks/x-position.png#inline). Finally, set the y position to ![y position](../images/snap-blocks/y-position.png#inline) - 5.

Add the new block into the else slot in the conditional.

Now, if start the program, the runner should start falling.

Add a ![goto block](../images/snap-blocks/go-to-xy.png#inline) and start the sprite at (-100, 200). This should be high enough that the ground should have emerged fall enough to catch it.

You should now see the sprite fall, land on the ground and start running, and then fall again when it reaches the next gap.

### Jumping

To keep the sprite out of the pits, we need to be able to jump over them.

Time to implement the ![jump block](../images/exercises/exercise13/jump.png#inline).

The ![jump block](../images/exercises/exercise13/jump.png#inline) is very similar to the ![fall block](../images/exercises/exercise13/fall.png#inline).

First, switch to the 'jump' costume.

Then use the ![glide block](../images/snap-blocks/glide.png#inline) to move up. This time, set the secs to .5 and the y position to ![y position](../images/snap-blocks/y-position.png#inline) + 75.

We want the sprite to jump when the user types the Space key.

Add another ![if else block](../images/snap-blocks/if-else.png#inline) where the ![step block](../images/exercises/exercise13/step.png#inline) currently is.

For the condition, use ![key pressed block](../images/snap-blocks/key-pressed.png#inline). If the Space bar is pressed, jump, otherwise step.

## Adding polish

At this point, we have a playable game... but we can do a little better.

### Stopping

Currently, the runner will fall through the gap and disappear, but the game keeps running (we even get a weird effect where the ground speeds over the runner). Let's stop everything when the runner has failed.

Swap out the main ![forever block](../images/snap-blocks/forever.png#inline) for a ![repeat until block](../images/snap-blocks/repeat-until.png#inline).

For the condition, we want to stop the loop when the bottom of the sprite is less than the top of the ground -30 (note the similarity to our detection of when we are on the ground). In other words, if the runner has gotten sufficiently below the top of the ground, it must have fallen off.

![failure condition predicate](../images/exercises/exercise13/failure-condition.png)

Of course, this will just freeze the runner in mid-air.

Why not let the sprite get off screen before we stop? Well, we also want to handle the fact that ground keeps rumbling along even though our runner isn't running any more. So, we need to let the `Ground` clones to know that they should stop moving.

So, we will broadcast the message 'stop' to tell the other spites to stop. You will need to make a new signal using the drop down menu in the ![broadcast block](../images/snap-blocks/broadcast.png#inline)

Then the runner can resume falling. Add another ![repeat until block](../images/snap-blocks/repeat-until.png#inline) and have the runner keep falling until the top of the sprite is below the bottom of the stage.

#### Stop the clones

Of course, we still need to stop the clones.

Return to the `Ground` scripts.

Add a ![when I receive hat](../images/snap-blocks/when-i-receive.png#inline) to the `Ground` sprite to catch the 'stop' message.

When the 'stop' message is received, the sprite should run the ![stop block](../images/snap-blocks/stop.png#inline). Set this to stop 'other scripts in sprite'.

### Sound

What kind of game doesn't make sounds?

Let's add some. If you look in the Sounds tab of the `Runner`, you will see that I have included some sounds (which my son had a lot of fun making).

#### Step sound

The step sound is the most involved to add.

The sound is designed to approximate the sound of someone in a suit of armor running along a stone wall.

If you look closely at the different costumes, there are only two foot falls, in the first and the fourth poses.

Go back into the ![step block](../images/exercises/exercise13/step.png#inline). Right before the ![wait block](../images/snap-blocks/wait.png#inline), add an ![if block](../images/snap-blocks/if.png#inline).

If the current costume number is a 1 or it is a 4, play the 'step' sound.

#### Jump sound

The jump sound is easy. Open up the ![jump block](../images/exercises/exercise13/jump.png#inline) and play the sound at the start.

#### Fall sound

The fall sound is similarly easy, but this time we don't want to add it to the ![fall block](../images/exercises/exercise13/fall.png#inline). The fall sound isn't for every time the runner is falling, just when it has fallen into a pit. So play this sound right before you broadcast 'stop'.

### Scoring

For scoring, we are just counting the number of seconds the runner managed to stay out of the pits. Here is what that looks like:

![scoring](../images/exercises/exercise13/scoring.png)

You will also want to add a receiver that stops all scripts when the 'stop' message is received.

## What I will be looking for

You made it! That was the longest exercise that we have had, but hopefully one that was worth it.

Here is what we will be looking for:

- The ![step](../images/exercises/exercise13/step.png#inline), ![jump](../images/exercises/exercise13/jump.png#inline), ![fall](../images/exercises/exercise13/fall.png#inline), and ![on ground block](../images/exercises/exercise13/on-ground.png#inline) are all implemented correctly
- The runner wears the appropriate costume for each activity
- The runner runs on the ground and otherwise falls
- The space bar makes the runner jump
- The ground rolls across continuously
- Everything stops when the runner falls in a pit
- The sounds play at the right time

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/171303) on Canvas to submit the URL.
