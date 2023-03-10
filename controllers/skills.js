const Profile = require('../models/profile')

module.exports = {
    create,
    delete: deleteSkill
}

function create(req, res) {
    Profile.findById(req.params.id, function (err, profile) {
        req.body.user = req.user._id;
        profile.skills.push(req.body)
        profile.save(function (err) {
            res.redirect(`/profiles/${profile._id}`)
        })
    })
}

async function deleteSkill(req, res, next) {

    try {
        const profile = await Profile.findOne({ "skills._id": req.params.id })
        if (!profile) return res.redirect("/profiles/")
        profile.skills.remove(req.params.id)
        await profile.save()
        res.redirect(`/profiles/${profile._id}`)
    } catch (err) {
        return next(err)
    }
}