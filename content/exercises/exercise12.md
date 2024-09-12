---
title: "CS 105 - Exercise Twelve"
date: "2022-04-25"
due: "2022-04-29T11:15"
name: "Exercise 12"
published: false
---

#### Goals

- Write a basic simulation
- Experiment with some simple statistics
- Learn about cloning and working with multiple sprites

## Prerequisite

For this exercise, I am providing you with starter code, which adds some relevant costumes to our sprite. Open the [starter code](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22E12%20-%20starter) and then save it to make your own version.

## Objective

In this exercise, you are going to simulate coin flipping and gather some statistics about what happens when you flip multiple coins at a time.

As you will see in the starter code, I have provided you with two costumes representing the two sides of a coin.

## Flipping the coin

We will start by making a block that flips the coin: ![flip block](../images/exercises/exercise12/flip.png#inline).

"Flipping" the coin basically means picking between two equally possible options and calling one outcome "heads" and the other "tails".

To get random numbers, we will use ![pick random block](../images/snap-blocks/pick-random.png#inline) and set the inputs to 0 and 1. When you click the block you will see that sometimes it reports 0, and other times it reports 1. There should be a 50/50 chance of either outcome.

Somewhat arbitrarily, we can say the 0 means that the coin landed with the head side up, and the 1 means that the coin landed head side down.

We can show this by changing the costume of the sprite with ![switch costume](../images/snap-blocks/switch-costume.png#inline).

Combine these blocks with ![if-else block](../images/snap-blocks/if-else.png#inline) and ![equality block](../images/snap-blocks/equal.png#inline) so that the costume matches the number we generated.

Test out your block. When you flip the coin, sometimes it will be heads, sometimes it will be tails.

### Improving the "flip"

While our flip simulation works, it isn't very satisfying. Many times it doesn't look like the coin flips at all. We are going to improve it with some animation.

Using ![repeat block](../images/snap-blocks/repeat-count.png#inline) and ![wait block](../images/snap-blocks/wait.png#inline), Make a loop that switches to heads, waits 0.05 seconds, switches to tails, and then waits 0.05 seconds again. Do this 5 times. This creates a strobe effect where the coin flashes back and forth between the two faces.

Add this before your "if" block in your ![flip block](../images/exercises/exercise12/flip.png#inline), so the coin flickers and then makes a selection.

## Collect data

If we are going to look at the statistics, we need some way to keep track of when the coin has been flipped and when it came up heads.

Using the 'Make a variable' button, add two new variables `flips` and `heads` (these should _not_ be script variables). Make these 'Sprite only'.

Edit your ![flip block](../images/exercises/exercise12/flip.png#inline) to update these two variables using ![change by block](../images/snap-blocks/change-by.png#inline).

The `flips` variable should change every time.

The `heads` variable should only change when the coin lands on heads.

Show the two variables on the stage (if they aren't already there), and flip the coin a bunch of times and make sure that they update.

Put a ![flip block](../images/exercises/exercise12/flip.png#inline) in a ![forever block](../images/snap-blocks/forever.png#inline) and let it run for a while. You should see that comes up heads about 50% of the time. An interesting thing about this process is that it will take a fairly large number of flips before the odds really start equally out (in my tests, I had to get more than 50 flips before they balanced). This tells you something about how our perceptions work in the moment. If you just flipped a coin a couple of times you would see what appeared to be a bias in the coin (in truth, coins _are_ biased -- most are not cast to have even mass on both sides, but the difference tends to be minor on most coins).

## Multiple coins

If our intuition isn't great with a single coin, it gets even worse with multiple coins. So, let's run some experiments with multiple coins. In particular, we will look at how probabilities combine. Given N coins, what is the probability that all of them will come up heads?

But how do we get multiple coins?

### Cloning

Snap! has a trick that we haven't made use of yet called "cloning". In essence, it allows you to make independent copies of your sprite.

Find the ![create clone block](../images/snap-blocks/create-clone.png#inline). Set the input to 'myself' and try clicking it. It will appear that nothing has happened, but if you drag your clone in the stage, you will see there is a second coin underneath.

#### Interacting wth clones

There are a couple of different ways to interact with clones. They _do not_ run any of the steps in the script that created them. However, they will respond to any of the events like clicks or key presses. A notable exception to this, however, is the ![stop button](../images/snap-icons/stop-button.png#inline) and the the ![green flag button](../images/snap-icons/green-flag-button.png#inline), which will clear the clones.

Another way is to send the clones messages. In the Control palette, you will find there are a collection of blocks concerned with **sending**, **broadcasting** and **receiving** messages. Messages can be targeted to a particular sprite (_sent_) or they can be _broadcast_ to everyone.

### Create the clones

Pull out a ![green flag hat block](../images/snap-blocks/green-flag-hat.png#inline).

Under it, move the sprite to (-200, 0). Create a clone and then change the X position by 75 to reveal the clone. Repeat this three times so you have a total of four coins.

It is going to be easier for us to just deal with the clones and ignore the original, so add a ![hide block](../images/snap-blocks/hide.png#inline) at the end of the script.

Because we will want to go through this process more than once, add a ![show block](../images/snap-blocks/show.png#inline) at the beginning of the script so we can see the original coin again.

Now, when you run the script you should get three (visible) coins in a row.

### Flip the coins

To flip the coins, we will _broadcast_ a signal. Pull out the ![broadcast and wait block](../images/snap-blocks/broadcast-wait.png#inline) (don't attach it to your script yet). Click on the input and select 'new' from the menu. This allows us to create our own signals. Type 'flip' in the dialog box that comes up. This block will now send out the signal "flip" and wait until any receivers have received the message and performed whatever action is associated with it.

To make the sprites receive the message, we need a ![received hat block](../images/snap-blocks/received-hat.png#inline). Pull it out, and set the input to 'flip'. Attach a ![flip block](../images/exercises/exercise12/flip.png#inline) to it.

Click on the ![broadcast and wait block](../images/snap-blocks/broadcast-wait.png#inline) block, and all of the clones should flip.

### Detecting if all of the coins show heads

Our goal is to figure out the frequency with which _all_ of the coins come up heads at the same time experimentally. In order to do that, we need to figure out if the clones have come up heads. We will build up to this one block at a time.

Our starting place is the ![my block](../images/snap-blocks/my.png#inline), which gives us access to the sprite's attributes. Click the input and select 'clones'. If you click on the block now, it will give you a list of all of the clones.

Of course, we want the current costume of the clones, not the clones themselves. We will do this the same way we did before. Find the ![of block](../images/snap-blocks/of.png#inline). Set the first input to 'costume name'.

Like many of our blocks, ![of block](../images/snap-blocks/of.png#inline) can operate on lists. So pass it the ![my block](../images/snap-blocks/my.png#inline) (set to clones). When you click on it, you should get a list of the the costumes worn by the clones.

![costumes of the clones](../images/exercises/exercise12/clone-states.png)

What we want to know is if they are all heads.

There are a number of different approaches to this problem (when you are done, a great exercise would be to think up some different ways to do this -- a loop? a keep block?). What we are going to do is use the ![contains block](../images/snap-blocks/contains.png#inline). If the list _contains_ `tails` then it _wasn't_ all heads. So, if you wrap this in a ![not block](../images/snap-blocks/not.png#inline), you will have a predicate that is true when all of the clones are showing heads.

### Collecting statistics

Okay, let's put these tools together and gather some statistics.

First create a new variable called `all heads` (again, don't make this a script variable -- use 'Make a variable' and choose 'for this sprite only').

Return to the script with the ![green flag hat block](../images/snap-blocks/green-flag-hat.png#inline).

At the start of that script, set all three of your variables to 0 to start the experiment (we won't really pay attention to the `heads` variable, but we will set it for completeness).

After the coins are laid out, we want to flip them 100 times using the ![broadcast and wait block](../images/snap-blocks/broadcast-wait.png#inline) block.

After each flip, use your new predicate to detect if they are all heads. If they are, change `all heads` by 1.

Once you have run this, `flips` should show 100, and `all heads should show hiw many times we got all heads in a single flip.

## Gather statistics

Run the simulation _three_ times, and write down the number of times you got all heads in each run. Put these three values and their average into a comment.

If you have never studies probability, then it can be non-intuitive that if we want to know how likely it is for two different things to happen, we _multiply_ together the individual probabilities of the two events. So, if we have two coins, each of which will come up heads 50% of the time, then the probability the they will both come up heads is 0.5 x 0.5 = 0.25, In other words, there is a 25% chance of them both being heads at the same time. Another way to think of this is that with a single coin and two equally likely options, there are only two possibilities (H or T). So, the chance that it is heads is 2 in 1 or 50%. With two coins, then the possible end states are (HH, HT, TH, and TT). If all four of these are equally possible, then the chance of getting HH is 1 in 4, or 25%.

So what about our three coins? Analytically, the probability of all three being heads is 0.5 x 0.5 x 0.5 = 0.125 or 12.5%. How close is your experimental result to the analytic expectation?

How close are your experimental results to the analytic expectations (if there is a 50% chance of any one coin coming up heads, then there is a .5 X .5 X .5 = .125 or 12.5% chance of all three coming up heads at the same time)?

## What I will be looking for

- There should be a ![flip block](../images/exercises/exercise12/flip.png#inline) that flips the coins and keeps track the number of flips and the number of heads
- When the 'flip' signal is sent, any visible coins should flip
- When the ![green flag button](../images/snap-icons/green-flag-button.png#inline) is clicked, three coins should appear and they should run a trial of 100 flips, keeping track of the number of times all coins show heads
- The statistics should reset at the start of each run
- There should be a comment with the results of three experiments

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/170827) on Canvas to submit the URL.
