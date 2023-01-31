var express = require('express');
var router = express.Router();
const profilesCtrl = require("../controllers/profiles")
const ensureLoggedIn = require('../config/ensureLoggedIn');
// const Profile = require('../models/profile')

router.get('/', profilesCtrl.index);
router.get("/new", ensureLoggedIn, profilesCtrl.new);
router.post("/", ensureLoggedIn, profilesCtrl.create);
router.get('/:id', profilesCtrl.show);
router.delete('/:id', ensureLoggedIn, profilesCtrl.delete)
router.get('/:id/edit', ensureLoggedIn, profilesCtrl.edit)
router.put("/:id", ensureLoggedIn, profilesCtrl.update)

module.exports = router;