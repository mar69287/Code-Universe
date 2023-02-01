const Project = require('../models/project')
const Profile = require('../models/profile')

module.exports = {
    create,
    delete: deleteVolunteer
}

async function create(req, res) {

    try {
        const profile = await Profile.findOne({ user: req.user._id })
        if (!profile) {
            return res.redirect("/profiles/new")
        }
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(400).json({ msg: "Project not found" });
        }


        const volunteer = {
            user: req.user._id,
            userName: profile.name,
            profile: profile._id,
            content: req.body.content
        }
        project.volunteers.push(volunteer)
        await project.save()
        res.redirect(`/projects/${project._id}`)
    } catch (error) {
        console.log(error.message)

    }

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