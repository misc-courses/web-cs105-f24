---
title: "CS 105 - Assignment Eight"
date: "2022-04-27-10-28"
due: "2022-05-04T23:59:00"
name: "Assignment 08"
published: false
---

#### Goals

- Demonstrate that you can manage a simulation with a lot of moving parts
- Gain experience working with clones

## Prerequisite

For this assignment, you will need my [starter project](<https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22A08%20-%20pandemic%20(starter)>). Open the link and then save to make your own copy.

## Background: Building a infection simulation

This week, you are going to build a (very simplified) infection simulation.

The simulation works by cloning a large number of sprites and letting them wander around. Some of the sprites are sick. When they come in contact with healthy sprites, there is a chance that the healthy sprites also get sick. Eventually sick sprites will either recover or die.

When you look in the starter code, yuo will see that I have supplied you with three different colored Alonzo costumes with appropriate names: yellow (healthy), blue (sick), green (recovered).

![example simulation](../images/assignments/assignment08/stage.png)

Rather than having you write this assignment from scratch, I've decided to provide most of the framework. Throughout the simulation, I use custom blocks, and these I have left for you to fill in.

### Variables

The simulation uses six variables.

- `initial population` - this is the number of clones to make **total**
- `infection rate` - this is the probability (out of 100) that a sprite will get sick when it touches a sick sprite
- `fatality rate` - the probability (out of 100) that a sprite will die rather than recover
- `deaths` - a tally of the number of sprites that died during the simulation
- `sick sprites` - the number of currently sick clones
- `hospital capacity` - the number of "beds" we have for sick sprites, when this is exceeded, we will double the fatality rate

### Communication

You will notice that one of the scripts I provided received messages:

![get sick script](../images/assignments/assignment08/get-sick-script.png)

In particular, it receives the message 'get sick'. When you want a sprite to get sick, send it this message.

## Implementation

### Initialization

I have provided you with the start of the initialization.

![initialization framework](../images/assignments/assignment08/initialize-simulation.png)

This initializes the variables for the simulation and sets up our sprite to be cloned. Your task is to actually create the clones by adding the implementation for ![initialize the population](../images/assignments/assignment08/initialize-population.png#inline).

There are a number of ways that you could implement this.

One approach is to first create _all_ of the clones, and then tell the appropriate number to get sick. I recommend the use of the ![my block](../images/snap-blocks/my.png#inline) to get the collection of clones, and the ![broadcast to block](../images/snap-blocks/broadcast-to.png#inline) the to send a targeted message selected clones.

_Note that the ![broadcast to block](../images/snap-blocks/broadcast-to.png#inline) appears in the pallette as ![broadcast  block](../images/snap-blocks/broadcast.png#inline) -- you just need to click the black arrow to reveal the "to" part._

An alternative approach would be to create all of the healthy clones first, and then in a second loop, create all of the sick clones by making them and then sending them a targeted message to get sick.

### Wandering

For the simulation, the sprites will be wandering at random around the space. This is governed by this script:

![wandering script](../images/assignments/assignment08/wander-script.png)

Your part is to implement the ![wander block](../images/assignments/assignment08/wander.png#inline). Create a "forever" loop in which the sprite turns by some random amount (left or right), moves forwards a few steps and then if it is on the edge, bounces back into the stage (remember ![bounce block](../images/snap-blocks/bounce.png#inline)).

### Roll the dice

A number of the actions in our simulation are dependant on "rates". These are the chance that some event will happen. For example, the `infection rate` governs the likelihood of becoming infected if contacted by someone who is infected.

You need to implement the ![chance block](../images/assignments/assignment08/chance.png#inline). This just involves generating a random number between 1 and 100 and then checking to see if the value is less than the provided rate.

### Getting sick

The next priority is to get the sprite sick when it is told that it is time by implementing the ![get sick block](../images/assignments/assignment08/get-sick.png#inline).

You will notice that there is another variable that is sprite specific, which is called `health`. When a sprite gets sick, you should set this variable to 'sick' and switch the costume appropriately. When the sprite gets sick, increment the `sick sprites` variable. You should only do this if the sprite is currently healthy.

### Recovery

The ![recover block](../images/assignments/assignment08/recover.png#inline) is very similar to the ![get sick block](../images/assignments/assignment08/get-sick.png#inline).

Set the health to 'recovered' and switch the costume.

### Dying

The ![die block](../images/assignments/assignment08/die.png#inline) is a little bit different. The sprite should slowly fade away and vanish. Use a loop and the ghost effect blocks from the Looks palette. Once the sprite has fully faded, add 1 to the `death` count and delete the clone ( ![delete clone block](../images/snap-blocks/delete-clone.png#inline) ).

### Is the hospital full?

The next block I would like you to implement is ![is the hospital full predicate](../images/assignments/assignment08/hospital-full.png#inline).

The hospital is full if the number of sick clones exceeds the number of beds.

### Dead or Not?

One of the scripts is handling the wait interval between getting sick and recovery.

![recovery script](../images/assignments/assignment08/recovery-script.png)

As you can see, it waits a small random period of time and then, if the sprite is sick, it transitions to the next phase. You need to implement ![recovery or die block](../images/assignments/assignment08/recover-or-die.png#inline).

The sprite is no longer sick, one way or another, so decrement the `sick sprites` variable.

In general, the rest of the block will work by using the `fatality rate` as an input to ![chance block](../images/assignments/assignment08/chance.png#inline). If the chance returns true, then the clone should die, otherwise it can recover.

However, I want you to add a wrinkle. If the hospital is full, then the fatality rate is multiplied by five.

This will allow us to look at the phenomenon of "flattening the curve". The theory being that if the infection rate is low enough, then even if everyone eventually gets it, the number of deaths will be lower.

### Infecting others

The final task is to spread the infection. Again, I provided you with the framework:

![spreading the infection script](../images/assignments/assignment08/spread.png)

You need to create ![infect block](../images/assignments/assignment08/infect.png#inline).

For this block, you want to iterate over all of the sprite's _neighbors_. These are defined as other sprites in the immediate area. You can get this list using the ![my block](../images/snap-blocks/my.png#inline).

For each neighbor, send them a 'get sick' message if they are touching you ( ![touching block](../images/snap-blocks/touching.png#inline)), and if they are unlucky (check the `infection rate`). I recommend the use of ![for each item block](../images/snap-blocks/for-item.png#inline).

## Run some tests

Run some experiments with the simulation. For example, one simulation I ran started with these parameters:

- population: 80
- hospital capacity: 15
- fatality rate: 2
- infection rate: 10

The hospital capacity rapidly was exceeded and our fatalities rose.

When I ran it again with the infection rate halved (possibly due to social distancing and mask wearing?), the hospital capacity was never exceeded and the fatalities stayed very low.

#### Expectations

- Upon clicking the ![green flag button](../images/snap-icons/green-flag-button.png#inline), `initial population` sprites should be created
- Once created the sprites should wander randomly around the stage
- Some number of sprites should become sick at the start of the simulation
- When a sick sprite touches a healthy one, the healthy one should potentially become sick as determined by the `infection rate`
- After a random interval, sick sprites should either get better or die based on the `fatality rate`
- When the hospital is over capacity (more sick people then beds) the fatality is multiplied by 5
- A running tally of the number of deaths should be maintained
- Sprites should wear costumes appropriate to their health status

## Submitting

Share the project using the instructions from [exercise 1](./exercise01).

Visit the [assignment page](https://middlebury.instructure.com/courses/10245/assignments/171031) on Canvas to submit the URL.
