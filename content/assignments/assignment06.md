---
title: "CS 105 - Assignment Six"
date: "2022-04-11"
due: "2022-04-18T23:59:00"
name: "Assignment 06"
published: false
---

#### Goals

- Demonstrate your ability to manipulate tabular data and lists
- Demonstrate your understanding of visualizations by making a line graph

## Prerequsite

I have provided a [starter file](https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=S22A06%20line%20graph%20%5Bstarter%5D) for you. Start by opening it up and then saving so you have your own version of it.

## Challenge

In lecture I talked about a couple of different visualization types, and then we had an exercise to build a bar chart. For this assignment I would like you to make a simplistic line graph.

Specifically, we are going to make a graph of the reported Covid cases in the US from March 17, 2020 through April 10, 2022 (the starting place was chosen because that was apparently the first day that all states had reported at least one case). The data comes to us from the [New York Times Covid data collection](https://github.com/nytimes/covid-19-data).

If you open up the data, you will see that there are 5 columns.

- The first is the date in YYY-MM-DD format
- The second is the name of the state or territory
- The third is the FIPS identifier for the state or territory (you can safely ignore this)
- The fourth is the cumulative number of reported cases
- The fifth is the cumulative number of reported deaths

We will only be using the name of the state and the number of reported cases. We are making a time series graph, so technically we are using the date as well, but we are taking advantage of the fact that we have daily data for every single state and territory so we don't need to actually look at the dates as long as the data is in order (which it already is).

Or goal is to produce a graph like this one, which compares the rise in cases for Vermont (blue line) and South Dakota (red line). Why these two? They are states with similar populations sizes (South Dakota is a little bigger, but more sparsely populated), but dissimilar approaches to handling the pandemic.

![Line graph of Vermont and South Dakota](../images/assignments/assignment06/line-graph-example.png)

Notice that this is a more primitive looking graph than the bar charts we made in the exercise (I decided not to complicate things with labels). However, even in its simple form, we still have enough to be able to make rough comparisons. The other thing to notice is that the lines always rise. This is because this data set has collected cumulative data rather than active cases. So, the plateaus are when the active cases are falling.

## Big picture

If you poke around a little more in the starter project, you will find that I have created a collection of custom blocks for you including the ![compare two states block](../images/assignments/assignment06/compare.png#inline) you should see in the Script area.

I decided to give you the overall structure and have you focus on implementing the details. You should not need to actually edit the ![compare two states block](../images/assignments/assignment06/compare.png#inline), but we will take a moment to walk through the basic idea of what it does so go ahead and open up to follow along.

The first section of the code

![variable creation](../images/assignments/assignment06/compare-variables.png)

creates a collection of variables:

| name           | use                                                                       |
| -------------- | ------------------------------------------------------------------------- |
| `state 1 data` | this will store the rows of data for the first state                      |
| `state 2 data` | this will store the rows of data for the second state                     |
| `width`        | the width of the graph                                                    |
| `height`       | the height of the graph                                                   |
| `x scale`      | the scaling factor to be applied to all X values so they fit on the graph |
| `y scale`      | the scaling factor to be applied to all Y values so they fit on the graph |
| `x`            | the X coordinate of the lower left hand corner of the graph               |
| `y`            | the Y coordinate of the lower left hand corner of the graph               |

and initializes the location and dimensions of the graph to some sensible values.

The second section of the code

![building the datasets](../images/assignments/assignment06/compare-series.png)

initializes `state 1 data` and `state 2 data`. You will implement the ![series data block](../images/assignments/assignment06/series-data.png#inline). This block will take in the name of a state and report back the rows of data in `covid-data` that correspond to that state.

The third section

![setting the scale factors](../images/assignments/assignment06/compare-scales.png)

is probably the most difficult from a conceptual standpoint. The challenge here is similar to what we did back in [exercise 05](../exercises/exercise05) when we mapped the range of possible color hues to the locations on the stage. The problem here is to get the points we are drawing to stay within the confines of the graph while making the most of the available space. As an example, in the graph I showed above, the number of cases in South Dakota as of 2022-04-10 was 237,246. The height of the graph is 200. We need a scaling factor that will mean that a value of 237,246 ends up at 200, while a value of 0 ends up at 0. In this case, that scaling factor would be $\frac{200}{237246} = 0.000843$. I will provide more details below.

Finally, in the fourth section

![draw the plot](../images/assignments/assignment06/compare-draw.png)

we get to the actual drawing part. I provided the code to draw the axis, while you will be responsible for drawing the actual lines. Note how we are reusing the ![line drawing block](../images/assignments/assignment06/draw-line-for-series.png#inline) so you only need to figure out how to do it once (this is that power of abstraction again).

That is the big picture. There are details below.

## Some advice

My advice is a repetition of what I told you in class. It is good to have the overall picture in your mind, but I want you to practice thinking in terms of creating building blocks and thinking small. When you are trying to accomplish a task, break it down into steps and then focus on just one step at a time. Test as you go. Make sure each piece works before you integrate it.

## Part 1: Extract state data

The first block to tackle is ![series data block](../images/assignments/assignment06/series-data.png#inline).

This block takes in the name of a state or territory and should report back all rows from `covid-dataset` referring to the specified state or territory.

## Part 2: Calculate the X scaling factor

The next block is ![calculate the X scale block](../images/assignments/assignment06/x-scale.png#inline), which is responsible for calculating the scaling factor for the X axis.

Since the data is in order and each data point is separated by the same interval of time (one day) we can ignore the actual dates on the data and just draw our points at even intervals. The goal with our X scaling factor is that when we are on the first record, we should be on the far left of the graph and when we are on the last record we should be on the far right.

For example, imagine we have a graph that is 400 wide and we have five data points. If they are equally spread across the graph, then each one will be separated by 100, so the scaling factor will be 100 (e.g., sample 1 will be at 1x100, and sample 3 will be at 3x300, etc...).

![diagram of the x scale](../images/assignments/assignment06/x-scale-diagram.png)

_This overlooks an important point -- our first sample is sample 1, and we want that at 0. ordinarily I would be concerned about this, but we will have **many** more samples than space along the axis, so our scaling factor will be a fraction less than 1, so the location will come out to be the same for the first few samples._

_As a follow on to that point, don't be concerned that you have a fractional scaling factor. When it comes time to draw, the sprite will end up plotting a lot of data points to the same place on the screen. This is okay and expected. If the scaling factor is set correctly, then we will fill the space regardless._

## Part 3: Calculate the Y scaling factor.

Once you have ![calculate the X scale block](../images/assignments/assignment06/x-scale.png#inline) complete, it is time to fill in ![calculate the Y scale block](../images/assignments/assignment06/y-scale.png#inline)

This one has the same goal as the previous block, but it is a little trickier. For ![calculate the X scale block](../images/assignments/assignment06/x-scale.png#inline) you could just look at the number of samples. For this block, you have to actually look at the values.

What you are looking for is something that maps the range of possible Y values to the available height of the graph. The range doesn't necessarily start at 0, so you need to find both the minimum and maximum values, and the difference between those is size of the range.

For example, let's say we have these data items: [5, 2, 8, 6, 14]. The minimum of this list is 2 and the maximum is 14, so the difference is 12. If the graph is 100 high, then the scaling factor is $\frac{100}{12} = 8.33$ (_again, we should be worrying about subtracting out the minimum value to put it at zero, but with our fractional scaling factor, that won't be visible_).

To help you out, I've provided you with blocks that can find the minimum and maximum of the values in a list as well as the minimum and maximum of two individual values. You will find those in the Operators palette.

**Important** We need to fit both lines in the graph, so the scaling factor needs to take both data series into consideration (the minimum and maximum could be in different series).

## Part 4: Draw the line

The final implementation that need to flesh out is for ![draw line for series](../images/assignments/assignment06/draw-line-for-series.png#inline), which will draw your line.

This block should iterate through all of the rows of data for the series, drawing the line as it moves from point to point.

Remember to use the scaling factors to scale both the `X` and `Y` values of the points. The other thing to bear in mind is that the origin of the graph is not at the Snap! origin. You will need to adjust your points so that the lines start at the graph origin.

There are a lot of points to plot, and it can get a little slow. If you are tired of waiting, you can make use of the ![warp block](../images/snap-blocks/warp.png#inline). If you wrap the ![warp block](../images/snap-blocks/warp.png#inline) around some code, it does all of its drawing in the background, which is much faster, and then reveals the final drawing at the end. You will find that in the Control palette.

## Part 5: Play

Once you have the comparator working. Try out some different states to see how the impact differs. bear in mind that we have no visible scale and some state have very different population sizes, so you won't be able to do that most detailed comparison, but you should start to see some trends.

## Expectations

- The ![series data block](../images/assignments/assignment06/series-data.png#inline) should correctly filter out a state or territory based on its name

- ![calculate the X scale block](../images/assignments/assignment06/x-scale.png#inline) should correctly calculate the required scale factor given a width and two collections of data items.
- ![calculate the Y scale block](../images/assignments/assignment06/y-scale.png#inline) should correctly calculate the required scale factor given a height and two collections of data items.
- The ![draw line for series](../images/assignments/assignment06/draw-line-for-series.png#inline) should draw a line appropriately shifted and scaled

## Reflection

I would like you to write a short reflection about your process of completing the assignment. The reflection should be embedded in your project as a comment. To make a comment, right click in the script area of the Snap! editor. A context menu should pop up and give you the option to 'add comment'. Create a separate comment for each piece of the assignment.

Each reflection should contain the following things:

- If the block or script currently doesn't work, a description of what is not working and what you have tried to do to fix it
- If the block or script is working, a description of what was the hardest part to accomplish
- A description of what help you received to accomplish each piece
- A description of what you learned
- Your assessment of your ability to repeat this work later completely independently

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [assignment page](https://middlebury.instructure.com/courses/10245/assignments/169971) on Canvas to submit the URL.
