var express = require('express');
var router = express.Router();
const projectsCtrl = require("../controllers/projects")
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
router.get('/', projectsCtrl.index);
router.get("/new", ensureLoggedIn, projectsCtrl.new);
router.post("/", ensureLoggedIn, projectsCtrl.create);
router.get('/:id', projectsCtrl.show);
router.delete('/:id', ensureLoggedIn, projectsCtrl.delete)
router.get('/:id/edit', ensureLoggedIn, projectsCtrl.edit)
router.put("/:id", ensureLoggedIn, projectsCtrl.update)

module.exports = router;
