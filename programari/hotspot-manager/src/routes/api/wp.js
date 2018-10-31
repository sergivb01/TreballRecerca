const express = require('express')
const router = express.Router()
const request = require('request')
const parseXML = require('xml2js').parseString

const parseFeed = (xml) => {
  return xml.rss.channel[0].item[0]
}

router.get('/', (req, res) => {
  request('https://agora.xtec.cat/ieslabisbal/feed/', (err, response, body) => {
    if (err) {
      return res.send({
        "error": true,
        "message": "Unable to fetch WordPress RSS Feed"
      })
    }

    parseXML(body, (err, result) => {
      if (err) {
        return res.send({
          "error": true,
          "message": "Unable to fetch WordPress RSS Feed"
        })
      }

      let parsedData = parseFeed(result)

      return res.send({
        "error": false,
        "lastPost": {
          "title": parsedData.title[0],
          "link": parsedData.link[0],
          "date": parsedData.pubDate[0],
          "description": parsedData.description[0],
          "content": parsedData['content:encoded'][0]
        }
      })
    })

  })
})

module.exports = router