var express = require('express');
var router = express.Router();
const usersCtrl = require("../controllers/users")
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/:id', usersCtrl.show);
router.get('/:id/edit', ensureLoggedIn, usersCtrl.edit)
router.put("/:id", ensureLoggedIn, usersCtrl.update)

module.exports = router;