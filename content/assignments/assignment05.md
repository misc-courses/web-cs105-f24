---
title: "CS 105 - Assignment Five"
date: "2024-10-23"
due: "2024-10-30T09:15:00"
name: "Assignment 05"
published: true
---

#### Goals

- Develop your ability to work with tabular data and lists

## Challenge

This week we have been looking at tabular data and figuring out how to extract dat out of it in different ways. For this assignment, we are going to try to answer a question: What is the wettest month in Seattle?

I have given you a [starter Snap! file](<https://snap.berkeley.edu/snap/snap.html#present:Username=christopherandrews&ProjectName=F24A05-weather%20(starter)>). It is preloaded with the daily rainfall from 1948 until 2017 (data from [Did it rain in Seattle](https://www.kaggle.com/datasets/rtatman/did-it-rain-in-seattle-19482017?resource=download)). If you look at the first row of the data, you can see we have five rows: `DATE` (the date in YYYY-MM-DD format), `PRCP` (the amount of precipitation in inches), `TMAX` (the day's high temperature in F), `TMIN` (the day's low temperature in F), and `RAIN` (`TRUE` if it rained and `FALSE` if it didn't).

There are a lot of different ways that you could tackle this problem. However, the totally naive way (looking at every single record one by one and trying to keep track of all of the rainfall for each month) would be ridiculously slow. So, in the interest of speeding things along and scoping what you need to do, I am going to give you some smaller problems to solve so you have some tools, and I am going to scope the problem down a little to answer a related question: Which month was the rainiest for a particular year? Some repeated applications for this block should give us a sense of which months are generally wetter.

## Part 1: Make a block to filter by year

The first tool I would like you to build is a predicate that when given a row of the data and a year will report `true` or `false` based on the date in the record.

The predicate should look like: ![year checking predicate](../images/assignments/assignment05/is-in-year.png#inline). It should take in a list following the format specified above and a year. You should think about where in the list the date is stored, and how you can extract the year once you have the date.

The advantage of having such a block is that it could be applied to a ![keep block](../images/snap-blocks/keep.png#inline) to filter a list down to just the entries that we care about, saving us a lot of work later. _You don't need to do that yet, but it is a reasonable way to test your work._

#### Expectations

- There is a predicate that looks like ![year checking predicate](../images/assignments/assignment05/is-in-year.png#inline)
- Given a row of data following the specified form above and a year, it will report `true` if the date in the data is in the specified year

## Part 2: Make a block to filter by month

The second tool to build is a predicate just like the first, except that it does months.

The predicate should look like ![month checking predicate](../images/assignments/assignment05/is-in-month.png#inline). If you got part 1 working, your solution to this will look very similar.

#### Expectations

- There is a predicate that looks like ![month checking predicate](../images/assignments/assignment05/is-in-month.png#inline)
- Given a row of data following the specified form above and a month, it will report `true` if the date in the data is in the specified month

## Part 3: Find the rainiest month for a particular year

For this step, I would like you to create ![rainiest month block](../images/assignments/assignment05/rainiest-month.png#inline). This block has two inputs: the first should be a year that we are checking, and the second should be the entire Seattle weather data set. The block should report a two element list that has the number of the month in the first cell and the total rainfall in the second. Here is an example of what I would expect for 1997:

![The rainiest month for 1997](../images/assignments/assignment05/rainiest-month-1997.png)

This is telling us that in 1997 the rainiest month was March with 8.15 inches of rain.

My advice is to do the following:

- filter down to just the records for the input year
- iterate through the possible months
- for each month, filter down to just the rows for that month
- sum the rainfall amounts
- check if the amount is the largest, saving the month and the value if it is

There are a lot of moving parts here. Take it slow and check each piece before you move on to the next one. If the higher-order blocks are still hard to understand, you can fall back on loops, but they will be slower.

#### Expectations

- The should be a reporter block that looks like ![rainiest month block](../images/assignments/assignment05/rainiest-month.png#inline)
- The block should report a list with the number of the month in the first cell and the total rainfall for that month in the second
- The returned month and rainfall represent the rainiest month of the input year

## Submitting

You will submit your work through Canvas on the [assignment page](https://middlebury.instructure.com/courses/15553/assignments/289616).

Please see the [submission guidelines](../resources/submissions) for details on how to submit your work.

---

# Challenges

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

## Challenge

My original question was "What is the rainiest month in Seattle?", and our work above only sort of solves that. For this challenge I would like you to create a new block that computes the _average_ rainfall for every month (e.g., sum up the rainfall for each April in the dataset and then average them together to get the average April rainfall) and then uses that to determine which month gets the most rain on average.

Save this challenge with a separate name and submit it [here](https://middlebury.instructure.com/courses/10245/assignments/169515).
