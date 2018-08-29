/*const COLORS = [
	"rgb(54, 162, 235)", //blue
	"rgb(75, 192, 192)", //green
	"rgb(201, 203, 207)", //grey
	"rgb(255, 159, 64)", //orange
	"rgb(153, 102, 255)", //purple
	"rgb(255, 99, 132)", //red
	"rgb(255, 205, 86)", //yellow
]*/
let COLORS;

document.addEventListener('DOMContentLoaded', () => {
	updateColors()
	initCharts()
})

let
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
		let data = [], labels = [], c = 0
		Object.keys(chart.data).forEach((entry) => {
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

		createNewChart(chart.element, chart.title, [], data, chart.scales)
	}


let createNewChart = (element, title, labelList, data, scalesList) => {
	new Chart(document.getElementById(element).getContext('2d'), {
		type: 'line',
		data: {
			labels: labelList,
			datasets: data
		},
		options: {
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
				mode: 'nearest',
				intersect: true
			},
			legend: {
				display: true,
				position: "bottom"
			},
			scales: scalesList
		}
	})
}

let getJSON = (url, callback) => {
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