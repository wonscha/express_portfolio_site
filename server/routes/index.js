/***************

File name: index.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.13.

 ***************/

var express = require('express');
var router = express.Router();
let passport = require('passport');

let indexController = require('../controllers/index');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User;

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Me page. */
router.get('/contact', indexController.displayContactPage);

/* GET Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

module.exports = router;
