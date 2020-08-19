---
title: "CS 312 - Practical Ten"
date: "2019-11-14"
dueDate: "2019-11-15 5p"
path: "/practicals/practical10"
template: "assignment"
name: "Practical 10"
published: true
---



In this practical you will add authentication to Simplepedia using Google's Oauth2 implementation. [OAuth](https://en.wikipedia.org/wiki/OAuth) is designed to allow applications to request tokens on behalf of resource owners (users) so they can access those resources. Imagine you had written an application that made use of users' Google data (like their calendar, for example). Users shouldn't trust your app with their account passwords, but if they want to allow the application to have access to their data, they could log into Google through your application and allow your application to access their Google data, and then Google would then give your application a token that could be used to request the account data. 

While principally designed to grant applications access to user's data, we can use it to perform a type of pseudo-authentication where we ask the user to log into the service, but we don't use the token as anything more than proof that user is a valid Google user. There are a couple of reasons for us to do this:

- Getting security right is hard. This is a situation where DIY is not the way to go -- use something tested and trustworthy.
- Middlebury has a "G Suite" domain. In other words, the school subscribes to Google's cloud collection. The advantage for us is that we can restrict the authentication to only allow users with Middlebury credentials. 


#### Goals
* Learn how to use Google to allow users to sign in to the client
* Learn about sessions for maintaining authentication across multiple communications with the server

## Prerequisites

