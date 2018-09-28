const r = require('node-unifiapi'),
	config = require('../../config.json'),
	unifi = r(config.unifi)

let authUser = (mac) => {
	return new Promise((resolve, reject) => {
		unifi.netsite('/cmd/stamgr', { cmd: 'authorize-guest', mac: mac, minutes: config.duration }, {}, 'POST', 'default')
			.then(data => {
				resolve(data)
			})
			.catch(err => {
				reject(err)
			})
	})
}

module.exports = {
	authUser
}