const express = require('express'),
	router = express.Router()

router.use('/system', require('./api/system'))

module.exports = router
