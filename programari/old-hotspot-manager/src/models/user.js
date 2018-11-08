const mongoose = require('mongoose'),
	Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	googleId: String,
	thumbnail: String,
	email: String,
	macs: [{
		mac: {
			type: String,
			required: true
		},
		timestamp: {
			type: Date,
			default: Date.now(),
			required: true
		}
	}],
	role: {
		type: String,
		enum: ['user', 'admin', 'superadmin'],
		default: 'user'
	}
})

const User = mongoose.model('user', userSchema)

module.exports = User