1. Click through to the GitHub [classroom assignment](https://classroom.github.com/a/iGeEMuR5) to create your private repository. Then clone that newly created repository to your local computer as you have done previously.
   

1. We are using a full implementation of Simplepedia, so install the package dependencies for the "top-level", client and server by executing `npm install`, `npm install --prefix client`, and `npm install --prefix server` inside the root directory of the newly cloned repository (like the project skeleton). *Windows users should not use the `prefix` option. Instead `cd` into the client and server directories to install those dependencies.*

1. Initialize the database by executing `npx knex migrate:latest` and `npx knex seed:run` in the server directory.

1. As with your project skeleton, executing `npm start` in the top level will kick off a full version of Simplepedia.

## Client-side authentication

We will start by implementing the login on the client side. All of our client-side work will be in `client/src/App.js`. 

If you implement this technique for your own projects, you will need to create a client ID for your application. For now we will use the one I created. For more details, read Google's primer on [adding Google sign-in to your web app](https://developers.google.com/identity/sign-in/web/). For now, add this line after the imports in `client/src/App.js`:

```javascript
const GOOGLE_CLIENT_ID = '833253079657-v2g067u0c0f1fkgreqntppltlrfa25kb.apps.googleusercontent.com';
```

*Note that this is configured for a project called 'CS312 Test App' and expects to be run locally (i.e., its origin endpoint is set to `localhost:3000`)*

### Add login and logout buttons

The primer above lists a collection of steps that you need to go through to use Google client-side authentication. Fortunately someone has already wrapped most of the pieces up into a React component that we just need to render on the page. 

Install the package from the top level with `npm install --save --prefix client react-google-login`. *Windows users should not use the `--prefix` option and instead `cd` into the client directory.*

Import the components into `client/src/App.js`:

```javascript
 import { GoogleLogin, GoogleLogout } from 'react-google-login';
 ```

Now find where the buttons are created (around line 140). We are going to add two more buttons. The first button is the login button:

```jsx
const loginButton = (
  <GoogleLogin
  clientId={GOOGLE_CLIENT_ID}
  buttonText="Login with Google"
  isSignedIn
  onSuccess={handleGoogleLogin}
  onFailure={handleGoogleFailure}
  />
);
```

This will create a styled button that will pop up a dialog box for the user to log in with. Notice that this takes two callbacks -- `onSuccess` and `onFailure`, which are invoked pretty much when you would expect. This also does some other voodoo under the hood. The `isSignedIn` field will preemptively call your `onSuccess` handler if it detects that your app still has permissions.  

The second button looks like this:

```jsx
const logoutButton = (<GoogleLogout
  clientId={GOOGLE_CLIENT_ID}
  buttonText="Logout"
  onLogoutSuccess={handleGoogleLogout}
  />
);
```

We now have a third callback, `onLogoutSuccess`. 

As you should see, these are already set up to call `handleGoogleLogin`, `handleGoogleFailure` and `handleGoogleLogout`. Create these three methods after the `removeArticle` method. 

To see the new login button, find the two instances of `ButtonBar` and add the `loginButton` at the beginning. 

Simplepedia will now show the Google login button at the start of the list of buttons. If you click on it, you will get a pop-up window that allows you to log into one of your Google accounts. 

### Manage access to functions

Add a new state variable to `App` named `loggedIn`, and initialize it to `false`. Use the setter to set it appropriately in the Google handler functions. 

What we want is for the user to be restricted from doing any operation that changes the data in the database unless they are logged in. 

Use `loggedIn` to change which buttons are displayed. 

When the user isn't logged in, the only button should be the login button. When the user is logged in, all of the buttons are available (as appropriate), as well as the log out button. 

Try this out. When you are logged in, you can do all of the operations, when you are logged out, you can't. 

Huzzah! Secure! 

Well... no. This is sufficient against innocent folks who don't have any ill intent, but it will fail instantly against anyone who wants to cause trouble. This is all JavaScript running in the user's browser, under the user's control. (Almost) anyone could tweak the code a little so it skips the authentication and just shows the buttons. For that matter, they could just interact with the server's endpoints directly and do whatever they like. 

## Server-side authentication

For the server-side authentication, we are going to do a couple of things. 

- When the user has successfully logged into Google, we will send the token to the server.
- The server will check to see if the token is valid.
- If the token is valid, we will look up the associated user record in the database (or create it if it doesn't exist).
- We will then start a session for the user, and use it to control access to the API endpoints that modify the data, (i.e., add, edit and delete articles).

### Sending the token for validation

We will start in `App.js`. The login and failure handlers both receive a [`response` parameter](https://github.com/anthonyjgrove/react-google-login#onsuccess-callback--w-offline-false).

For `handleGoogleFailure`, just call `alert(response.error)`. This will pop up a message about the problem. This is not really formated in a user friendly way and in a production environment you would want to deal with this. This will do for now. Try to log in and then close the popup without logging in. You should get a very terse message in response.

For `handleGoogleLogin`, we are going to do something a little more interesting. One of the fields of our response object is `tokenId`. We are going to send this back to the server. 

Change the function to look like this:

```javascript
  const handleGoogleLogin = (response) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${response.tokenId}`,
      },
    }).then((fetchResponse) => {
      if (!fetchResponse.ok) {
        alert('Unable to authenticate', fetchResponse.statusText);
        setLogin(false);
      }else{
        setLogin(true);
      }
    });
  };
```

Note that we are sending the token to a new API endpoint, and that the token is being sent as `Authorization`. You should also note that we don't change the state unless the server says that it is okay. Since you don't yet have that server endpoint, you will get an error message if you try to log in now.

Logging out will look similar, though we don't need to send any special headers. Note that we report problems, but still log the client out.

```JavaScript
const handleGoogleLogout = ()=>{
    fetch('/logout', {
      method: 'POST'
    }).then((fetchResponse) => {
      if (!fetchResponse.ok) {
        alert('Error logging out', fetchResponse.statusText);
      }
      setLogin(false);
    });
  };
