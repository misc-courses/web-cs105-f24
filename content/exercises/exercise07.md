---
title: "CS 105 - Exercise Seven"
date: "2024-10-14"
due: "2024-10-16T11:15"
name: "Exercise 07"
published: true
---

#### Goals

- Get practice responding to user input
- Get some more practice with lists

## Objective

Our goal is to simulate a conversation with the sprite. It will ask us questions, wait for our response and then make a comment.

## User interaction

As a refresher, we have five blocks of interacting directly with the user.

To communicate information to the user, we have been using the ![say block](../images/snap-blocks/say.png#inline) and ![say for block](../images/snap-blocks/say-for.png#inline) blocks. These do the same thing, except that the ![say for block](../images/snap-blocks/say-for.png#inline) clears the speech bubble after a set interval.

The speech bubble is replaced when you say something new, so to clear a speech bubble made with ![say block](../images/snap-blocks/say.png#inline), you just need to say something new, or use the ![say block](../images/snap-blocks/say.png#inline) block with no input.

We have not used the ![think block](../images/snap-blocks/think.png#inline) and ![think for block](../images/snap-blocks/think-for.png#inline) blocks, but they do the same thing except they use think bubbles instead of speech bubbles.

I introduced you to the fifth block in the Text lecture -- the ![ask block](../images/snap-blocks/ask.png#inline), which you will find in the Sensing palette. This "says" whatever you pass in as input, and then provides a place for the user to type an answer. The script will pause until the user provides an answer, so you can assume that there is an answer by the time the next block executes.

The user's answer? That will be stored in ![answer variable](../images/snap-blocks/answer.png#inline).

## A simple greeting

Let's start by duplicating what I showed you in class as a warm up.

Create a short script to say hello to the user.

It should start by saying "hello" to the user. After a second or two, it should ask "What is your name?".

Then, the sprite should say "Nice to meet you _name_", where _name_ is the name the user provided. In order to combine the text "Nice to meet you " and the response stored in ![answer variable](../images/snap-blocks/answer.png#inline), you should make use of the ![join block](../images/snap-blocks/join-text.png#inline) (which hopefully you will recall can be used to glue two pieces of text together to make one bigger one).

Click the script and introduce yourself.

## Question time!

Now, it is time to make the sprite a little chatty.

Create a new variable called `questions`. It can be at the sprite level.

Use the ![set block](../images/snap-blocks/set-variable.png#inline) to set `questions` to equal a list. Load the list with a couple of questions. They could be things like "What is your favorite color?", or "How are you doing today?". Be creative, write at least four of them.

To get the sprite to ask the questions, use a ![for each block](../images/snap-blocks/for-each.png#inline). Using ![ask block](../images/snap-blocks/ask.png#inline).

Click the script, and it should ask you a series of questions.

## Answer time!

As conversations go, this seems a little one sided. Let's make the sprite even chattier. After the user responds to each question, the sprite should have some response.

Come up with a response for each one of your questions. They don't make use of the user's responses, but it is more fun if it seems like they do. So, for example, if the questions are ("What is your favorite color?", "Which instrument is your favorite?"), the responses could be ("That's mine too!", "Really? I am not that much of a fan, honestly").

Your script should now use an additional ![say for block](../images/snap-blocks/say-for.png#inline) so that after the user responds to each question, the sprite says the respective response.

The challenge is to figure out how to implement this so that the questions and response are associated.

There are two basic approaches we could take to this:

### Use the position within the list (_Don't_ use this one)

A reasonable solution (which I don't want you to use) would be to create a second list, where the question and corresponding response both have the same location within their respective lists.

You could then switch the loop to use a ![for block](../images/snap-blocks/for-i.png#inline). Now, rather than visiting each question, you visit the _location_ of each question in the list. You would need to make use of a ![length block](../images/snap-blocks/length.png#inline) to control the loop, and an ![item block](../images/snap-blocks/item.png#inline) to retrieve each question out of the list, but the beauty of this solution is that you can use the same location to look things up in _both_ lists.

But you aren't going to do that.

### Store lists in your list (_Do_ use this one)

As I discussed in the lists lecture, a powerful aspect of lists is that we can put other lists inside to create more complex _data structures_.

In this case, I would like you to return to your `questions` list and replace every entry with a new ![list block](../images/snap-blocks/list.png#inline). Click the little black arrow on the blank list so you have two open inputs. Then put your question in the first input and then the response in the second one.

When you are done you should have a list of two element lists.

Here is a simplified example of what this might look like:

![list of lists example](../images/exercises/exercise08/list-of-lists.png)

If you show the variable on the stage, you will see that it no longer looks like a list -- it looks like a table, with each sub array as a separate row:

![table view of the data](../images/exercises/exercise08/table-view.png)

If you right click on the table you can chose 'list view' and see what this looks like with the list view that we have seen before:

![list view of the data](../images/exercises/exercise08/list-view.png)

Either view takes up a lot of room, so you probably want to hide it, but I want you to feel comfortable with this idea of nested lists/tables. We are going to work with some data going forward and it will be useful to have this mental model.

Returning to the problem at hand, if you leave your script as is, you will find that the `item` variable from the loop now gives you an entire row. You should be able to extract the question and the response from this using ![item block](../images/snap-blocks/item.png#inline) reporters.

### Put it all together

Combine everything together so that when the ![green flag](../images/snap-icons/green-flag-button.png#inline) is pressed, the sprite greets you and learns your name, and then asks you the questions, making some remark after you answer each one.

Finally, I would like the session to end by the sprite saying "Well, it was nice chatting with you _name_", where _name_ is the name of the user. This seems very straightforward, until you realize that ![answer variable](../images/snap-blocks/answer.png#inline) now contains the response to the last question...

Create a new variable to store the name and save it right after you learn it form the user. _Now_, the final step should be pretty straightforward.

#### What I will be looking for

- When I click the ![green flag](../images/snap-icons/green-flag-button.png#inline), the sprite should say hello and ask my name
- After asking my name, the sprite should greet me again by name
- The sprite should ask a series of questions (at least 4)
- Following each question, the sprite should make some comment about my answer
- Finally, it should say "Well, it was nice chatting with you _name_", where _name_ is the name I typed in at the start
- Internally, the questions and responses should be stored in a single list

## Submitting

Save the exercise using the instructions in the [Submission Guidelines](../resources/submissions).

Visit the [exercise page](https://middlebury.instructure.com/courses/15553/assignments/289632) on Canvas to submit your work.
