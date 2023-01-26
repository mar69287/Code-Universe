const express = require('express')
const router = express.Router()
const skillsCtrl = require('../controllers/skills')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/profiles/:id/skills', ensureLoggedIn, skillsCtrl.create)
router.delete('/skills/:id', ensureLoggedIn, skillsCtrl.delete)


module.exports = router