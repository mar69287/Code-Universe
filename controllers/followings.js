const Profile = require('../models/profile')

module.exports = {
    index,
    update
}

function index(req, res) {

    Profile.find({})
        .populate("followings")
        .exec(function (err, profile) {
            if (error) {
                console.log(error)
            } else {
                res.render("followings/index", { profile })
            }
        })
}


function update(req, res, next) {
    const updatedProfile = {
        following: req.user.id
    };
    Profile.findByIdAndUpdate(req.params.id, updatedProfile, { new: true }, function (err, profile) {
        if (err) { return next(err); }
        res.redirect(`/profiles/${profile._id}`);
    });
}

// const updatedProfile = {
//     following: req.user.id
// };
// Profile.updateOne({user: req.body.id}, { $set: updatedProfile })
//     res.redirect(`/profiles/${profile._id}`);


// Profile.findOneAndUpdate({ user: req.user.id }, { following: req.user.id }, { new: true }, (err, profile) => {
//     if (err) return console.error(err);
//     // res.redirect(`/profiles`);
// });