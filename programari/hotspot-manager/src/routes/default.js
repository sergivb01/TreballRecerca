const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	unifi = require('../utils/unifi'),
	User = require('../models/user')

const authCheck = (req, res, next) => {
	if (!req.user)
		res.redirect('/auth/google')
	else
		next()
}

router.get('/', (req, res) => {
	res.send(`<a href="/auth/google">Log in</a>`)
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

router.get('/profile', authCheck, (req, res) => {
	res.send(req.session.details)
})

router.get('/auth/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/auth/google', passport.authenticate('google', {
	hd: "ieslabisbal.cat",
	prompt: 'select_account',
	scope: ['email profile']
}))

router.get('/auth/google/redirect', passport.authenticate('google', {
	hd: "ieslabisbal.cat",
	prompt: 'select_account',
	scope: ['email profile']
}), (req, res) => {
	let details = req.session.details

	unifi.authUser(details.mac, 60)

	res.redirect('/profile')
})


module.exports = router