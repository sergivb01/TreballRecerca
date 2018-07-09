const express = require('express'),
	router = express.Router(),
	os = require('os')

let unifi = require('node-unifiapi')({
	baseUrl: 'https://192.168.1.200:8443', // The URL of the Unifi Controller
	username: 'root',
	password: 'sergivb01_',
	debug: false,
	debugNet: false
})

/**
 * Get status about unifi
 *
 * @returns Data in JSON format
 */
router.get('/status', (req, res) => {
	unifi.stat_sites().then((data) => {
		res.send(data);
	}).catch(err => res.send(err))
})

/**
 * Get health about system
 *
 * @returns Data in JSON format
 */
router.get('/health', (req, res) => {
	unifi.list_health().then((data) => {
		res.send(data)
	}).catch(err => res.send(err))
})

/**
 * Get system information
 *
 * @returns Data in JSON format
 */
router.get('/os', (req, res) => {
	res.json({
		"hostname": os.hostname(),
		"uptime": os.uptime(),
		"load": os.loadavg(),
		"os": {
			"type": os.type(),
			"platform": os.platform(),
			"arch": os.arch(),
			"release": os.release()
		},
		"memory": {
			"free": os.freemem(),
			"total": os.totalmem()
		},
		"cpu": os.cpus()
	})
})


module.exports = router
