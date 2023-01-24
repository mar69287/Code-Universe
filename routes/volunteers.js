const express = require('express')
const router = express.Router()
const volunteersCtrl = require('../controllers/volunteers')

router.post('/projects/:id/volunteers', volunteersCtrl.create)
router.delete('/volunteers/:id', volunteersCtrl.delete)


module.exports = router