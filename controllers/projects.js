const Project = require("../models/project")

module.exports = {
    index,
    new: newProject,
    create,
    show
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
    const project = new Project(req.body);
    project.save(function (err) {
        if (err) return res.redirect('/projects/new');
        console.log(project);
        res.redirect('/projects');
    });
}

function show(req, res) {
    Project.findById(req.params.id, function (err, project) {
        // Ticket.find({ flight: flight._id }, function (err, tickets) {
        res.render('projects/show', { project, tickets });
        // });
    });
}