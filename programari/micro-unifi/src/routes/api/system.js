const express = require('express'),
	router = express.Router()

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
	})
})

/**
 * Get health about system
 *
 * @returns Data in JSON format
 */
router.get('/health', (req, res) => {
	unifi.list_health().then((data) => {
		res.send(data)
	})
})


module.exports = router
