var express = require('express');
var router = express.Router();

const competitionsCtrl = require("../controllers/competitions")


/* GET users listing. */
router.get('/', competitionsCtrl.index);

module.exports = router;