const r = require('node-unifiapi'),
	config = require('../../config.json'),
	unifi = r(config.unifi)

let authUser = (mac, duration) => {
	return new Promise((resolve, reject) => {
		unifi.netsite('/cmd/stamgr', { cmd: 'authorize-guest', mac: mac, minutes: duration }, {}, 'POST', 'default')
			.then(data => {
				resolve(data)

				if (config.debug) console.log(`Client has been authed with MAC ${data.mac} in AP ${data.ap}`)
			})
			.catch(err => {
				reject(err)

				if (config.debug) console.log(`Error while trying to auth ${mac}! ${error}`)
			})
	})
}

module.exports = {
	authUser
}