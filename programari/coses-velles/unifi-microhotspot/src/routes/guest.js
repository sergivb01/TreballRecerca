const express = require('express'),
	router = express.Router()

/* GET home page. */
router.get('/s/default/', (req, res, next) => {
	/*
	Sample:
	localhost
		?id=20:aa:4b:95:bc:9d
		&ap=00:27:22:e4:ce:79
		&t=1363610350
		&url=http://facebook.com/
		&ssid=Test%20SSID
	*/

	res.send(`
		<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Ma hotspot</title>
</head>

<body>
	<h1>${JSON.stringify(req.query)}</h1>
	<h1>${JSON.stringify(req.session)}</h1>
	<form name="login" action="/api/auth" method="post">
		<input id="submit" type="submit" name="submit" value="Connect" />
	</form>
</body>

</html>
	`)
	if (req.query) {
		req.session.mac = req.query.id
		req.session.ap = req.query.ap
		req.session.time = req.query.t
		req.session.url = req.query.url
		req.session.ssid = req.query.ssid
		req.session.save()
	}
})


module.exports = router
