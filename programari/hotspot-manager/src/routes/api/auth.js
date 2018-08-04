express = require('express'),
	router = express.Router(),
	r = require('node-unifiapi'),
	config = require('../../../config.json'),
	unifi = r(config.unifi)

let authUser = (mac, duration) => {
	return new Promise((resolve, reject) => {
		unifi.netsite('/cmd/stamgr', { cmd: 'authorize-guest', mac: mac, minutes: duration }, {}, 'POST', 'default')
			.then(data => {
				resolve(data)

				if (config.debug) console.log(`Client has been authed with MAC ${data.mac} in AP ${data.ap}`)
			})
			.catch(err => {
				reject(err)

				if (config.debug) console.log(`Error while trying to auth ${mac}! ${error}`)
			})
	})
}

router.post('/', (req, res) => {
	let mac = req.body.mac,
		duration = 5

	if (mac == null) {
		res.send({
			"error": true,
			"message": "MAC address was not submitted!"
		})
	}

	authUser(mac, duration)
		.then(data => {
			res.send({
				"error": false,
				"message": JSON.stringify(data)
			})
		}).catch(err => res.send({
			"error": true,
			"message": err
		}))

})


module.exports = router