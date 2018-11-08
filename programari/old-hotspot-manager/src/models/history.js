const mongoose = require('mongoose'),
	Schema = mongoose.Schema

const histSchema = new Schema({
	username: String,
	googleId: String,
	mac: String,
	ap: String,
	timestamp: {
		type: Date,
		default: Date.now()
	}
})

const History = mongoose.model('history', histSchema)

module.exports = History
