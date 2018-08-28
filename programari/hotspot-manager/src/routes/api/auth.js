const express = require('express'),
	router = express.Router(),
	unifi = require('../../utils/unifi')

router.post('/', (req, res) => {
	if (!req.user) {
		res.redirect('/auth/google')
		return
	}

	let mac = req.body.mac

	if (mac == null) {
		res.statusCode = 500
		res.send({
			"error": true,
			"message": "MAC address was not submitted!"
		})
		return
	}

	unifi.authUser(mac, 60)
		.then(data => {
			res.send({
				"error": false,
				"message": JSON.stringify(data)
			})
		}).catch(err => {
			res.statusCode = 500
			res.send({
				"error": true,
				"message": err
			})
		})

})


module.exports = router