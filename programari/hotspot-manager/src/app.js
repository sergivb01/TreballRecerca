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

app.engine('ejs', require('ejs-blocks'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

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
	passport.session(),
)

mongoose.connect(config.mongodb, () =>
	console.log('Connected to MongoDB successfuly!')
)

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})
app.use("/assets", express.static(__dirname + "/../static/assets/"))
app.use(require('./routes/routers'))

//404 handler
app.use(

	(req, res, next) => {
		res.sendFile(path.resolve(`static/404.html`))
		//next()
	}, (err, req, res, next) => {
		res.json({
			"error": true,
			"message": err.toString()
		})
		console.log(err)
	}
)

module.exports = app