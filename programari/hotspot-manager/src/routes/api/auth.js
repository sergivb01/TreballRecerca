const express = require('express'),
	router = express.Router(),
	unifi = require('../../utils/unifi')

router.get('/', (req, res) => {
	res.send(req.user)
})

router.post('/', (req, res) => {
	return res.send({
		"error": true,
		"message": "API endpoint is deprecated"
	})
})

module.exports = router