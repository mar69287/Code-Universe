const Profile = require('../models/profile')

module.exports = {
    index
}

function index(req, res) {

    Profile.findOne({ _id: req.params.id })
        .populate("followers")
        .exec(function (err, profile) {
            if (err) {
                console.log(err)
            } else {
                console.log(profile)
                res.render("followers/index", { profile })
            }
        })
}