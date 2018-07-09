const express = require('express'),
	router = express.Router(),
	os = require('os')

/**
 * Get system information
 *
 * @returns Data in JSON format
 */
router.get('/os', (req, res) => {
	res.json({
		"hostname": os.hostname(),
		"uptime": os.uptime(),
		"load": os.loadavg(),
		"os": {
			"type": os.type(),
			"platform": os.platform(),
			"arch": os.arch(),
			"release": os.release()
		},
		"memory": {
			"free": os.freemem(),
			"total": os.totalmem()
		},
		"cpu": os.cpus()
	})
})

module.exports = router
