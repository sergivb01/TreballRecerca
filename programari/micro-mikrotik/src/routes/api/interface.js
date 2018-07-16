const express = require('express'),
	router = express.Router(),
	RouterOSClient = require('routeros-client').RouterOSClient,
	api = new RouterOSClient({
		host: "192.168.10.31",
		user: "sergi",
		password: "sergivb01"
	})

/**
 * Get details about an specific interface
 *
 * @param name Name of the interface
 *
 * @returns Data in JSON format
 */
router.get('/:name/print', (req, res) => {
	api.connect().then((client) => {
		client.menu(`/interface/print`).get()
			.then((results) => {
				results.forEach(result => {
					if (result.name === req.params.name) {
						res.send(result)
					}
				})
				api.disconnect()
			}).catch(err => {
				console.log(err)
				res.send({
					"error": true,
					"message": err
				})
			})
	}).catch(err => {
		console.log(err)
		res.send({
			"error": true,
			"message": err
		})
	})
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
				api.disconnect()
			}).catch(err => {
				console.log(err)
				res.send({
					"error": true,
					"message": err
				})
			})
	}).catch(err => {
		console.log(err)
		res.send({
			"error": true,
			"message": err
		})
	})
})

module.exports = router