const express = require('express'),
	router = express.Router(),
	User = require('../../models/user')

router.get('/:param', (req, res) => {
	console.log(req.user.googleId)

	let entry = {
		mac: "abcdef",
		timestamp: Date.now()
	}

	User.findOneAndUpdate({
		googleId: req.user.googleId
	}, { $push: { macs: entry } }, (result) => {
		res.send(result)
	})
})

module.exports = router