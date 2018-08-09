const express = require('express'),
	router = express.Router()


router.use('/api/auth', require('./api/auth'))
router.use('/api/system', require('./api/system'))
router.use('/', require('./default'))

module.exports = router
