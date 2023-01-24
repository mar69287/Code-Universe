var express = require('express');
var router = express.Router();

const newsCtrl = require("../controllers/news")


/* GET users listing. */
router.get('/', newsCtrl.index);

module.exports = router;