const express = require('express'),
	router = express.Router(),
	config = require('../../../config.json'),
	request = require('request'),
	graphTypes = [
		'daily',
		'weekly',
		'monthly',
		'yearly'
	]

let arrayContainsValue = (arr, val) => {
	return arr.indexOf(val) > -1
}
/**
 * Get a graph from Mikrotik web interface.
 * Acts as a reverse proxy.
 *
 * @returns Fetched image in Mikrotik as GIF
 */
router.get('/graph/:type', (req, res) => {
	let type = req.params.type

	if (type == '' || !arrayContainsValue(graphTypes, type)) {
		return res.send({
			'error': true,
			'message': 'Invalid graph type'
		})
	}

	req.pipe(
		request(`${config.mikrotik.graph}/${type}.gif`))
		.pipe(res)
})

module.exports = router