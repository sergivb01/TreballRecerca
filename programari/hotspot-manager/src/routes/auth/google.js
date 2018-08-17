const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	unifi = require('../../utils/unifi')

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
	hd: "ieslabisbal.cat",
	prompt: 'select_account',
	scope: ['email profile']
}))

router.get('/google/redirect', passport.authenticate('google', {
	hd: "ieslabisbal.cat",
	prompt: 'select_account',
	scope: ['email profile']
}), (req, res) => {
	let details = req.session.details

	if (details) {
		//TODO: Redirect to a different page with popout "You have been connected" and then to /statistics
		unifi.authUser(details.mac, 60)
	}

	res.redirect('/statistics')
})

module.exports = router