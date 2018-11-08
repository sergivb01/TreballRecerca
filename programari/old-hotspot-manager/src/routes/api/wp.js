const express = require('express')
const router = express.Router()
const request = require('request')
const parseXML = require('xml2js').parseString
const POST_LIMIT = 10

const parseFeed = (xml) => {
  return xml.rss.channel[0].item.slice(0, POST_LIMIT).map(post => {
    return {
      "title": post.title,
      "link": post.link,
      "date": post.pubDate,
      "description": post.description,
      "content": post['content:encoded']
    }
  })
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

      return res.send({
        "error": false,
        "latestPosts": parseFeed(result)
      })
    })

  })
})

module.exports = router