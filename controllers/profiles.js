const Profile = require("../models/profile")
const Project = require("../models/project")

module.exports = {
    index,
    create,
    show,
    new: newProfile
    // edit,
    // update
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


// function edit(req, res, next) {
//     Project.findById(req.params.id, function (err, project) {
//         if (err) { return next(err); }

//         res.render('projects/edit', { project })
//     });
// }

// function update(req, res, next) {
//     const updatedProject = {
//         content: req.body.content,
//         members: req.body.members
//     };
//     Project.findByIdAndUpdate(req.params.id, updatedProject, { new: true }, function (err, project) {
//         if (err) { return next(err); }
//         res.redirect(`/projects/${project._id}`);
//     });
// }