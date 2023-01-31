const express = require('express')
const router = express.Router()
// const followingsCtrl = require('../controllers/followings')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Profile = require('../models/profile')

// router.get('/', followingsCtrl.index);

router.get('/:id', ensureLoggedIn, function (req, res) {
    if (req.isAuthenticated()) {
        Profile.findOne({ user: req.user._id }, function (err, profile) {
            if (profile) {
                const updatedProfile = {
                    following: req.params.id
                };
                profile.following.push(updatedProfile.following)
                profile.save()
                    .then(() => {
                        res.redirect(`/profiles/`);
                    })
            } else {
                res.redirect(`/profiles/new`);
            }
        })
    } else {
        res.redirect(`/profiles/new`);
    }
});

module.exports = router