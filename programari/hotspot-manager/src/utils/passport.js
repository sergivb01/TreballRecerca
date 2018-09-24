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
		let insti = profile.emails[0].value.endsWith("@ieslabisbal.cat")

		//console.log(`User ID ${profile.id} has email ${profile.emails} and its primary email insti = ${insti}`)

		User.findOne({ googleId: profile.id }).then((currentUser) => {
			if (!insti) done(new Error("Wrong domain!", "The used email is not valid"))

			if (currentUser) {
				// already have this user
				//console.log('user is: ', currentUser)
				done(null, currentUser)
			} else {
				new User({
					googleId: profile.id,
					username: profile.displayName,
					email: profile.emails[0].value,
					thumbnail: profile._json.image.url
				}).save().then((newUser) => {
					//console.log('created new user: ', newUser)
					done(null, newUser)
				})
			}
		})
	})
)