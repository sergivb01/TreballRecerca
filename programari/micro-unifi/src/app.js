const express = require('express'),
	log = require('consola'),
	app = express(),
	morgan = require('morgan'),
	fs = require('fs'),
	path = require('path'),
	accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

morgan.token('remote-addr', (req) => { //Running under reverse proxy
	return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
})

app.use(
	morgan('combined', { //Log saver
		stream: accessLogStream
	}),
	morgan('dev'), //Log into console
)

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
	log.error(err)
	res.json({
		"error": true,
		"message": err
	})
})

module.exports = app