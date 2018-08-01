const express = require('express'),
	router = express.Router()

router.use('/clients', require('./api/clients'))
router.use('/system', require('./api/system'))

module.exports = router
