const express = require('express'),
	router = express.Router(),
	passport = require('passport')

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/login')
	} else {
		next()
	}
}

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
	scope: ['email profile']
}))

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/profile')
})


module.exports = router