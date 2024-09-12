---
title: "CS 105 - Assignment Seven"
date: "2022-04-20"
due: "2022-04-27T23:59:00"
name: "Assignment 07"
published: false
---

#### Goals

- Gain some more experience manipulating images at a pixel level
- Work with multiple sprites to achieve some interesting effects

## Prerequisite

For this assignment, you will need my [starter project](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22A07%20-%20starter). Open the link and then save to make your own copy.

## Sepiatone

I would like you to make a new block: ![sepiatone block](../images/assignments/assignment07/sepiatone.png#inline)

The block should take in the pixels of an image and return a new list of pixels that have been converted to "sepiatone".

Sepia is a very common photo filter — just about every photo editor has some variant of it. This mimics the effect of an old chemical process that left black and white images yellowish in appearance.

![example of a sepiatone image](../images/assignments/assignment07/sepia-example.png)

We can do this by creating a grayscale image, and then adjusting the red and blue channels to give it a yellowish tint. If we just add some yellow to everything, however, it doesn't look very good. So we are going to treat the high values, low values and mid values separately.

The process works like this. First calculate the luminance (average brightness) of the pixels as you did to create the ![grayscale block](../images/exercises/exercise11/grayscale.png#inline) in [exercise 11](../exercises/exercise11). If we just use this luminance value for all three channels, we will get the grayscale image you already created. Instead, create a new red value by multiplying the luminance by the appropriate factor below. Do the same to create a new blue value. The green channel can take the raw luminance value. So, for example, if we have a luminance of 130, you create a new color with (130 x 1.15, 130, 130 x .85) = (149,130,110). If you had a luminance of 50, your color would be (55, 50, 45).

| type       | range of values | red weight | blue weight |
| ---------- | --------------- | ---------- | ----------- |
| shadow     | 0-62            | 1.1        | 0.9         |
| mids       | 63-192          | 1.15       | 0.85        |
| highlights | 193-255         | 1.08       | 0.93        |

Start like we did in the exercise, and make a ![sepiatone pixel block](../images/assignments/assignment07/sepiatone-pixel.png#inline).

Then use that block inside of your ![sepiatone block](../images/assignments/assignment07/sepiatone.png#inline).

### Expectations

- Two blocks: ![sepiatone block](../images/assignments/assignment07/sepiatone.png#inline) and ![sepiatone pixel block](../images/assignments/assignment07/sepiatone-pixel.png#inline)
- The ![sepiatone pixel block](../images/assignments/assignment07/sepiatone-pixel.png#inline) should convert one pixel to sepia using the conversion factors given above
- The ![sepiatone block](../images/assignments/assignment07/sepiatone.png#inline) should convert an entire image to sepia

## Impressionism

For the second part of the assignment, you are going to make an impressionistic painting that looks like you are looking through a frosty window.

![frosty window example](../images/assignments/assignment07/frost.png)

This will be a very different process than what we have done with images so far. We are going to combine images with some of the pen drawing that we were doing before.

You will see that there is a Sprite called "Painter". Click on it to edit its scripts.

The painter sprite is going to randomly run around the screen drawing short lines pointing in random directions. The color of the line will be determined by the color of the image at the place where the sprite starts.

The basic algorithm goes like this:

- move to a random position
- set the color of the pen to the color of the image where the sprite is
- put the pen down
- turn by some random amount
- move forward
- pick the pen up

This should all be put in a ![forever block](../images/snap-blocks/forever.png#inline)
so the painter will eventually visit all of the screen.

### Details

You need two blocks to make this work.

The first is ![at block](../images/snap-blocks/at.png#inline), from the Sensing palette. Set the first input to R-G-B-A and the second to 'myself'. This will read the color found directly under the tip of the sprite. Try it out first. Drag the sprite around the stage and then click on the block to see what color is there.

The second is the ![set pen color with RGB](../images/snap-blocks/set-pen-rgb.png#inline). This comes from the 'Colors and Crayons' library. You will need to import this to add it to the Pen palette.

Once you have this script assembled, you may notice that it is running around very busily, but you can't see anything. Return to the first sprite and pull out the ![set effect block](../images/snap-blocks/set-effect.png#inline). Use it to set the ghost effect of the sprite to 100 (effectively making it invisible). Curiously, since you only hid the image using the ghost effect, the sensor will still be able to see the color of the image.

Once this is working, play around and set the pen size and line length to values you find pleasing.

### Expectations

- There should be a script in the Painter sprite that performs random drawing
- The random drawing should use the color of an image to create an impressionistic version

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [assignment page](https://middlebury.instructure.com/courses/10245/assignments/170538) on Canvas to submit the URL.
