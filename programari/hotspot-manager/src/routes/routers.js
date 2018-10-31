const express = require('express'),
	router = express.Router()


router.use('/', require('./default'))
router.use('/test', require('./api/test'))

router.use('/auth', require('./auth/google'))

router.use('/api/wp', require('./api/wp'))
router.use('/api/unifi', require('./api/unifi'))
router.use('/api/pihole', require('./api/pihole'))
router.use('/api/auth', require('./api/auth'))
router.use('/api/system', require('./api/system'))
router.use('/api/secure', require('./api/secure'))

module.exports = router