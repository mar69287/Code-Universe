const Profile = require('../models/profile')

module.exports = {
    index,
    delete: deleteFollowing
}

function index(req, res) {

    Profile.findOne({ _id: req.params.id })
        .populate("following")
        .exec(function (err, profile) {
            if (err) {
                console.log(err)
            } else {
                console.log(profile)
                res.render("followings/index", { profile })
            }
        })
}

function deleteFollowing(req, res, next) {


    Profile.findOne({ user: req.user.id }, (error, profile) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
        if (!profile) {
            return res.status(404).send('Profile not found');
        }
        Profile.updateOne(
            { user: req.user.id },
            { $pull: { following: req.params.id } },
            (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Server error');
                }
                return res.redirect(`/profiles/${profile._id}`);
            }
        );
    });


}