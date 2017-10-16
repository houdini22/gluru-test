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

const getAutocomplete = (query = '') => {
  const result = {
    id: 'search-query-autocomplete',
    items: []
  }
  autocomplete.forEach((str) => {
    let score

    if (query) {
      const ratio = similarity.similarity(query, str)
      if (ratio < 0.2) {
        return
      }
      score = ratio
    }
    result.items.push({
      value: str,
      label: str,
      score
    })
  })
  if (query) {
    result.items = result.items.sort((objA, objB) => {
      return objB.score - objA.score
    })
  }
  return result
}

exports.query = query
exports.getAutocomplete = getAutocomplete
