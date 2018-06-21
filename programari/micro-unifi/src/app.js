let unifi = require('node-unifiapi')({
	baseUrl: 'https://127.0.0.1:8443', // The URL of the Unifi Controller
	username: 'ubnt',
	password: 'ubnt',
	debug: false,
	debugNet: false
});

let run = () => {
	unifi.stat_sites().then((data) => {
		console.log(JSON.stringify(data))
	})
}

setInterval(run, 1000);