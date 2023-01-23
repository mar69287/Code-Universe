var express = require('express');
var router = express.Router();

const projectsCtrl = require("../controllers/projects")


/* GET users listing. */
router.get('/', projectsCtrl.index);
router.get("/new", projectsCtrl.new);
router.post("/", projectsCtrl.create);
router.get('/:id', projectsCtrl.show);


module.exports = router;
