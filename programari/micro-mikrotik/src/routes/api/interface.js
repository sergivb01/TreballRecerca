const express = require('express'),
	router = express.Router(),
	RouterOSClient = require('routeros-client').RouterOSClient,
	api = new RouterOSClient({
		host: "192.168.10.31",
		user: "sergi",
		password: "sergivb01"
	})

/**
 * Get list of interfaces
 *
 * @returns Data in JSON format
 */
router.get('/print', (req, res) => {
	api.connect().then((client) => {
		client.menu("/interface/print").get()
			.then((results) => {
				res.send(results)
			}).catch(err => console.log(err))

	}).catch(err => console.log(err))
})

/**
 * Get details about an specific interface
 *
 * @param name Name of the interface
 *
 * @returns Data in JSON format
 */
//FIXME: Error: no such command prefix
router.get('/:name/print', (req, res) => {
	api.connect().then((client) => {
		client.menu(`/interface/${req.params.name}/print`).get()
			.then((results) => {
				res.send(results)
			}).catch(err => console.log(err))

	}).catch(err => console.log(err))
})



module.exports = router