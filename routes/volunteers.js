const express = require('express')
const router = express.Router()
const volunteersCtrl = require('../controllers/volunteers')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/projects/:id/volunteers', ensureLoggedIn, volunteersCtrl.create)
router.delete('/volunteers/:id', ensureLoggedIn, volunteersCtrl.delete)


module.exports = router