```

### Configuring the server

We need a collection of new packages for the server. 

- `google-auth-library`: provides an API for validating OAuth tokens
- `passport`: a library that makes authentication and session management easier
- `passport-http-bearer`: one of many available "strategies" for authentication
- `express-session`: a module for adding sessions to our express app

Install all of these packages from the top level with `npm install --save google-auth-library passport passport-http-bearer express-session --prefix server`. *Windows users should not use the `--prefix` option and instead `cd` into the server directory.*

At the top of `server/routes.js`, add in the following `require` statements:

```javascript
const session = require('express-session');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { OAuth2Client } = require('google-auth-library');
```

Right after `app.use(bodyParser.json());`, add `app.use(passport.initialize());` to add the passport middleware.

### Passport authentication

In order to verify the token we receive, we need the client id from Google again. This isn't secret as it can be found in the client code, but we are going to protect it on general principle (also, keeping it out of the codebase makes it easier to change later). 

To do this, we will make use of the [dotenv](https://github.com/motdotla/dotenv) module which you have already dealt with as part of configuring the project. As a reminder, the `dotenv` module allows us to create a file full of variables that are copied into the current runtime environment as if they were specified as environment variables. 

- Install the `dotenv` package from the top level with `npm install --save dotenv --prefix server`. *Windows users should not use the `--prefix` option and instead `cd` into the server directory.*
- Modify the scripts section in the server's `package.json` to automatically load the dotenv files. The "test", "start" and "watch" entries should now initialize dotenv (note that you are just editing the existing scripts entries, not adding new lines):
    ```json
    "scripts": {
        "test": "jest --setupFiles dotenv/config",
        "start": "node -r dotenv/config index.js",
        "lint": "eslint .",
        "watch": "nodemon --exec 'node -r dotenv/config' --ignore '*.test.js' index.js",
        "heroku-postbuild": "npm install"
    },
    ```
- Create a new file called '.env' in the server directory
- Add the line `GOOGLE_CLIENT_ID=833253079657-v2g067u0c0f1fkgreqntppltlrfa25kb.apps.googleusercontent.com` to the '.env' file
- Restart your server (not just "hot reload")

**Note: the '.env' file should be listed in '.gitignore'. You should not commit this file to git. If you need to share the file with teammates, share it some other way.**

Now, we will create a new `OAuth2Client` object in `server/routes.js`: 

```JavaScript
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
``` 

Notice how we extract the variable from the environment using `process.env`.

Next, we will set up the passport strategy (put this *after* the line initializing passport):

```javascript
passport.use(new BearerStrategy((token, done) => {
  googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  }).then(async (ticket) => {
    const payload = ticket.getPayload();
    console.log(payload); // we will replace this later
    done(null, payload);
  }).catch((error) => {
    done(error);
  });
}));
```

This will get the token we pass down from the client and hand it to the `googleClient` for verification. The payload we get back will be a [Google Id Token](https://developers.google.com/identity/sign-in/web/backend-auth). This contains a number of interesting fields. The most important one is the `sub` field, which is the unique user id. Depending on the access the user grants, we will also get the user's name and email address. 

As a side note, if you want to restrict access to Middlebury users, you can look at the `hd` field (which may not be present). If the user used a Middlebury email address, `hd` will be present and set to 'middlebury.edu'.

Once this in place, add a new route to the server:

```javascript
app.post(
  '/login',
  passport.authenticate('bearer', { session: false }),
  (request, response, next) => {
    response.sendStatus(200);
  }
);
```

This creates a new "login" endpoint. The call to `passport.authentication()` will take the token that is found in the 'Authorization' field of the header and pass it to the strategy you just added. If it succeeds, then the next handler will be called, which will send back a "success" status code to the client. 

We have a corresponding route for "logout" as well.

```javascript
app.post(
  '/logout',
  (request, response, next) => {
    request.logout();       // logout function added by passport
    response.sendStatus(200);
  }
);
```


Try these out. Look in the console for the output of the `console.log(payload);` line in the passport middleware. 

### Recording users in the database

While Google claims it knows the user, they aren't really *your* user yet. To make them *your* user, we will keep records of the users who have logged into your application in the database. 

Take a look in the `models` directory -- you will find a new Model: `User`. This has a couple of standard fields, as well as a relation with `Article` via a new field called `lastEditedBy`.

For right now, we are just concerned with adding new users to the database. To make this model available, add the following after the line that requires the `Article` model `server/routes.js`.

```JavaScript
const User = require('./models/User');
``` 



Now, inside of the `BearerStrategy`, remove the line that prints out `payload`, and replace it with 

```JavaScript
let user = await User.query().findOne('googleId', payload.sub);
``` 

This line goes out to the database and tries to find a record that corresponds to the user that just logged in. Note that I used `await` here rather that Promise chaining for simplicity. 

This query will return the user from the database, but if the user is not yet in the database, `user` will be empty. 

Let's insert it. If `user` is falsy, insert a new user entry into the database via the `User` model.

```javascript
if (!user) {
  user = await User.query().insertAndFetch({
    googleId: payload.sub,
    familyName: payload.family_name,
    givenName: payload.given_name,
    email: payload.email,
  });
}
```

Finally, change the call to `done` to return `user` instead of `payload`, i.e. `done(null, user)`. This value will now be available to passport. 

You can try to login again, but to see the effect, you will have to go into the SQLite database and check that a new record has appeared by hand. 

### Adding sessions

We have done a lot of work, but... our endpoints are still not protected. 

To do that, we are going to use [sessions](https://en.wikipedia.org/wiki/Session_(computer_science)). The way that a session works is as follows. The server will send a cookie to the web browser with the successful status code. The web browser will hang onto this cookie and every time it makes a request of our server, it will send the cookie back. The server will check the data in the cookie against its record of active sessions, and if there is a matching active session, it will allow the transaction to proceed. 

As mentioned earlier, sessions will be implemented for us by Express via the `expression-session` module. However, we will use Passport to help us interact with the module and handle the data side of the problem. 


Find the line you added earlier to initialize passport. Replace it with the following to create and initialize the session. *Be careful, the order of these middlewares matters!*

```javascript
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
 }));
