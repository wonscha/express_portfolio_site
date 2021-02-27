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

/* Get Route for displaying Contact List page */
router.get('/', contactController.displayContactListPage);

/* GET Route for displaying Contact Edit page */
router.get('/edit/:id', contactController.displayContactEditPage);

/* POST Route for processing Contact Edit page */
router.post('/edit/:id', contactController.processContactEditPage);

/* GET to perform deleting Contact */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contact-list');
        }
    })
})

module.exports = router;