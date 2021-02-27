/***************

File name: index.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.13.

 ***************/

var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About Me page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact Me page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

/* GET Login page */
router.get('/login', function (req, res, next) {
  res.render('auth/login', { title: 'Login' });
})

module.exports = router;
