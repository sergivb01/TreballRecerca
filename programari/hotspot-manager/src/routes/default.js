const express = require('express'),
	router = express.Router(),
	fileUtils = require('../utils/files')

const authCheck = (req, res, next) => {
	if (!req.user)
		res.redirect('/')
	else
		next()
}

router.get('/', (req, res) => {
	res.sendFile(fileUtils.getFile('index'))
})

router.get('/statistics', (req, res) => {
	res.sendFile(fileUtils.getFile('statistics'))
})

router.get('/debug', (req, res) => {
	res.send({
		"session": req.session,
		"user": req.user
	})
})

router.get('/guest/s/default', (req, res) => {
	req.session.details = {
		"mac": req.query.id,
		"ap": req.query.ap,
		"time": req.query.t,
		"ssid": req.query.ssid,
		"url": req.query.url
	}
	req.session.save()

	res.redirect('/')
})

module.exports = router