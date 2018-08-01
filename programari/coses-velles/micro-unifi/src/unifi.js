const UnifiEvents = require('unifi-events')

let unifi = new UnifiEvents({
	controller: 'https://192.168.1.40:8443',
	username: 'test',
	password: 'test123',
	site: 'default',
	rejectUnauthorized: false,
	listen: true
})

let debug = (str) => {
	log.info(str)
}

unifi.on('websocket-status', (socketLog) => {
	debug(socketLog)
})

unifi.on('connected', (data) => {
	debug(`Device Connected Event Received from UniFi Controller: ${data.msg} - ${JSON.stringify(data)}`)
})

unifi.on('disconnected', (data) => {
	debug(`Device Disconnected Event Received from UniFi Controller: ${data.msg}`)
})