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

router.use('/graph/:type', (req, res) => {
	//TODO: Check security on this
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