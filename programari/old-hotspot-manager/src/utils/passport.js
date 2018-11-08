const passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20').Strategy,
	User = require('../models/user'),
	config = require('../../config.json')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})

passport.use(
	new GoogleStrategy(config.google, (accessToken, refreshToken, profile, done) => {
		let isEmailValid = profile.emails[0].value.endsWith(`@${config.email}`)

		//console.log(`User ID ${profile.id} has email ${profile.emails} and its primary email insti = ${insti}`)

		User.findOne({ googleId: profile.id }).then((currentUser) => {
			if (!isEmailValid) done(new Error("Wrong domain!", "The used email is not valid"))

			if (currentUser) { //User already exists in the database
				if (config.debug) console.info(`An already registered user has just logged in! ${currentUser}`)

				done(null, currentUser)
			} else { //User is new, create profile
				new User({
					googleId: profile.id,
					username: profile.displayName,
					email: profile.emails[0].value,
					thumbnail: profile._json.image.url
				}).save().then((newUser) => {
					if (config.debug) console.info(`A new user has been registered and logged in! ${newUser}`)

					done(null, newUser)
				})
			}
		})
	})
)