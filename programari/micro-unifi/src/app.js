let unifi = require('node-unifiapi')({
	baseUrl: 'https://192.168.1.200:8443', // The URL of the Unifi Controller
	username: 'root',
	password: 'sergivb01_',
	debug: false,
	debugNet: false
});

let run = () => {
	/*unifi.list_clients().then((data) => {
		let dat = JSON.stringify(data)
		console.log(`Data is ${dat}`)
	})*/

	unifi.stat_allusers().then((data) => {
		let dat = JSON.stringify(data)
		console.log(`Data is ${dat}`)
	})
}

run()
//setInterval(run, 1000);