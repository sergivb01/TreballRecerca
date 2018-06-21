const express = require('express'),
	log = require('consola'),
	app = express(),
	morgan = require('morgan'),
	fs = require('fs'),
	path = require('path'),
	accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' }),
	mongoose = require('mongoose')

/*mongoose.connect('mongodb://localhost/tr-sergi').then(() => {
	log.info(`Successfuly connected to MongoDB`)
}).catch((err) => {
	log.error(err)
})*/

morgan.token('remote-addr', (req) => { //Running under reverse proxy
	return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
})

app.use(
	require('express-session')({
		cookie: {
			maxAge: 1800000,
			httpOnly: true
		},
		rolling: true,
		resave: true,
		saveUninitialized: true,
		secret: 'mashitlol'
	}),
	morgan('combined', { //Log saver
		stream: accessLogStream
	}),
	morgan('dev'), //Log into console
)

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/guest', require('./routes/guest'))
app.use('/api', require('./routes/api'))

//404 handler
/*app.use((req, res, next) => {
	res.json({
		"error": true,
		"message": "Invalid API usage or 404."
	})
	next()
})*/

// error handler
app.use((err, req, res, next) => {
	log.error(err)
	res.json({
		"error": true,
		"message": err
	})
})

module.exports = app