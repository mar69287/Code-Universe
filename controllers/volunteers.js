const Project = require('../models/project')

module.exports = {
    create,
    delete: deleteVolunteer
}

function create(req, res) {
    Project.findById(req.params.id, function (err, project) {
        project.volunteers.push(req.body)
        project.save(function (err) {
            res.redirect(`/projects/${project._id}`)
        })
    })
}

async function deleteVolunteer(req, res, next) {

    try {
        const project = await Project.findOne({ "volunteers._id": req.params.id })
        if (!project) return res.redirect("/projects")
        project.volunteers.remove(req.params.id)
        await project.save()
        res.redirect(`/projects/${project._id}`)
    } catch (err) {
        return next(err)
    }
}