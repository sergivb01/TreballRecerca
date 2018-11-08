const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	config = require('../../../config.json'),
	History = require('../../models/history'),
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
	let details = req.session.details,
		user = req.user

	if (details) {
		new History({
			username: user.username,
			googleId: user.googleId,
			mac: details.mac,
			ap: details.ap
		}).save().then((newHistory) => {
			if (config.debug) console.info(`New history for ${user.username}! ${newHistory}`)
		})

		unifi.authUser(details.mac, 60)
			.then(data => {
				if (config.debug) console.info(`Client has been authed with MAC ${mac} in AP ${data.ap}`)
			}).catch(err => {
				if (config.debug) console.error(`Error while trying to auth ${mac}! ${error}`)
			})
	}

	req.session.authed = (details != null)
	req.session.save()

	return res.redirect('/statistics')
})

module.exports = router