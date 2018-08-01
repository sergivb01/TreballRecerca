const request = require('request')

let run = () => {
	request('http://localhost:8080/api/smthing', (err, res, body) => {
		if (err) console.log(err)

		let data = JSON.parse(body)

		if (data == null) {
			console.log(`Failed to parse JSON ${body}`)
			return
		}

		//TODO: Do shit with data
	})
}

run()