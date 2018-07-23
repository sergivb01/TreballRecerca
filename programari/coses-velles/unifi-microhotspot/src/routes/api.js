const log = require('consola'),
	express = require('express'),
	router = express.Router(),
	r = require('node-unifiapi')

let unifi = r({
	baseUrl: 'https://192.168.1.30:8443',
	username: 'admin',
	password: 'sergivb01tr',
	debug: false,
	debugNet: false
})

router.get('/groups', (req, res) => {
	unifi.list_usergroup().then((data => {
		res.send(data)
	}))
})

router.get('/status', (req, res) => {
	unifi.stat_sites().then((data) => {
		res.send(data)
	})
})

router.get('/clients', (req, res) => {
	unifi.list_clients().then((data) => {
		res.send(data)
	})
})

router.get('/health', (req, res) => {
	unifi.list_health().then((data) => {
		res.send(data)
	})
})

router.get('/set_group/:userid/:groupid', (req, res) => {
	unifi.set_usergroup(req.params.userid, req.params.groupid).then((data) => {
		res.send(data)
	})
})

router.post('/auth', (req, res) => {
	let mac = req.session.mac ? req.session.mac : req.query.mac
	let ap = req.session.ap ? req.session.ap : req.query.ap
	let time = req.session.time ? req.session.time : req.query.time
	let url = req.query.url ? req.session.url : req.query.url
	let ssid = req.query.ssid ? req.session.ssid : req.query.ssid

	let duration = 5

	unifi.netsite('/cmd/stamgr', { cmd: 'authorize-guest', mac: mac, minutes: duration }, {}, 'POST', 'default')
		.then(data => {
			res.send({
				"error": false,
				"message": JSON.stringify(data)
			})
			log.info(`Client has been authed with MAC ${data.mac} in AP ${data.ap}`)
		})
		.catch(error => {
			res.send({
				"error": true,
				"message": JSON.stringify(error)
			})
			log.error(`Error while trying to auth ${mac}! ${error}`)
		})

})

module.exports = router
