"use strict"
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();


// MIDDLE-WARE
router.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});


// Login Routes app.route
// `app.route` is basically a shortcut to call the Express Router. This is similar to using app.get, but we will use app.route. Instead of calling express.Router(), we can call app.route and start applying our routes there.

app.route('/login') //chained together .get and .post
  .get(function(req, res){
    res.send('this is the login form');
  })
  .post(function(req, res){
    console.log('processing');
    res.send('processing the login form!');
  });

// ROUTES
router.get('/', function(req, res, next){
  res.send('homepage');
});

router.get('/about', function(req, res, next){
  res.send('about page');
});

router.param('name', function(req, res, next){
  console.log('validation done on ', name);
  // save validated name as a property to req object
  req.name = name; //dont worry, not on global obj
  next();
});

router.get('/hello/:name', function(req, res, next){
  //instead of using req.params.name
  res.send('hello' + req.name + '!');
});

router.get('*', function(req, res, next){
  res.send('try / or /about in the URL instead');
});

// Created an instance of a router
app.use('/', router);
// We could have a Router for our basic routes, authenticated routes, and even API routes.

app.listen(port, () =>{ console.log(`server ${port} has started`)});
