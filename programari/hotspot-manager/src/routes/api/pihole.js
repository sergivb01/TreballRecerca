const express = require('express'),
	router = express.Router(),
	request = require('request'),
	baseURL = 'http://192.168.1.100/admin/api.php?auth=e9d357da3006bef65f91d01922a1907b8ccaf1bd4214b4352f75f9c1ab9ebdee'


router.get('/', (req, res) => {
	return req.pipe(
		request(`${baseURL}&summaryRaw`))
		.pipe(res)
})

router.get('/destinations', (req, res) => {
	return req.pipe(
		request(`${baseURL}&getForwardDestinations`))
		.pipe(res)
})

router.get('/overtime', (req, res) => {
	return req.pipe(
		request(`${baseURL}&overTimeData10mins`))
		.pipe(res)
})

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

router.get('/querytypes', (req, res) => {
	return req.pipe(
		request(`${baseURL}&getQueryTypes`))
		.pipe(res)
})

module.exports = router