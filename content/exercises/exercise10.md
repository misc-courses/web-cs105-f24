---
title: "CS 105 - Exercise ten"
date: "2022-04-11"
due: "2022-04-15T11:15"
name: "Exercise 10"
published: false
---

#### Goals

- Learn about libraries
- Learn how the bar chart block work
- Get experience making bar charts and histograms

## Prerequisite

There is no starter code for this exercise, so go ahead and visit <https://snap.berkeley.edu/snap/snap.html> and make sure you are logged in.

## Objective

In this exercise, you are going to make a couple of graphs. We will walk through making both a bar chart and a histogram.

## Visualization library

As a reminder, in addition to the standard blocks that we have been using, Snap! includes a collection of specialized blocks that we can add to the palettes which have been grouped into _libraries_, self-contained collections of blocks.

We previously made use of the 'Words and Sentences' library for our Pig Latin assignment. This time, we are going to going to break out the 'Bar charts' library.

In the ![file menu](../images/snap-icons/file-button.png#inline), you will find an option called 'Libraries...'. Select this to bring up the Library dialog.

Select the 'Bar charts' library and click the 'Import' button.

This adds four reporters to the Variable palette, a new command block to the Pen palette and a reporter to the Control palette. We will not use all of these. We will focus on three of them:

- ![plot bar chart block](../images/snap-blocks/bar-chart-plot.png#inline), which draws bar charts
- ![bar chart table](../images/snap-blocks/bar-chart-table.png#inline), which is a helper tool extracting data from a table in preparation for making bar charts
- ![sort table block](../images/snap-blocks/sort-table.png#inline), which will sort the rows of a table based on the values in one of the fields

## Draw a simple bar chart

We will start by drawing a very simple bar chart using ![plot bar chart block](../images/snap-blocks/bar-chart-plot.png#inline).

This block takes five inputs. The first is the data, and then the other four determine where it is placed and the size (the last four have sensible defaults, so we will leave them alone for the time being).

The block expects the data to be a table (list of lists). Each row corresponds to a bar in the chart. In the row, the first column is the label and the second is the data to be plotted. The rows can have more columns, but they will be ignored.

Make yourself a simple list of lists. You can make up the labels and the values. Here is an example.

![example table](../images/exercises/exercise10/simple-list.png)

Plug this into the plotting block like so:

![making the simple chart](../images/exercises/exercise10/simple-chart-block.png)

This will produce a simple bar chart like this one:

![simple bar chart](../images/exercises/exercise10/simple-bar-chart.png)

Walk through the steps to make your own chart.

### Working with real data

Now we are going to bring in some real data.

Visit the CORGIS data site and download the [County Demographics data](https://think.cs.vt.edu/corgis/csv/county_demographics/). Load it into Snap! by dragging the file onto the stage.

This dataset has demographic information for every county with a population above 5,000. We _could_ make a bar chart of any one of these demographics looking at how each county stacks up... but there are 1878 counties in the dataset. That is more than the number of pixels we have available on the stage.

#### Aggregating data

This is where the ![bar chart table](../images/snap-blocks/bar-chart-table.png#inline) block comes in. It has a horrible name, but it is really is an _aggregation_ tool. You provide it with a table and a column to aggregate by and it will combine all rows with the same value in the given column (for the moment we can ignore the last three inputs to the block).

The output is a list of lists where each row has three values:

- the first column is the shared aggregation value
- the second column is the number of rows that were combined
- the third column is a list of all of the rows that were aggregated

For example, imagine you have the following table:

![example table with repeating values](../images/exercises/exercise10/example.png)

If we group by the first column (the letters), we get this:

![aggregated table](../images/exercises/exercise10/example-aggregated.png)

The third column for the A row looks like this:

![third column data](../images/exercises/exercise10/example-col3.png)

_Note: the ![group by table](../images/snap-blocks/group-by.png#inline) block also will do this aggregation for us. However, the ![bar chart table](../images/snap-blocks/bar-chart-table.png#inline) will work better for us when we want to build histograms so we will just stick with that one._.

#### Make the chart

Let's try it out with real data. Pull out the ![bar chart table](../images/snap-blocks/bar-chart-table.png#inline), and load in `county_demographics`. _Don't forget about ![all but first block](../images/snap-blocks/all-but-first.png#inline) to remove the header!_

Group by the state (column 2). If you look at the result, you will see that it has a row for every state, and the count tells you how many counties there are in the state.

Let's compare them -- put this new table into the ![plot bar chart block](../images/snap-blocks/bar-chart-plot.png#inline) and graph it.

You should see that we have quite a diversity in the number of counties (as you might expect). Texas has the most counties (as we might expect). The number two is perhaps a little more surprising. It gets a little harder to tell what the next few are.

#### Re-ordering for insight

We can make this easier if we re-order the columns by the number of counties.

Another of the blocks that we imported with this library was the ![sort table block](../images/snap-blocks/sort-table.png#inline). As mentioned above, this block re-orders a table based on a particular column. Put your aggregated data into this block, and sort by the second column before plotting. You should now see the bars are sorted by size.

Now it is easy to see which states have the most counties and which have fewer. Any surprises?

## Histograms

As I told you in the lectures, histograms and bar charts are closely related, at least in structure. It should come as no surprise that we can build a histogram using the tools we already have.

Recall that a histogram shows us a _distribution_ of the data. We take the data and break it up into _buckets_ or _bins_ and then we count up how many items fall into each bin.

As it turns out, this is what the remaining inputs to ![bar chart table](../images/snap-blocks/bar-chart-table.png#inline) are for.

When the field we pass in for aggregation is text, we get the behavior that we have been working with (every unique value is a row in the output table). However, when the field contains numbers, it is usually less useful to think of the values distinctly. This is where the last inputs to the block come in. If we set the `interval`, it will create buckets for our values. For example, if we were aggregating grades again, I might set an interval of 5 to create buckets for groups of every five values (e.g., 80-85, 85-90, 90-95, etc...). We can also set the `from` and `to` inputs to limit the range of values we are considering. For grades we would set the `from` and `to` to 0 to 100.

### Let's try it out

This time, let's look at education level, specifically, the "Bachelor's Degree or Higher" demographic (column 6).

Aggregate `county_demographics` by column 6, and setup the bins so they cover the range between 0 and 70, with a bin size of 5.

Plot the result.

You should see something like this:

![example histogram](../images/exercises/exercise10/histogram.png)

From this we can see that the average percentage of the population per county is around 20%, but with a long tail up to 60% (which, after the lecture, you should suspect to be in DC).

Experiment with different bin sizes and see how it affects the shape of the data.

## What I will be looking for

- I would like you to submit at least three charts.
  1. the simple bar chart with made up data
  1. the plot of the number of counties per state, sorted
  1. the histogram of education levels at the county level
- Each chart should have a ![clear block](../images/snap-blocks/clear.png#inline) on top, so we can just click each chart in turn and see what they do
- Each chart should have a comment attached to it, describing which one it is
- The script area should be neat (use the 'clean up' option from the script area context menu)

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/170063) on Canvas to submit the URL.
