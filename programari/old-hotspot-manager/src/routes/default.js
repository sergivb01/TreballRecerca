const express = require('express'),
	router = express.Router()

let isLoggedIn = (req, res, next) => {
	return (req.user != null) ? next() : res.redirect('/')
}

router.get('/', (req, res) => {
	return res.render('index', {
		"loggedIn": req.user != null,
		authed: req.session.authed,
		mac: (req.session.details != null ? req.session.details.mac : "none")
	})
})

router.get('/statistics', isLoggedIn, (req, res) => {
	return res.render('statistics',
		{
			authed: req.session.authed,
			mac: (req.session.details ? req.session.details.mac : null)
		}
	)
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