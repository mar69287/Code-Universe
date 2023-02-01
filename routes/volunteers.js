const express = require('express')
const router = express.Router()
const volunteersCtrl = require('../controllers/volunteers')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Profile = require("../models/profile")
const Project = require("../models/project")

router.post('/projects/:id/volunteers', ensureLoggedIn, volunteersCtrl.create)

// router.post("/projects/:id/volunteers", ensureLoggedIn, async (req, res) => {
//     try {
//         // Find the profile of the logged-in user
//         const profile = await Profile.findOne({ author: req.user.id });

//         // Check if the profile was found
//         if (!profile) {
//             return res.status(404).json({ msg: "Profile not found" });
//         }

//         // Create a new volunteer schema
//         const volunteer = new Volunteer({
//             profile: profile._id,
//             user: req.user._id,
//             userName: req.user.name,
//             userAvatar: req.user.avatar,
//         });

//         // Find the project and push the new volunteer into the volunteers array
//         const result = await Project.updateOne(
//             { _id: req.params.id },
//             { $push: { volunteers: volunteer } }
//         );

//         Project.findById(req.params.id, function (err, project) {
//             req.body.user = req.user._id;
//             req.body.userName = req.user.name;
//             req.body.userAvatar = req.user.avatar;
//             project.volunteers.push(req.body)
//             project.save(function (err) {
//                 res.redirect(`/projects/${project._id}`)
//             })
//         })

//         // Check if the project was found
//         if (result.n === 0) {
//             return res.status(404).json({ msg: "Project not found" });
//         }

//         res.json({ msg: "Volunteer added successfully" });
//         res.redirect(`/projects/${project._id}`)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server error");
//     }
// })

router.delete('/volunteers/:id', ensureLoggedIn, volunteersCtrl.delete)


module.exports = router