/***************

File name: index.js
Student’s Name: Wonsuk Cha
StudentID: 301155132
Date: 2021.02.27.

***************/

let passport = require('passport');
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', username: req.user ? req.user.username : '' });
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About Me', username: req.user ? req.user.username : '' });
};

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', username: req.user ? req.user.username : '' });
};

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', username: req.user ? req.user.username : '' });
};

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact Me', username: req.user ? req.user.username : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
        })
    } else {
        return res.redirect('/');
    }
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // server error?
            if (err) {
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }
                return res.redirect('/contact-list');
            });
        }
    )(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not logged in
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            username: req.user ? req.user.username : ''
        })
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {

    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log('Error: Inserting New User');
            if (err.name == 'UserExistsError') {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                )
                console.log('Error: User Already Exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                username: req.user ? req.user.username : ''
            })
        } else {
            // redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list');
            });
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}