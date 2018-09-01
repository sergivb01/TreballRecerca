const GENERAL_STATISTICS = [
	'TOTAL_USERS',
	'ONLINE_USERS',
	'TOTAL_DNS_QUERIES',
	'BLOCKED_DNS_QUERIES',
	'BLOCKED_DNS_PERCENTAGE'
]

document.addEventListener('DOMContentLoaded', () => {
	loadJSON("/responses/general.json", (status, data) => {
		console.log(status, data)
		GENERAL_STATISTICS.map(s => s.toLowerCase()).forEach(stat => {
			document.getElementById(`statistic-${stat}`).innerHTML = data.results[stat]
		})
	})
})

//development - will load JSON using fetch from backend api
let loadJSON = (url, callback) => {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.responseType = 'json'
	xhr.onload = () => {
		var status = xhr.status
		if (status === 200) {
			callback(null, xhr.response)
		} else {
			callback(status, xhr.response)
		}
	}
	xhr.send()
}