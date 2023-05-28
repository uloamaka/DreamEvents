# DreamEvents

An event planning website using Node.js web application.

Overall, this project is an event planning website built using Node.js that would provide a comprehensive platform for users to book an event, while the organization plan, organize, and manage events from start to finish. The use of Node.js would provide the website with the flexibility, scalability, and performance needed to handle large amounts of data and traffic.

featuring =>
**User/organization authentication**: The website would allow users to create an account and log in to access their event planning dashboard.

**Event creation**: Users would be able to create events by adding details such as the event name, date, time, location, and type to the contact form.

**Budgeting and expense tracking**: Users would be able to set a budget for their event and track expenses, including vendor costs, venue fees, and other expenses related to the event.

**Integration with third-party tools**: The website could be integrated with third-party tools such as Google Calendar, Mailchimp, and Stripe to provide additional functionality such as automated email reminders and payment processing. [which have not been implimented]

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
<!--- [Obtaining API Keys](#obtaining-api-keys) -->
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [deployment](#deployment)

## Features

**Local Authentication with passport/Oauth** using Username and Password

- Flash notifications
- nodemailer

## Prerequisites

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js 10+](http://nodejs.org)
  **Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visual Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

**Note:** If you are new to Node or Express, you may find
[Node.js & Express From Scratch series](https://www.youtube.com/watch?v=Ad2ngx6CT0M&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp&index=3)
helpful for learning the basics of Node and Express. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

## Getting Started

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/uloamaka/DreamEvents/.git v7

# Change directory
cd v7

# Install NPM dependencies
npm install / npm i

# Then simply start your app
node index.js

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.
```

## Project Structure

| Name | Description |
| ---- | ----------- |

| **middleware**/index.js | contains the login middleware

| **models**/blog.js | schema for events blog

| **models**/contact.js | schema for events contact form

| **models**/gallery.js | schema for events gallery

| **models**/user.js | schema for user/Admin

| **public**/stylesheet.js | all css folders

| **routes**/about_us.js | route handler for the about page

| **routes**/blogs.js | route handler for the blogs routes with **CRUD** functionality

| **routes**/contact_us.js | route handler for the contact page
| **routes**/event_service.js | route handler for the event page
| **routes**/gallery.js | route handler for the gallery routes with **CRUD** functionality
| **routes**/home.js | route handler for the home page
| **routes**/login.js | route handler for the login routes with **CRUD** functionality
| **routes**/logout.js | route handler for the logout routes with **CRUD** functionality
| **routes**/send_mail.js | route handler for the send_mail routes with **CRUD** functionality
| **routes**/signup.js | route handler for the signup routes with **CRUD** functionality

| **views**/about/about.ejs | for rendering the about page ejs templates

| **views**/blogs/form.ejs | for rendering the ejs templates for the blog form.

| **views**/blogs/index.ejs | for rendering the ejs templates of all blogs in the database.

| **views**/blogs/show.ejs | for rendering the ejs templates of a particuliar blog by ID from the database.

| **views**/contact/form.ejs | for rendering the ejs templates for the contact form to submit event.

| **views**/contact/index.ejs | for rendering the ejs templates of all booked event in the database.

| **emails**/event_request.ejs | for rendering the template for email messages

| **events**/event.ejs | for rendering the about page ejs templates

| **gallery**/form.ejs | for rendering the ejs templates for the gallery form.

| **gallery**/gallery-detail.ejs | for rendering the ejs templates of all galleries in the database.

| **gallery**/galllery.ejs | for rendering the ejs templates of a particuliar gallery by ID from the database.

| **home**/landing.ejs | for rendering the landing page ejs templates

| **layouts**/header.ejs | for renderinng the footer of the web page

| **layouts**/header.ejs | for renderinng the header of the web page

| **register**/login.ejs | for rendering the login page template

| **register**/signup.ejs | for rendering the signup page template

| **config.js** | for storing the authentication details

| **index.js** |

| Package | Description |
| ------- | ----------- |

| body-parser | Node.js body parsing middleware.

| connect-flash | Provides flash messages for Express.

| ejs | Template engine for Express.

| express | Node.js web framework.

| express-session | Simple session middleware for Express.

| googleapis | googleapis API library.

| joi | Joi API library.

| mongoose | MongoDB ODM.

| multer | Node.js middleware for handling `multipart/form-data`.

| nodemailer | Node.js library for sending emails.

| passport | Simple and elegant authentication library for node.js.

| passport-local | Sign-in with Username and Password plugin.

| passport-local-mongoose | Sign-in with Username and Password plugin.

| passport-local-validator | A library of passport validators and sanitizers.

You need to have a MongoDB server running before launching `app.js`. You can
download MongoDB [here](https://www.mongodb.com/download-center/community), or install it via a package manager.

Windows users, read [Install MongoDB on Windows](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

**Tip:** If you are always connected to the internet, you could just use
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Compose](https://www.compose.io/) instead
of downloading and installing MongoDB locally. You will only need to update database credentials
in `.env` file.

### I get an error when I deploy my app, why?

Chances are you haven't changed the _Database URI_ in `.env`. If `MONGODB` is
set to `localhost`, it will only work on your machine as long as MongoDB is
running. When you deploy to Heroku, OpenShift, or some other provider, you will not have MongoDB
running on `localhost`. You need to create an account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
or [Compose](https://www.compose.io/), then create a free tier database.
See [Deployment](#deployment) for more information on how to set up an account
and a new database step-by-step with MongoDB Atlas.

### Why do you have all routes defined in app.js?

For the sake of simplicity. While there might be a better approach,
such as passing `app` context to each controller as outlined in this
[blog](http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/),
I find such a style to be confusing for beginners.
It took me a long time to grasp the concept of `exports` and `module.exports`,
let alone having a global `app` reference in other files.
That to me is backward thinking.
The `index.js` is the "heart of the app", it should be the one referencing
models, routes, controllers, etc.
When working solo on small projects, I prefer to have everything inside `index.js` as is the case with [this](<(https://github.com/sahat/ember-sass-express-starter/blob/master/app.js)>)
REST API server.

### How do flash messages work in this project?

Flash messages allow you to display a message at the end of the request and access
it on the next request and only the next request. For instance, on a failed login attempt, you would
display an alert with some error message, but as soon as you refresh that page or visit a different
page and come back to the login page, that error message will be gone. It is only displayed once.
This project uses _express-flash_ module for flash messages. And that
module is built on top of _connect-flash_, which is what I used in
this project initially. With _express-flash_ you don't have to
explicitly send a flash message to every view inside `res.render()`.
All flash messages are available in your views via `messages` object by default,
thanks to _express-flash_.

Flash messages have a two-step process. You use `req.flash('errors', { msg: 'Error messages goes here' }`
to create a flash message in your controllers, and then display them in your views:

```pug
if messages.errors
  .alert.alert-danger.fade.in
    for error in messages.errors
      div= error.msg
```

In the first step, `'errors'` is the name of a flash message, which should match the
name of the property on `messages` object in your views. You place alert messages
inside `if message.errors` because you don't want to show them flash messages are present.
The reason why you pass an error like `{ msg: 'Error message goes here' }` instead
of just a string - `'Error message goes here'`, is for the sake of consistency.
To clarify that, _express-validator_ module which is used for validating and sanitizing user's input,
returns all errors as an array of objects, where each object has a `msg` property with a message why an error has occurred. Here is a more general example of what express-validator returns when there are errors present:

```js
[
  { param: "name", msg: "Name is required", value: "<received input>" },
  {
    param: "email",
    msg: "A valid email is required",
    value: "<received input>",
  },
];
```

To keep consistent with that style, you should pass all flash messages
as `{ msg: 'My flash message' }` instead of a string. Otherwise, you will see an alert box
without an error message. That is because in **partials/flash.pug** template it will try to output
`error.msg` (i.e. `"My flash message".msg`), in other words, it will try to call a `msg` method on a _String_ object,
which will return _undefined_. Everything I just mentioned about errors, also applies
to "info" and "success" flash messages, and you could even create a new one yourself, such as:

If you are authenticated, you let this visitor pass through your "door" by calling `return next();`. It then proceeds to the
next middleware until it reaches the last argument, which is a callback function that typically renders a template on `GET` requests or redirects on `POST` requests. In this case, if you are authenticated, you will be redirected to the _Home_ page; otherwise, you will be redirected to the _Login_ page.

Express.js has `app.get`, `app.post`, `app.put`, `app.delete`, but for the most part, you will only use the first two HTTP verbs, unless you are building a RESTful API.
If you just want to display a page, then use `GET`, if you are submitting a form, sending a file then use `POST`.

Here is a typical workflow for adding new routes to your application. Let's say we are building a page that lists all books from the database.

At this point, we are done with the basic functionalities of the back-end, but further upgrade to be made to higher versions of this event website.
## deployment 
although I haven't deploy this web app but will be done with **heroku**

## License

The MIT License (MIT)

Copyright (c) 2023 Ebite Godsgift Uloamaka 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
