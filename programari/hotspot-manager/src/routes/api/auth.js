express = require('express'),
	router = express.Router(),
	unifi = require('../../utils/unifi')

router.post('/', (req, res) => {
	let mac = req.body.mac,
		duration = 12 * 60

	if (mac == null) {
		res.statusCode = 500
		res.send({
			"error": true,
			"message": "MAC address was not submitted!"
		})
		return
	}

	unifi.authUser(mac, duration)
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