let unifi = require('node-unifiapi')({
	baseUrl: 'https://192.168.1.200:8443', // The URL of the Unifi Controller
	username: 'root',
	password: 'sergivb01_',
	debug: false,
	debugNet: true
});

let run = () => {
	unifi.stat_sites().then((data) => {
		let dat = JSON.stringify(data)
		console.log(`Data is ${dat}`)
	})
}

run()
//setInterval(run, 1000);