const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const weatherApi = require('../modules/weather')
const database = require('../modules/database')

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function (req, res) {
  if (!req.query.query) {
    res.status(400)
  } else {
    res.status(200)
  }

  const offset = req.query.offset || 0
  const cities = database.query(req.query.query, offset)
  res.json(cities)
})

router.get('/autocomplete', (req, res) => {
  res.status(200).json(database.getAutocomplete())
})

exports.router = router
