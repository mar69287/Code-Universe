const Project = require("../models/project")
const Profile = require("../models/profile")

module.exports = {
    index,
    new: newProject,
    create,
    show,
    delete: deleteProject,
    edit,
    update
}

function index(req, res) {
    Project.find({})
        .sort({ "createdAt": -1 })
        .exec(function (err, projects) {
            console.log(projects)
            res.render("projects/index", { projects })
        })
}

function newProject(req, res) {
    res.render('projects/new');
}

function create(req, res) {

    req.body.author = req.user._id
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const project = new Project(req.body);
    project.save()
        .then(() => {
            return Profile.findOne({ user: req.user.id })
        })
        .then(profile => {
            profile.projects.push(project._id)
            return profile.save()
        })
        .then(savedProfile => {
            res.redirect('/projects');
        })
        .catch(error => {
            console.log(error)
        })

}

function show(req, res) {
    Project.findById(req.params.id, function (err, project) {
        var date = new Date(project.createdAt);
        var options = { timeZone: 'America/Los_Angeles' };
        date = date.toLocaleDateString("en-US", options) + " " + date.toLocaleTimeString("en-US", options) + " (PST)";
        res.render('projects/show', { project, date });
    });
}

function deleteProject(req, res, next) {
    Project.findByIdAndDelete(req.params.id, function (err, project) {
        if (err) { return next(err); }
        res.redirect('/projects');
    });
}

function edit(req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) { return next(err); }

        res.render('projects/edit', { project })
    });
}

function update(req, res, next) {
    const updatedProject = {
        content: req.body.content,
        members: req.body.members
    };
    Project.findByIdAndUpdate(req.params.id, updatedProject, { new: true }, function (err, project) {
        if (err) { return next(err); }
        res.redirect(`/projects/${project._id}`);
    });

}