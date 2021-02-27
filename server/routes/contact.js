/***************

File name: contact.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let express = require('express');
let router = express.Router();

let Contact = require('../models/contact');
let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* Get Route for displaying Contact List page */
router.get('/', requireAuth, contactController.displayContactListPage);

/* GET Route for displaying Contact Edit page */
router.get('/edit/:id', requireAuth, contactController.displayContactEditPage);

/* POST Route for processing Contact Edit page */
router.post('/edit/:id', requireAuth, contactController.processContactEditPage);

/* GET to perform deleting Contact */
router.get('/delete/:id', requireAuth, contactController.performDeleteContact);

module.exports = router;