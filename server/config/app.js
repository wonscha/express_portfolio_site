/*
File name: app.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.13.
*/

// Installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Database setup
let mongoose = require('mongoose');
let DB = require('./db');

mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', () => {
  console.log('Connected to mongoDB...')
});

let indexRouter = require('../routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


// route setup
app.use('/', indexRouter);

app.post("/contact", (req, res) => {
  console.log('First Name: ', req.body.fname);
  console.log('Last Name: ', req.body.lname);
  console.log('Contact Number: ', req.body.tel);
  console.log('Email: ', req.body.email);
  console.log('Message: ', req.body.message);

  res.redirect('/');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "Error" });
});

module.exports = app;
