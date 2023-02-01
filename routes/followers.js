const express = require('express')
const router = express.Router()
const followersCtrl = require('../controllers/followers')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Profile = require('../models/profile')

router.get('/:id', ensureLoggedIn, followersCtrl.index);

// router.delete('/:id', ensureLoggedIn, followersCtrl.delete)

module.exports = router