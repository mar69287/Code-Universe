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

    Project.find({ author: req.user._id }, function (err, projects) {
        if (err) {
            console.log(err);
        } else {
            Profile.findOne({ user: req.user._id }, function (err, profile) {
                if (err) {
                    console.log(err);
                } else {
                    if (profile) {
                        res.render('profiles/show', { projects, profile });
                    } else {
                        res.render('profiles/new')
                    }

                }
            });
        }
    });
};



// });


// Profile.findOne({
//     user: req.user._id
// }, function (err, profile) {
//     if (profile) {
//         res.render('profiles/show', { profile })
//     } else {
//         res.render('profiles/new')
//     }
// });
// }

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
        console.log(profile);
        console.log(profile.user)
        console.log(req.user._id)
        res.redirect('/profiles/show');
    });
}

function show(req, res) {
    Project.find({ author: req.user._id }, function (err, projects) {
        if (err) {
            console.log(err);
        } else {
            Profile.findOne({ user: req.user._id }, function (err, profile) {
                if (err) {
                    console.log(err);
                } else {
                    if (profile) {
                        res.render('profiles/show', { projects, profile });
                    } else {
                        res.render('profiles/new')
                    }

                }
            });
        }
    });
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