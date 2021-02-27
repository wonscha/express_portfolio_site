/***************

File name: contact.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let Contact = require('../models/contact');

module.exports.displayContactListPage = (req, res, next) => {
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
};

module.exports.displayContactEditPage = (req, res, next) => {
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
};

module.exports.processContactEditPage = (req, res, next) => {
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
};

module.exports.performDeleteContact = (req, res, next) => {
    let id = req.params.id;

    Contact.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contact-list');
        }
    })
};