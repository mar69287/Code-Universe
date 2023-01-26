var express = require('express');
var router = express.Router();
const profilesCtrl = require("../controllers/profiles")
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', profilesCtrl.index);
router.get("/new", ensureLoggedIn, profilesCtrl.new);
router.post("/", ensureLoggedIn, profilesCtrl.create);
router.get('/:id', profilesCtrl.show);
// router.get('/:id/edit', ensureLoggedIn, profilesCtrl.edit)
// router.put("/:id", ensureLoggedIn, profilesCtrl.update)

module.exports = router;