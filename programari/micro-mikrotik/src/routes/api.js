const express = require('express'),
	router = express.Router()


router.use('/interface', require('./api/interface'))
router.use('/system', require('./api/system'))

module.exports = router
