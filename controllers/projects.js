const Project = require("../models/project")

module.exports = {
    index
}

function index(req, res) {
    Project.find({}, function (err, projects) {
        console.log(projects)
        res.render("projectss/index", { projects })
    })
}