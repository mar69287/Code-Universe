const Project = require("../models/project")

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
    Project.find({}, function (err, projects) {
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
    // console.log(req.user)
    project.save(function (err) {
        if (err) return res.redirect('/projects/new');
        console.log(project);
        res.redirect('/projects');
    });
}

function show(req, res) {
    Project.findById(req.params.id, function (err, project) {
        res.render('projects/show', { project });
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