/***************

File name: contact.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let mongoose = require('mongoose');

let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
}, {
    collection: "contacts"
})

module.exports = mongoose.model('Contact', contactModel);