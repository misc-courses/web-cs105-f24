---
title: "CS 105 - Exercise Eleven"
date: "2022-04-18"
due: "2022-04-22T11:15"
name: "Exercise 11"
published: false
---

#### Goals

- Learn how to manipulate images with Snap!
- Learn a little bit about color
- Get more practice with lists and higher-order blocks

## Prerequisite

There is no starter code for this exercise, so go ahead and visit <https://snap.berkeley.edu/snap/snap.html> and make sure you are logged in.

## Objective

Our goal with this exercise is to show you a collection of ways that you can manipulate images at the pixel level (and hopefully learn a little bit about how filters you may have used in the past might work).

I have some tasks for you, but I hope that you take the opportunity to play around a little bit.

## Getting an image

As I showed you during the lecture, we can get images into Snap! very easily by just dragging them into the working area.

There, is, however, a second way -- you can use the camera that you have become somewhat accustomed to staring into at the top of your computer.

Go to the Sensing palette. Pull out ![video capture](../images/snap-blocks/video-capture.png#inline). Click on the predicate input until it shows a green check box. Then click on the block. Your browser should ask for permission to use your camera, and then you should show up on stage.

You will notice that the image is pale -- it is set to be semi-transparent. You can control it with ![video transparency block](../images/snap-blocks/video-transparency.png#inline).

You can turn the video off again by clicking the predicate again so it shows a red check and then clicking the block again.

However, that doesn't get you a picture.

Pull out the ![video on block](../images/snap-blocks/video-on.png#inline). Set the first input to 'snap' and the second to 'stage'.

If you click on it, you will see a little picture pop up in the report bubble.

We want to work with it, so... hopefully you can hear this coming already... we want to save it in a variable. Create a new variable called `pic` and set it to a picture:

![save picture](../images/exercises/exercise11/save-picture.png)

To see what the picture looks like, use ![switch costume](../images/snap-blocks/switch-costume.png#inline) to see the image on the sprite.

The picture data in `pic` is considered to be a "costume". This is essentially a wrapper around the pixel data with some extra information about the dimensions. To get the actual pixels so we can look at them (and manipulate them), we need to use the ![of costume block](../images/snap-blocks/of-costume.png#inline). Change the first input to 'pixels' and load `pic` into the second input.

If you click on this reporter, you will see the long list of pixel data. Remember that while this looks like a table when you display it, it is a list of lists, where the sub-lists are representing single pixels in the image.

To give us data we can more easily work with, we will stick the pixel data in a new variable called `pixels`.

Unfortunately, this will probably create an image that is too big, and you won't be able to save your project to the cloud. What we can do is resize the picture using the ![stretch block](../images/snap-blocks/stretch.png#inline) block. We will shrink the image down to 75%, which should be small enough to not be a problem.

Putting that all together, here is a short script to take an image (provided the camera is on).

![save scaled picture](../images/exercises/exercise11/save-scaled.png)

This grabs the image, shrinks it to 75% of its original size, saves the pixels in `pixels` and then sets the costume to the contents of `pixels`.

Feel free to run this a few times until you get a picture you feel like you can stand looking at for a while. Once you have your image, you can turn off the video capture. Click the little green checkmark so it turns into a red X. Then click the block itself.

## Make the image grayscale

A grayscale image is one in which the pixel value is really just the intensity of the light. Conceptually, we could represent each pixel with a single value. However, when our images have RGB channels, we can achieve the same thing by setting all three channels to the same value. When all three channels are set to the same value, we get a shade of gray.

When we have a color image that we want to convert to grayscale, we need to figure out what value to use.

One way we could do this would be to just pick one color channel and use its value in the other two.

![mapping a single color channel example](../images/exercises/exercise11/map-single-channel.png)

Note that this example isn't using multiplication any more, we are back to using ![map block](../images/snap-blocks/map.png#inline). For each pixel, I am making a new pixel that uses the original pixel's red channel only. So, if the original pixel was `[192, 34, 100, 255]`, the new pixel is now `[192,192,192,255]`.

Try it out. Then try just using the green or just using the blue. They will look different because there are different amounts of red, green, and blue in a color scene.

So, this gives us a grayscale image, but diverges from our perception of how much light was actually shining on the subjects of our pictures. We would like to get closer to the "_luminance_" of the pixels. While there is a formula for the luminance, we are going to keep things simple and just average the values in the three channels together. This at least gets all three channels involved in the output (the reason that this isn't quite the correct solution is because our eyes have different sensitivities to red, green and blue).

### Make a block

Create a new block: ![grayscale pixel block](../images/exercises/exercise11/grayscale-pixel.png#inline).

This block will work only on a single pixel. So, it will expect to be given a list with four numbers in it and it will return a list with four numbers in it.

Inside of the new block, create a new script variable called `avg`. Set it equal to the average of the three color channels.

Report a list of four elements. The first three channels should all be the computed average. The fourth should be the original alpha value.

![grayscale example](../images/exercises/exercise11/grayscale-example.png)

### Apply it to the image

Once the block is working (and not before), create a ![grayscale  block](../images/exercises/exercise11/grayscale.png#inline) block that uses it. This new block should just use ![map block](../images/snap-blocks/map.png#inline) to apply ![grayscale pixel block](../images/exercises/exercise11/grayscale-pixel.png#inline) to the pixels of your image.

Test it out with ![switch costume block](../images/snap-blocks/switch-costume.png#inline) so you can check out your handiwork.

It will take a couple of seconds for the image to be processed.

## Posterize v1

In essence, the process of posterizing is to reduce the number of colors in an image (historically, printing in color was expensive and each color required a separate print run, so the fewer colors the better).

We are going to make two different types of posterization. In this version we are going to just reduce the number of colors, roughly keeping the color scheme the same (which sounds more complicated than it is).

The result will look something like this:

![posterize example](../images/exercises/exercise11/cole-posterized.png)

The process works like this:

- Divide the color channels by 100
- Use ![round block](../images/snap-blocks/round.png#inline) to round the numbers to the nearest integer
- Multiply the color channels by 100

Now every channel will be 0, 100, or 200, which means we now have a total of nine different colors.

Create a new block ![posterize v1 block](../images/exercises/exercise11/posterize-v1.png#inline). Implement the above algorithm and report back a posterized image.

You should not need to work at the pixel level for this one. However, if you are more comfortable following the same pattern of working with a single pixel and then mapping the results over the entire image, you are welcome to (you will need to create a separate helper block for posterizing the single pixel). The advantage of doing so being that you could preserve the alpha channel (just applying the algorithm to the whole image at once will make the alpha channel 0, 100, or 200 as well).

## Posterize v2

While this process works, and gives us an interesting stylized look, we can make the output much more interesting looking.

Another approach to posterizing is to convert the image to grayscale, simplify that image, and then assign whatever colors we like to the different levels.

Thinking about posterization makes me think of the [Obama "Hope" poster](https://en.wikipedia.org/wiki/Barack_Obama_%22Hope%22_poster) by Shepard Fairley. So I borrowed the color scheme.

![posterized portrait](../images/exercises/exercise11/posterized-portrait.png)

### Make a block

Create a new block: ![posterize pixel v2 block](../images/exercises/exercise11/posterize-pixel-v2.png#inline)

You can actually duplicate the ![grayscale pixel block](../images/exercises/exercise11/grayscale-pixel.png#inline) to give you your starting place.

You will start the same way -- compute the average of the three color channels.

However, you won't assemble a new pixel based on that value.

We also don't need to simplify the average value either. Instead, I would like you to think about numeric ranges. For example:

```javascript
if avg < 64
  report color 1
else
  if avg < 128
    report color 2
  else
    ... and so one
```

Notice that these ranges will simplify the color palette by using a single color to represent a collection of values found in the original image.

#### Colors

When you report the color, you just need to report a pixel (list) with your desired color.

To get the "Hope" colors, I used (0,49,79), (187,21,27), (114,151,160), (215,210,170), (255,230,170), and (255,255,255) (in that order). You can use this color scheme, or you can make your own. There are a number of different sites that will help you create color palettes that work together, like [Adobe Color](https://color.adobe.com/create/color-wheel) and [coolors](https://coolors.co) (click the hex string at the bottom of the stripes to get the 0-255 values for the color channels). The requirement is that you should use between four and ten different colors.

#### Map it

Once you have a block that works for a single pixel (test it!), create a ![posterize v2 block](../images/exercises/exercise11/posterize-v2.png#inline) that posterizes the entire image.

#### Tuning the ranges

I would start by evenly dividing the 0-255 range into roughly equal sized bands (e.g., if you want six colors, you could break at 42, 84, 126, etc...). This may look fine, or it may not. You are welcome (encouraged) to tinker with the ranges to achieve a look you like. (Note that while we can match the colors of the "Hope" poster, we won't quite get the same look because there is a lot of image simplification that also happened, which we aren't able to perform computationally here).

## What I will be looking for

- You should have a picture stored in the variable `pic`
- You should produce five new blocks: ![grayscale pixel block](../images/exercises/exercise11/grayscale-pixel.png#inline), ![grayscale block](../images/exercises/exercise11/grayscale.png#inline),![posterize v1 block](../images/exercises/exercise11/posterize-v1.png#inline),![posterize pixel v2 block](../images/exercises/exercise11/posterize-pixel-v2.png#inline), and ![posterize v2 block](../images/exercises/exercise11/posterize-v2.png#inline)
- There should be a script that creates a grayscale image from `pic` and displays it (i.e., it should both use your block for the conversion, but also switch costume to it)
- There should be a script that creates a posterized image (v1) from `pic` and displays it
- There should be a script that creates a posterized image (v2) from `pic` and displays it
- The second posterization should have at least four colors, but no more than ten

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/170545) on Canvas to submit the URL.

_Note: If you were playing around and dragged some extra images in (which would be great!), you may not be able to save your work because there is a cap on the size of projects that are saved on the Snap! servers. Just delete the images from the Costumes tab before saving._
