var express = require('express');
var router = express.Router();
const Profile = require("../models/profile")

/* GET home page. */
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        Profile.findOne({ user: req.user._id }, function (err, profile) {
            if (profile) {
                res.redirect(`profiles/${profile._id}`);
            } else {
                res.redirect(`profiles/new`);
            }
        })
    } else {
        res.redirect(`profiles/new`);
    }
});

module.exports = router