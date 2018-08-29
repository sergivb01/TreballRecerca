const express = require('express'),
	router = express.Router(),
	r = require('node-unifiapi'),
	config = require('../../../config.json'),
	unifi = r(config.unifi)

/*
.stat_sessions(start, end, type, site) ⇒ Estadistiques
.stat_daily_site(start, end, attrs, site) ⇒ Estadistiques site (no util)
.stat_hourly_site(start, end, attrs, site) ⇒ Estadistiques site (no util)
.stat_hourly_ap(start, end, attrs, site) ⇒ Estadistiques hores AP
.stat_sta_sessions_latest(mac, limit, sort, site) ⇒ Ultimes sessions AP
.stat_allusers(historyhours, site) ⇒ Cada usuari, estadisitques (no es pot fer servir a no ser que es netegin dades)
 */
router.get('/', (req, res) => {
	unifi.stat_hourly_ap()
		.then(done => res.send(done))
		.catch(err => console.log('Error', err))
})

router.get('/aps', (req, res) => {
	unifi.list_aps()
		.then(done => res.send(done))
		.catch(err => console.log('Error', err))
})

module.exports = router