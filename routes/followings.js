const express = require('express')
const router = express.Router()
const followingsCtrl = require('../controllers/followings')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Profile = require('../models/profile')

router.get('/:id/list', followingsCtrl.index);

router.get('/:id', ensureLoggedIn, async function (req, res) {
    // if (req.isAuthenticated()) {
    //     Profile.findOne({ user: req.user._id }, function (err, profile) {
    //         if (profile) {
    //             const updatedProfile = {
    //                 following: req.params.id
    //             };
    //             profile.following.push(updatedProfile.following)
    //             profile.save()
    //                 .then(() => {
    //                     res.redirect(`/profiles/`);
    //                 })
    //         } else {
    //             res.redirect(`/profiles/new`);
    //         }
    //     })
    // } else {
    //     res.redirect(`/profiles/new`);
    // }
    if (req.isAuthenticated()) {
        try {
            const profile = await Profile.findOne({ user: req.user._id });
            if (profile) {
                const followedProfile = await Profile.findOne({ _id: req.params.id });
                if (followedProfile) {
                    followedProfile.followers.push(profile._id);
                    await followedProfile.save();
                    const updatedProfile = {
                        following: req.params.id
                    };
                    profile.following.push(updatedProfile.following);
                    await profile.save();
                    res.redirect(`/profiles/`);
                } else {
                    res.redirect(`/profiles/`);
                }
            } else {
                res.redirect(`/profiles/new`);
            }
        } catch (err) {
            console.error(err);
            res.redirect(`/profiles/`);
        }
    } else {
        res.redirect(`/profiles/new`);
    }
});

router.delete('/:id', ensureLoggedIn, followingsCtrl.delete)

module.exports = router