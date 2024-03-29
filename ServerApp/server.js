const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// config
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
const port = 3001 // TODO: config

// routes
const SearchController = require('./controllers/search')
app.use('/search', SearchController.router)

const server = {
  instance: null
}

const start = () => {
  server.instance = app.listen(port, function () {
    console.log('Express server listening on port ' + port)
  })
}

exports.start = start
