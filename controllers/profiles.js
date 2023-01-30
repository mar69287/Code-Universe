const Profile = require("../models/profile")
const Project = require("../models/project")

module.exports = {
    index,
    create,
    show,
    new: newProfile,
    edit,
    update,
    delete: deleteProfile
}

function index(req, res) {

    Profile.find({})
        .exec(function (err, profiles) {
            console.log(profiles)
            res.render("profiles/index", { profiles })
        })
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.avatar = req.user.avatar;
    const profile = new Profile(req.body);
    // console.log(req.body)
    profile.save(function (err) {
        if (err) return res.redirect('/profiles/new');
        res.redirect(`/profiles/${profile._id}`);
    });
}

function show(req, res) {

    Profile.findOne({ _id: req.params.id })
        .populate("projects")
        .exec((error, profile) => {
            if (error) {
                console.log(error)
            } else {
                if (profile) {
                    res.render('profiles/show', { profile });
                } else {
                    res.redirect('new')
                }
            }

        })

}


function edit(req, res, next) {
    Profile.findById(req.params.id, function (err, profile) {
        if (err) { return next(err); }

        res.render('profiles/edit', { profile })
    });
}

function update(req, res, next) {
    const updatedProfile = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        location: req.body.location,
        portfolio: req.body.portfolio,
        linkedIn: req.body.linkedIn,
        github: req.body.github,
        bio: req.body.bio
    };
    Profile.findByIdAndUpdate(req.params.id, updatedProfile, { new: true }, function (err, profile) {
        if (err) { return next(err); }
        res.redirect(`/profiles/${profile._id}`);
    });
}

function deleteProfile(req, res, next) {
    Profile.findByIdAndDelete(req.params.id, function (err, profile) {
        if (err) { return next(err); }
        Project.deleteMany({ author: req.user.id }, function (err, projects) {
            if (err) { return next(err); }
            res.redirect('/profiles');
        })
    });
}