app.use(passport.initialize());
app.use(passport.session());
```

This initializes sessions in Express and in Passport. For details about the possible configuration options for `session`, check out the [documentation](https://github.com/expressjs/session#options). There are four that we care about. 

The `secret` field must be set. This is used to sign the session IDs. Notice that this is also coming from `process.env`. Add a line to your '.env' file that sets `SESSION_SECRET` to whatever you want (strong password rules apply). *The official documentation hard codes this into the code and uses secrets like "keyboard cat". Neither of these practices should be emulated.*

The `resave` and `saveUnitialized` both default to `true`, and that setting is deprecated. So, unless you have a good reason for doing so, set them to `false`.

The last option we care about is `store`. You don't see it above because we are using the default value, which is `MemoryStore`. The recommendation is that you only use this for testing as it isn't meant for long-term deployment. They would much rather you make use of a database to store the active sessions. 

Our session data will store the ID of the user. We need to tell Passport how to convert the data we passed along from the verification check into a value to be stored and then how to reverse this process. To do this, add these two functions to `routes.js`:

```javascript
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query().findOne('id', id).then(user => {
    done(null, user);
  }); 
});
```

These hide from us the details of what is actually stored in the session cookies by automating the conversion back to data we care about. As a result, in all of our routes, `request.user` will refer to the current user (provided the user is logged in and sending cookies). This is what allows us to pretend that interaction with the server is a conversation rather than a series of stateless transactions. 

Another important feature of the session is that we can use it for authentication. Our `request` objects in our routes now have a function `isAuthorized()` which we can call to see if the current request is part of a session. So, if we have any functionality we want to keep protected, we can check `request.isAuthenticated()`, and send back a 403 (forbidden) status code if the request doesn't have permission. 

However, in the interest of adhering to DRY principles, we don't want to add that to every route we care about. Instead, let's write some more middleware. ADd this before the start of the routes.

```javascript
const authenticationMiddleware = (request, response, next) => {
  if (request.isAuthenticated()){
    return next(); // we are good, proceed to the next handler
  }
  return response.sendStatus(403); // forbidden
};
```

To use the middleware, we just add it to the route before our existing handler. Here is an example:

```javascript
app.post('/api/articles', 
authenticationMiddleware,
(request, response, next) => {
  Article.query()
    .insertAndFetch(request.body)
    .then(article => {
      response.send(article);
    }, next);
});
```

Our express routes can have multiple handlers, and they will keep passing the request from one to another until one of them calls `send` or `sendStatus`. 

Add the `authenticationMiddleware` to the other routes that need protecting.

Finally, in the 'login' route, change the `session` field on the authenticate handler to `true`.

### Update lastEditedBy

To show you how we can use the session data beyond authentication, we will update the `lastEditedBy` field for our new and updated articles.  

The user data is present in `request.user`. So to get the user's id, we can just use `request.user.id`. So, for example, we could add this field to our article data with 

```javascript
const newArticle = { ...request.body, lastEditedBy: request.user.id };
```

Use this to set the `lastEditedBy` field for new articles.


Ideally, we would now update the client to show the attribution for changed articles. We could even imagine a more elaborate scheme where we keep a history of edits like Wikipedia. However, this will be left as an exercise for the reader as it is not a trivial change, requiring us to add new routes to fetch user names, etc (of course, a pragmatic NoSQL approach would be to eschew the relational data approach and just store the user's name in the `lastEditedBy` field). 

There are in fact many loose ends that should be tidied up. The most important of these is that the client will fail silently when the server refuses to make a change. Some kind of error reporting should be incorporated to let the user know why things didn't change...

## Not working? Some common issues...

### The React login and/or the Google cookie maintains state

You may stay "signed in" to Google even though your server has restarted. To get a valid session you may need to logout and then login in again *whenever you restart the server* (which will happen every time you save any of the server JS files).

### If you have 3rd party cookies turned off this will not work

In this context, Google is creating a 3rd party cookie. You need to turn on that feature in your browser for this work.

### Do a "hard" restart of the server before your final test run

While in theory the hot reload should work for most changes, some, e.g. changing the `.env` file, require you to restart the server entirely. Shut it down and execute `npm start` once you have all the above code in place.

## Secure at last?

An obvious question would be to ask if the application is now fully locked down. Sadly, the answer is no. It is better than it was, but all of our communications between the client and the server is done using `HTTP` instead of `HTTPS`. As a result, some bad actor could sniff the traffic and use the cookies to pretend to be the real user. We can only really trust the cookie data when we have end-to-end encryption between the client and the server. 

Unfortunately, switching to `HTTPS` is not completely trivial. In order to implement a secure communication, the server needs to have an `SSL` certificate that the user would trust. You can generate your own, but then the user would have no reason to trust it (at least they shouldn't). So, the best solution is to get one from a trusted certificate authority that signs the certificate in a way that your browser can verify independently. Mostly, this means laying out some cash. There are some "free" options out there, but many of them are trials, or require you to use a particular hosting provider, or are just not intended to be used for production websites (for example, Heroku has "free" SSL... if you are not on the free tier). 


## Finishing Up

Make sure that the test suite is still passing after your changes. If not, fix any bugs that you introduced. Having a robust test suite gives us confidence that our changes did not break the application! Note that when you push your commit the Travis tests will likely fail due to missing environment variables (remember we deliberately excluded those variables from our repository). There are several ways to [make environment variables available to Travis](https://docs.travis-ci.com/user/environment-variables). In this case you could put different variables, e.g. a different `SESSION_SECRET`, in `.travis.yml` for testing purposes or add values for those variables to the configuration on the Travis website.

1. Add and commit your changes to Github.
1. Submit your repository to Gradescope 

## Grading

Points | Requirement
------ | --------
&#x2713;/&#x2717; | Google login and logout buttons control functionality
&#x2713;/&#x2717; | Server validation of Google token
&#x2713;/&#x2717; | Sessions are used to manage access
&#x2713;/&#x2717; | Edits indicate the user who made them
&#x2713;/&#x2717; | Passes all ESLint checks 


