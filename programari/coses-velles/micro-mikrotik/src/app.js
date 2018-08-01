const express = require('express'),
	app = express(),
	morgan = require('morgan'),
	fs = require('fs'),
	path = require('path'),
	accessLogStream = fs.createWriteStream(
		path.join(__dirname, '../logs/access.log'), {
			flags: 'a', autoClose: true
		}
	),
	RateLimit = require('express-rate-limit')

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


let limiter = new RateLimit({
	windowMs: 5 * (60 * 1000),
	max: 15,
	delayMs: 1000,
	message: `{
		"error": true,
		"message": "Too many requests, please try again later."
	}`
})

app.use(limiter)
app.use('/api', require('./routes/api'))

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