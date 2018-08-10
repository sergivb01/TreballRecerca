const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	unifi = require('../utils/unifi')

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/login')
	} else {
		next()
	}
}
/*
/guest/s/default/
?id=78:02:f8:3e:05:b4
&ap=78:8a:20:20:4b:2a
&t=1533852418
&url=https://sergivb01.me
&ssid=sergivb01-tr
*/
router.get('/guest/s/default', (req, res) => {
	let details = {
		mac: req.query.id,
		ap: req.query.ap,
		url: req.query.url,
		ssid: req.query.ssid
	}
	req.session.details = details

	res.redirect('/auth/google')
})

router.get('/profile', authCheck, (req, res) => {
	res.send(req.user)
})

router.get('/auth/login', (req, res) => {
	res.redirect('/auth/google')
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
	unifi.authUser(details.mac, 6000)
	res.redirect('/profile')
})


module.exports = router