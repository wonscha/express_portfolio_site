/***************

File name: user.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email address is required'
    },
}, {
    collection: "users"
});

let options = {
    missingPasswordError: 'Wrong / Missing Password'
};

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);