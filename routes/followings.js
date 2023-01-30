const express = require('express')
const router = express.Router()
const followingsCtrl = require('../controllers/followings')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', followingsCtrl.index);
router.put("/:id", ensureLoggedIn, followingsCtrl.update)

module.exports = router