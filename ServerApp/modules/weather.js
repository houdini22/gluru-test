const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/'
})
const apikey = '8610cab3feb269bb5ad856d1cf28c33f'

const byCityId = (id) => {
  return new Promise((resolve, reject) => {
    instance.get('/data/2.5/weather', {
      params: {
        id,
        apikey,
        units: 'metric'
      }
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

exports.byCityId = byCityId
