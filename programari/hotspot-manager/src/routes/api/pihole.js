const express = require('express'),
	router = express.Router(),
	request = require('request'),
	baseURL = 'http://192.168.1.100/admin/api.php?auth=e9d357da3006bef65f91d01922a1907b8ccaf1bd4214b4352f75f9c1ab9ebdee'

/**
 * Get the summary of PiHole in raw format
 *
 * @returns Data in JSON format
 */
router.get('/', (req, res) => {
	return req.pipe(
		request(`${baseURL}&summaryRaw`))
		.pipe(res)
})

/**
 * Get list of forwarded destinations
 *
 * @returns Data in JSON format
 */
router.get('/destinations', (req, res) => {
	return req.pipe(
		request(`${baseURL}&getForwardDestinations`))
		.pipe(res)
})

/**
 * Get data from the last 10 minutes
 *
 * @returns Data in JSON format
 */
router.get('/overtime', (req, res) => {
	return req.pipe(
		request(`${baseURL}&overTimeData10mins`))
		.pipe(res)
})

/**
 * Get list of the top items
 *
 * @param max Number of results
 * @returns Data in JSON format
 */
router.get('/topitems/:max', (req, res) => {
	let max = req.params.max
	if (!max || max > 25) {
		return res.send({
			"error": true,
			"message": "Max topitems may not be higher than 25"
		})
	}

	return req.pipe(
		request(`${baseURL}&topItems=`))
		.pipe(res)
})

/**
 * Get list of query types
 *
 * @returns Data in JSON format
 */
router.get('/querytypes', (req, res) => {
	return req.pipe(
		request(`${baseURL}&getQueryTypes`))
		.pipe(res)
})

module.exports = router