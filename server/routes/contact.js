/***************

File name: contact.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let express = require('express');
let router = express.Router();

let Contact = require('../models/contact');

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

})

module.exports = router;