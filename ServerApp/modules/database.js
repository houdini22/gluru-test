const database = require('../data/database.json')
const autocomplete = require('../data/autocomplete.json')
const similarity = require('../modules/string-similarity')

const query = (query, offset) => {
  const result = []
  database
    .map((obj) => {
      return {
        ...obj,
        score: similarity.similarity(query, obj.description)
      }
    })
    .sort((objA, objB) => {
      return objB.score - objA.score
    })
    .filter((obj) => {
      return obj.score > 0.51 // threshold
    })
    .slice(Number(offset), Number(offset) + 12)
    .forEach((obj) => {
      result.push(obj)
    })
  return result
}

const getAutocomplete = () => {
  const result = {
    id: 'search-query-autocomplete',
    items: []
  }
  autocomplete.forEach((str) => {
    result.items.push({
      value: str,
      label: str
    })
  })
  return result
}

exports.query = query
exports.getAutocomplete = getAutocomplete
