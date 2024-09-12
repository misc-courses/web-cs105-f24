---
title: "CS 105 - Exercise Seven"
date: "2022-03-14"
due: "2022-03-18T11:15"
name: "Exercise 07"
published: false
---

#### Goals

- Learn a classic algorithm
- Learn some techniques for manipulating text
- Get an introduction to working with _lists_

## Objective

Breaking codes played a big role in the birth of computers. We are going to use some simple encryption to learn about working with lists and text.

The code we are going to implement is called the [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher). Caesar apparently used this to hide his messages, but in all honesty, it isn't the strongest code. Okay -- it is so weak that it isn't really considered a code any more... But it is a good start for us.

The idea is that apply a constant offset to every letter in the message. Do, for example, if we chose a right shift of 3, "don't panic" will be transformed into "grq'w sdqif". Decoding is pretty easy, we just need to apply the shift in the opposite direction.

In order to do this, we are going to need to learn a little bit about how to work with text and lists in Snap!

## Text

In the video lecture, I introduced you to text. What I didn't tell you is that computers can _actually_ only store and work with numbers.

<hidden-block message="Actually, this is just a convenient lie...">

Okay, the reality is that this is a lie. The computer can store **bits**. However, the idea that computers only store numbers is a convenient fiction. You can skip this explanation if you are happy with the fiction.

Bits only have two values, which we will frequently interpret as 0 or 1. All data in the computer is stored as blocks of bits. We attach meaning to the patterns of bits. The most convenient meaning we can attach is that they represent numeric values in base 2. So, if I have a block of eight bits that looks like 00101010, I can read that as a base-two number, which has the value 42 in base-ten (i.e., our usual number system).

We can actually store all kinds of information -- we just have to write our programs to interpret patterns of bits as different things. We can store text, images, sound, whatever you like. However, talking about bit patterns becomes cumbersome fast. So, we will use numbers to stand in for the patterns. I can write "42" and mean "00101010". This is embedded in our programming languages so that is _seems_ like all the computer can store is numbers.

</hidden-block>

If this is true, how do we get text?

If we want to work with something non-numeric, like the letter "A", we could pick a number, like 1, and say, "when you see the number 1, show me an 'A'" (_for historical purposes, we will actually map "A" to the value 65, but that is just a detail..._).

We also need to have a common system (i.e., a _standard_) so that when I write these web pages, your computer interprets the collection of numbers the same way and you can read what I wrote. There are a couple of different standards (the programs on your computer figure out which to use based on context and other information that might have come with the text).

By and large, the system you will encounter these days is called **unicode**.

The details of unicode are not terribly important right now -- all you really need to know is that it provides a mapping from numbers to text characters. I say "text characters" because it includes everything that you could include in a block of text: letters, punctuation, digits, even emoji (&#x1F632).

### Unicode and Snap!

In the Operators palette, you will find two blocks: ![letter to unicode block](../images/snap-blocks/unicode-of.png#inline) and ![unicode to letter block](../images/snap-blocks/unicode-as.png#inline). The first will report the unicode value of a character, and the second will report the letter of a particular unicode value.

Drag these out into your script area and give them a try.

## Encode

Okay, now we are ready to encode some text with the Caesar cipher. We are going to do a fixed right shift of three characters (e.g., 'A' will become 'D', 'S' will become 'V', etc... ).

Create a new block ![encode block](../images/exercises/exercise07/encode.png#inline) that takes a single input. note that the extra wide input is because I set it to be a text input. In the block editor, click the input name. In the dialog box that appears, click the black triangle on the right which gives you the expanded input types. You will find Text in the center column of options.

Our algorithm will be as follows

- split the input text into a list (put this in a variable so we can use it later)
- iterate over each letter of the text
  - convert the letter to unicode
  - add 3 to the value
  - convert the result back to a letter
  - replace the old letter with the new shifted letter in the list
- join all of the converted letters together into a single text
- report the text

Use the following blocks:

![add block](../images/snap-blocks/add.png)
![for i block](../images/snap-blocks/for-i.png)
![item block](../images/snap-blocks/item.png)
![join text block](../images/snap-blocks/join-text.png)
![length block](../images/snap-blocks/length.png)
![replace item block](../images/snap-blocks/replace-item.png)
![report item block](../images/snap-blocks/report.png)
![script variables block](../images/snap-blocks/script-variables.png)
![set variable block](../images/snap-blocks/set-variable.png)
![split text block](../images/snap-blocks/split-text.png)
![unicode as block](../images/snap-blocks/unicode-as.png)
![unicode of block](../images/snap-blocks/unicode-of.png)

Note that I included some blocks in there that you have not used and I have not discussed. (I think you can figure out how they work...).

Build up to the encode block. Start small. For instance, convert a single letter to unicode, shift it and convert it back to text. This will be an important building block.

## Decode

Once you have encode working, you should create a new block to decode messages as well. However, once you have encoding working, decoding is trivial. Decoding just means shifting every letter back to the left by the same amount.

Duplicate ![encode block](../images/exercises/exercise07/encode.png#inline) and rename it decode. Then just switch the direction of the shift.

Test it out by using ![encode block](../images/exercises/exercise07/encode.png#inline) as an input to ![decode block](../images/exercises/exercise07/decode.png#inline). The combination should report back the original text (which admittedly, while correct, does seem a little anti-climatic).

#### What I will be looking for

- There should be an ![encode block](../images/exercises/exercise07/encode.png#inline) that shifts the letters of the input text by three characters to the right.
- The block should use the blocks specified above
- There should be a ![decode block](../images/exercises/exercise07/decode.png#inline) which reverses the shift of ![encode block](../images/exercises/exercise07/encode.png#inline).

## Submitting

Share the project using the instructions from [exercise 1](exercise01).

Visit the [exercise page](https://middlebury.instructure.com/courses/10245/assignments/167957) on Canvas to submit the URL.

---

# Challenge

_Challenges are a completely optional way to get some more practice. There is a place to keep track of them on Canvas just so you have a quick way to revisit the work you have done. While they frequently build on the work you have done, I would like you to keep challenge work separate so we can evaluate your original work. Use the 'Save as...' menu item in the ![file button](../images/snap-icons/file-button.png) menu to create a copy of your work._

There are two major things that we could do to improve the encoder. These aren't required, but they would be good practice (and might come up again some time).

First, we could make the shift an input. Of course, if we do that, we won't need a separate decoder (why not?).

Second, the result would look nicer if the only things that were converted were letters, and all of the spaces, punctuations, and other characters were left alone (it would look nicer, but also be even easier to decode...). This is a little tricker, because we also need to wrap around (e.g., when we shift 'Z', it should map to 'C'), and we need to handle upper and lowercase separately.

The secret to this modification is that (a) we can compare characters using the normal comparison operators (it is the underlying numerical representation that is used for comparing), and (b) once we have converted letters to unicode, they are numbers and can be used for math (e.g., you could subtract the unicode of 'A' to figure out how many characters from the start of the alphabet a particular capital letter was).

#### What I will be looking for

- An encode block that takes a second input that determines the shift
- When the message is shifted, _only_ the letters are affected.

Once this is working , **share** the project and submit it on [Canvas](https://middlebury.instructure.com/courses/10245/assignments/169088).
