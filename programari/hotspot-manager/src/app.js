const express = require('express'),
	app = express(),
	morgan = require('morgan'),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	config = require('../config.json'),
	shit = require('./utils/passport')

morgan.token('remote-addr', (req) => { //Running under reverse proxy
	return req.headers['x-real-ip']
		|| req.headers['x-forwarded-for']
		|| req.connection.remoteAddress
})

app.use(
	express.static(path.join(__dirname, 'static')),
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
		stream: fs.createWriteStream(
			path.join(__dirname, '../logs/access.log'), {
				flags: 'a', autoClose: true
			}
		)
	}),
	morgan('dev'), //Log into console
	bodyParser.json(),
	bodyParser.urlencoded({ extended: true }),
	passport.initialize(),
	passport.session()
)

mongoose.connect(config.mongodb, () =>
	console.log('Connected to MongoDB successfuly!')
)

app.use(require('./routes/routers'))

//404 handler
app.use(
	(req, res, next) => {
		res.json({
			"error": true,
			"message": "Invalid API usage or 404."
		})
		next()
	}, (err, req, res, next) => {
		res.json({
			"error": true,
			"message": err
		})
		console.log(err)
	}
)

module.exports = app