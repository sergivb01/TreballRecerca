let COLORS;

document.addEventListener('DOMContentLoaded', () => {
	updateColors()
	createQueriesChart()
	createQueriesTypesChart()
	createAPsChart()
})

let
	updateColors = () => {
		getJSON("/assets/data/colors.json", (err, data) => {
			COLORS = data
		})
	},
	createQueriesChart = () => {
		let details = {
			"domains_over_time": "Domains",
			"ads_over_time": "Ads"
		}

		fetch("http://127.0.0.1/api/pihole/overtime")
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				let data = [], c = 0
				Object.keys(details).forEach(entry => {
					if (c >= COLORS.length) c = 0 //Prevent getting out of colors, starting again

					data.push({
						label: details[entry],
						fill: false,
						backgroundColor: COLORS[c],
						borderColor: COLORS[c],
						data: Object.values(json[entry])
					})

					c++
				})

				let labels = Object.keys(json[Object.keys(details)[0]]).map(unixtimestamp => {
					let date = moment.unix(unixtimestamp).toDate()
					return date
				})
				createNewChart("domainsAds", "line", "Domains and Ads over time", labels, data, {
					"xAxes": [
						{
							"type": "time",
							"time": {
								"format": "timeFormat",
								"unitStepSize": 1,
								"tooltipFormat": "ll HH:mm"
							},
							"scaleLabel": {
								"display": true,
								"labelString": "Date"
							}
						}
					],
					"yAxes": [
						{
							"scaleLabel": {
								"display": true,
								"labelString": "value"
							}
						}
					]
				})
			})
	},
	createQueriesTypesChart = () => {
		let details = {
			"querytypes": "Query Types"
		}

		fetch("http://127.0.0.1/api/pihole/querytypes")
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				let data = [], c = 0, map = json[Object.keys(details)[0]]
				delete map["ANY"]

				data.push({
					label: "test",
					fill: false,
					backgroundColor: COLORS.slice(0, Object.keys(map).length),
					borderColor: COLORS.slice(0, Object.keys(map).length),
					data: Object.values(map)
				})

				let labels = Object.keys(json[Object.keys(details)[0]])

				createNewChart("queryResponses", "doughnut", "Query Types", labels, data, [])
			})
	},
	createAPsChart = () => {
		let details = {
			"data": "Usage"
		}

		fetch("http://127.0.0.1/api/unifi")
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				let data = [], c = 0, labels = []

				let map = json[Object.keys(details)[0]]


				createNewChart("apUsage", "line", "APs usage", [], [], {
					"xAxes": [
						{
							"type": "time",
							"time": {
								"format": "timeFormat",
								"tooltipFormat": "ll HH:mm"
							},
							"scaleLabel": {
								"display": true,
								"labelString": "Date"
							}
						}
					],
					"yAxes": [
						{
							"scaleLabel": {
								"display": true,
								"labelString": "value"
							}
						}
					]
				})
			})
	},
	/*createChart = (chart, json) => {
		let data = []

		if (Object.keys(chart.data).length > 1) {
			let c = 0
			Object.keys(chart.data).forEach(entry => {
				if (c >= COLORS.length) c = 0 //Prevent getting out of colors, starting again

				data.push({
					label: chart.data[entry],
					fill: false,
					backgroundColor: COLORS[c],
					borderColor: COLORS[c],
					data: Object.values(json[entry])
				})

				c++
			})
		} else {
			let map = json[Object.keys(chart.data)[0]]
			if (map["any"] != "") delete map["ANY"] //remove shitty query response

			//TODO: fix if req colors > colors in list
			data.push({
				label: "test",
				fill: false,
				backgroundColor: COLORS.slice(0, Object.keys(map).length),
				borderColor: COLORS.slice(0, Object.keys(map).length),
				data: Object.values(map)
			})
			console.log(data)
		}

		let labels
		if (chart.label == "time") {
			labels = Object.keys(json[Object.keys(chart.data)[0]]).map(unixtimestamp => {
				let date = moment.unix(unixtimestamp).toDate()
				return date
			})
		} else if (chart.label == "char") {
			labels = Object.keys(json[Object.keys(chart.data)[0]])
		}

		createNewChart(chart.element, chart.type, chart.title, labels, data, chart.scales)
	},*/


	createNewChart = (element, type, title, labelList, data, scalesList) => {
		new Chart(document.getElementById(element).getContext('2d'), {
			type: type,
			data: {
				labels: labelList,
				datasets: data
			},
			options: {
				animation: {
					duration: 1750,
					animateScale: true,
					animateRotate: true
				},
				responsive: true,
				title: {
					display: true,
					text: title,
					position: "top"
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'point',
					intersect: true
				},
				legend: {
					display: false,
					position: "bottom"
				},
				scales: scalesList
			}
		})
	},
	getJSON = (url, callback) => {
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