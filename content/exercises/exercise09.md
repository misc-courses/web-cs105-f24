---
title: "CS 105 - Exercise Nine"
date: "2022-04-04"
due: "2022-04-11T11:15"
name: "Exercise 09"
published: false
---

#### Goals

- Gain some experience working with tabular data and high-order blocks

## Prerequisites

I have provided you with a [starter project](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22E09%20-%20data%20summary) for this assignment. The project contains an imported CSV file (the same one we played with in class) and the final implementation for `average` that we came up with in class.

## Objective

In this exercise we are going to build a tool to help us summarize information from data stored in a CSV file.

## Find the minimum of a list

In class, we found the average of a list of numbers, now I want you to find the smallest value in a list, and create a new block ![minimum block](../images/exercises/exercise09/minimum.png#inline).

The most straightforward way to do this is to loop through the list, look at each item, keeping the smallest one we have found so far. We might do that with the following algorithm:

- create a new variable `smallest`
- set `smallest` to the first value in the list (think of it as "the smallest we have seen so far")
- for each item in the list:
  - if the current value is less than `smallest`, set `smallest` equal to the current value

Hopefully you could code that up without much difficulty at this point.

However, in class, we found the average of a list, using the ![combine block](../images/snap-blocks/combine.png#inline).

![average block contents](../images/exercises/exercise09/average-script.png)

Recall that the block in the grey ring is being applied to the elements of the input list. With the ![combine block](../images/snap-blocks/combine.png#inline), we expect there to be _two_ open inputs in the "ringed" block, one for the running total that will be returned at the end, and one for the current item of the list.

What we want to do now is create a similar block that finds the smallest value in the list.

We are going to follow the same algorithm that I laid out above, but we don't need a new `smallest` variable -- the [combine block](../images/snap-blocks/combine.png#inline) will keep track of the running value for us internally. All we need to handle is the last line of the algorithm -- check if the current item is less than the running value, and return it if it is, or else return the running value if it isn't.

Our not-so-secret weapon here is the ![if reporter ](../images/snap-blocks/if-reporter.png#inline). This block is a reporter that reports different values based on the input predicate. If you haven't played with it before, play around with it a little bit before you use it in your script until you understand how it works.

One issue that you will have is that [combine block](../images/snap-blocks/combine.png#inline) is expecting two open inputs, and you should now have four (two in the predicate plus the two outputs). To make this easier to read and understand, click the little black arrow on the gray ring twice. This will reveal two variables corresponding to the running total and the current item (helpfully named `#1` and `#2`). Use these in the ringed block instead of leaving blank spaces.

Test your new block out with some lists to make sure it returns the smallest value.

## Find the maximum of a list

Now I would like you to create a new ![maximum block](../images/exercises/exercise09/maximum.png#inline). This will be virtually identical to ![minimum block](../images/exercises/exercise09/minimum.png#inline) with only a minor change required.

## Summarize a field in a table

Now that we have the building blocks, it is time to build our data exploration tool. I would like you to build a block that takes in a table and a column name and reports back the average, the minimum, and the maximum values of the named column. It should return this data as a list of three lists -- each list contains the name of the metric ('average', 'minimum', or 'maximum') in the first position, and the associated value in the second:

![summarize block with result](../images/exercises/exercise09/summarize-result.png)

If the named field doesn't exist in the table, it should return an empty list.

![summarize block with empty result](../images/exercises/exercise09/summarize-result-bad.png)

You algorithm for this will be

- Find the index of the named field in the first row of the table
- If the named field is not found, report the empty list (you will need to remove the blank input in the default [list block](../images/snap-blocks/list.png#inline))
- Extract the column of data using the `map` technique I showed you in class
- use your two new reporters and the ![average block](../images/exercises/exercise09/average.png#inline) I provided to return a list of the specified structure

_I suggest you do this incrementally. First report out the index of the named field and make sure that is working. Then add the check for a bad field name and make sure it returns an empty list. Next, return the data column and make sure you are getting it all (and that your didn't forget to skip the first row where the header is!). Only after all of that is working, start trying to assemble the output._

#### What I will be looking for

- a ![minimum block](../images/exercises/exercise09/minimum.png#inline)
- a ![maximum block](../images/exercises/exercise09/maximum.png#inline)
- a ![summarize block](../images/exercises/exercise09/summarize.png#inline)
- the ![minimum block](../images/exercises/exercise09/minimum.png#inline) should report the smallest value in the list
- the ![maximum block](../images/exercises/exercise09/maximum.png#inline) should report the largest value in the list
- both ![minimum block](../images/exercises/exercise09/minimum.png#inline) and ![maximum block](../images/exercises/exercise09/maximum.png#inline) should make use of [combine block](../images/snap-blocks/combine.png#inline) and ![if reporter ](../images/snap-blocks/if-reporter.png#inline)
- the ![summarize block](../images/exercises/exercise09/summarize.png#inline) should report an empty list if the field doesn't exist
- the ![summarize block](../images/exercises/exercise09/summarize.png#inline) should report a summary list of lists if the field does exist, showing the average, minimum, and maximum values with labels.

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/169150) on Canvas to submit the URL.
