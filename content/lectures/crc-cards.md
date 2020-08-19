---
path: "/lectures/crc-cards"
title: "CRC Cards"
name: "CRC Cards"
date: "2019-10-15"
published: false
---

# CRC Cards example

CRC (Class Responsibility Collaborator) cards are a simple way to break down the functionality of an application to reason about what the basic entities are (class), what they do (responsibility), and which other entities they need to communicate with (collaborator). 

In addition to the explanation on [Wikipedia](https://en.wikipedia.org/wiki/Class-responsibility-collaboration_card), I also recommend the explanation provided by [www.agilemodeling.com](http://www.agilemodeling.com/artifacts/crcModel.htm), as well as the [HotDraw example](http://c2.com/doc/crc/draw.html).

Every card should be a standard index card, with the name of the class on the top, and the rest of the card split into responsibilities on the left and collaborators on the right. 

![CRC card](http://agilemodeling.com/images/models/crcCardLayout.jpg)

## Example: Adding user rating to FilmExplorer

To provide you with an example, imagine that we were going to add individualized film ratings to FilmExplorer. In other words, instead of the current rating system where any user can change the rating on any film, we will individualize the ratings to be per user. Conceptually the user could then see their rating, as well as the aggregate of the ratings made by others as well. 

The `Film` entity is fairly simple, it just has to "know" some things. It has no real collaborators. Note that we have removed the `rating` property because it is no longer a single rating per film.

![Film entity](images/crc-film.png)

The `User` will represent the user of the system. This entity has a few more responsibilities. Users can log in and out of the system and rate films. In order to support this, the `User` needs to collaborate with an entity that represents those ratings, and an entity that will actually check the user's credentials and provide access. 

![User entity](images/crc-user.png)

We will create a new `UserRating` entity to represent a single rating by a user of a single film. 

![UserRating entity](images/crc-user-rating.png)

Finally, we have a `SessionManager`, which handles authentication and access control. 

![SessionManager entity](images/crc-session.png)

## CRC cards for views

In this example, we just looked at the data entities in the application. CRC cards can also be used to represent the views (React components) of your application once you are ready to start planning the implementation. This is an example of just one entity.

![FilmSummary entity](images/crc-film-view.png)