let COLORS,
	SUMMARIES = [
		"dns_queries_today",
		"ads_blocked_today",
		"ads_percentage_today"
	];

document.addEventListener('DOMContentLoaded', () => {
	updateColors()
	initCharts()
	updateSummary()
})

let
	updateSummary = () => {
		fetch("/api/pihole")
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				SUMMARIES.forEach(summary => {
					let append = summary.includes("percentage")
					document.getElementById(summary).innerHTML = (append ? Math.round(json[summary] * 100) / 100 + "%" : json[summary])
				})
			})
	}
updateColors = () => {
	getJSON("/assets/data/colors.json", (err, data) => {
		COLORS = data
	})
},
	initCharts = () => {
		getJSON("/assets/data/charts.json", (err, charts) => {
			if (err) console.error(err)

			charts.forEach(chart => {
				fetch(chart.address)
					.then((res) => {
						return res.json()
					})
					.then((json) => {
						//testChart(json)
						createChart(chart, json)
					})
			})
		})
	},
	createChart = (chart, json) => {
		let data = []

		if (Object.keys(chart.data).length > 1) {
			let c = 0
			Object.keys(chart.data).forEach(entry => {
				if (c >= COLORS.length) c = 0 //Prevent getting out of colors, starting again

				data.push({
					label: chart.data[entry],
					fill: true,
					backgroundColor: COLORS[c].backgroundColor,
					borderColor: COLORS[c].backgroundColor,
					data: Object.values(json[entry])
				})

				c++
			})
		} else {
			let map = json[Object.keys(chart.data)[0]]
			if (map["any"] != "") delete map["ANY"] //remove shitty query response

			data.push({
				label: "test",
				fill: false,
				backgroundColor: COLORS.slice(0, Object.keys(map).length).map(color => color.mainColor),
				borderColor: COLORS.slice(0, Object.keys(map).length).map(color => color.mainColor),
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
	},


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