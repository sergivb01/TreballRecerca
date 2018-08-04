express = require('express'),
	router = express.Router(),
	r = require('node-unifiapi'),
	unifi = r({
		baseUrl: 'https://192.168.1.200:8443',
		username: 'root',
		password: 'sergivb01_',
		debug: false,
		debugNet: false
	})


router.post('/', (req, res) => {
	let mac = req.body.mac,
		duration = 5

	if (mac == null) {
		res.send({
			"error": true,
			"message": "MAC address was not submitted!"
		})
	}

	unifi.netsite('/cmd/stamgr', { cmd: 'authorize-guest', mac: mac, minutes: duration }, {}, 'POST', 'default')
		.then(data => {
			res.send({
				"error": false,
				"message": JSON.stringify(data)
			})
			console.log(`Client has been authed with MAC ${data.mac} in AP ${data.ap}`)
		})
		.catch(error => {
			res.send({
				"error": true,
				"message": JSON.stringify(error)
			})
			console.log(`Error while trying to auth ${mac}! ${error}`)
		})
})

module.exports = router