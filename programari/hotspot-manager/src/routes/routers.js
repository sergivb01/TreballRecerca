const express = require('express'),
	router = express.Router()


router.use('/', require('./default'))
router.use('/api/auth', require('./api/auth'))
router.use('/api/system', require('./api/system'))
router.use('/api/secure', require('./api/secure'))
router.use('/auth', require('./auth/google'))

module.exports = router
