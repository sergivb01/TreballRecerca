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
 * Retrive information about client stats
 *
 * @returns Data in JSON format
*/
router.get('/stats', (req, res) => {
	unifi.stat_allusers().then((data) => {
		res.send(data)
	}).catch(err => res.send(err))
})

/**
 * Retrive list of all known clients
 *
 * @returns Data in JSON format
 */
router.get('/list', (req, res) => {
	unifi.list_clients().then((data) => {
		res.send(data)
	}).catch(err => res.send(err))
})


module.exports = router
