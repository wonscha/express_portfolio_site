/***************

File name: contact.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let express = require('express');
let router = express.Router();

let Contact = require('../models/contact');

/* Get Route for displaying Contact List page */
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.log(err);
        } else {
            // Sort contacts by name
            contactList.sort(function (a, b) {
                if (a.name.toUpperCase < b.name.toUpperCase) { return -1 };
                if (a.name.toUpperCase > b.name.toUpperCase) { return 1 };
                return 0
            })

            // Render contact-list
            res.render('contact/contact-list', {
                title: "Business Contact List",
                contactList: contactList
            });
        }
    })
});

/* GET Route for displaying Contact Edit page */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('contact/edit', {
                title: "Business Contact Edit",
                contactToEdit: contactToEdit
            })
        }
    })
});

/* POST Route for processing Contact Edit page */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updateContact = Contact({
        _id: id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    Contact.updateOne({ _id: id }, updateContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contact-list');
        }
    })
});

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