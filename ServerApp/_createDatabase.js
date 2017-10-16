const fs = require('fs')
const contents = fs.readFileSync('./ids.json')
const ids = JSON.parse(contents)

const http = require('./modules/weather')
const savedData = []

const next = (current) => {
  http.byCityId(ids[current]).then((data) => {
    savedData.push({
      name: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description.replace('intensity ', ''), // "light|heavy intensity rain" fetched, "intensity" have no sense here
                                                                          // ... for now
    })
    console.log(current / ids.length * 100)
    fs.writeFileSync('database.json', JSON.stringify(savedData))
    setTimeout(() => {
      next(current + 1)
    }, 250)
  }).catch(() => {
    setTimeout(() => {
      next(current + 1)
    }, 250)
  })
}

next(0)
