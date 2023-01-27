var express = require('express');
var router = express.Router();
const passport = require('passport');
const Profile = require("../models/profile")

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    Profile.findOne({ user: req.user._id }, function (err, profile) {
      res.render('index', { title: 'Code Universe', profile });
    })
  } else {
    res.render('index', { title: 'Code Universe' });
  }

  // res.render('index', { title: 'Code Universe' });
});

router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});

module.exports = router;
