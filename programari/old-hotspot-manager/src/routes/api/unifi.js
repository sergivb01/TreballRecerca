const express = require('express'),
	router = express.Router(),
	r = require('node-unifiapi'),
	config = require('../../../config.json'),
	unifi = r(config.unifi)

/**
 * Get Access Points statuses per-hour
 *
 * @returns Data in JSON format
 */
router.get('/', (req, res) => {
	unifi.stat_hourly_ap()
		.then(done => {
			done = done.data
			res.send(done)
		})
		.catch(err => console.log('Error', err))
})

/**
 * Get list of the Access Points
 *
 * @returns Data in JSON format
 */
router.get('/aps', (req, res) => {
	unifi.list_aps()
		.then(done => res.send(done))
		.catch(err => console.log('Error', err))
})

/**
 * Get health of unifi controller
 *
 * @returns Data in JSON
 */
router.get('/health', (req, res) => {
	unifi.list_health()
		.then(done => res.send(done))
		.catch(err => console.log('Error', err))
})

module.exports = router