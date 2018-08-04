const express = require('express'),
	app = express(),
	morgan = require('morgan'),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	accessLogStream = fs.createWriteStream(
		path.join(__dirname, '../logs/access.log'), {
			flags: 'a', autoClose: true
		}
	)

morgan.token('remote-addr', (req) => { //Running under reverse proxy
	return req.headers['x-real-ip']
		|| req.headers['x-forwarded-for']
		|| req.connection.remoteAddress
})

app.use(
	morgan('combined', { //Log saver
		stream: accessLogStream
	}),
	morgan('dev'), //Log into console
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes/routers'))

//404 handler
app.use((req, res, next) => {
	res.json({
		"error": true,
		"message": "Invalid API usage or 404."
	})
	next()
})

// error handler
app.use((err, req, res, next) => {
	res.json({
		"error": true,
		"message": err
	})
	console.log(err)
})

module.exports = app