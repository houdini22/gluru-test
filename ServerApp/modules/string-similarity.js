// https://gist.github.com/robertknight/5410420
// modified

const __DEBUG__ = false

const log = (...args) => {
  if (__DEBUG__) {
    console.log.apply(null, args)
  }
}

const synonyms = {
  'clear': {
    1: ['sunny'],
    0.5: ['bright', 'glowing'],
    0.8: ['dry'] // not sure if weather history exists, it possibly should depends on when the last rain occurs
  },
  'clouds': {
    1: ['cloud'],
    0.2: ['rain']
  },
  'rain': {
    0.75: ['cloud', 'clouds'],
    1: ['thunderstorm'],
    0.8: ['deluge', 'drizzle', 'flood', 'hail', 'mist', 'monsoon', 'precipitation', 'rainfall', 'rainstorm', 'shower', 'showers', 'sleet', 'stream',
      'torrent', 'cloudburst', 'condensation', 'fall', 'flurry', 'pour', 'pouring', 'raindrops', 'sheets', 'spate', 'spit', 'sprinkle', 'sprinkling',
      'volley', 'cat-and-dog weather', 'drencher', 'heavy dew', 'liquid sunshine', 'precip', 'sun shower', 'wet stuff', 'window washer', 'sprinkle',
      'patter', 'bucket', 'pour', 'shower', 'lavish', 'bestow', 'hail', 'storm', 'fall', 'mist', 'drizzle', 'deposit', 'sleet',
      'come down in buckets']
  },
  'storm': {
    1: ['thunderstorm']
  },
  'light': {
    0: ['heavy'] // negation here?
  },
  'heavy': {
    0: ['light'] // ^
  }
}

function findSynonym (word) {
  const result = [null, null]
  Object.keys(synonyms).forEach((desiredWord) => {
    const weightObj = synonyms[desiredWord]
    Object.keys(weightObj).forEach((weight) => {
      if (weightObj[weight].indexOf(word) !== -1) {
        result[0] = desiredWord
        result[1] = Number(weight)
        return false
      }
    })
  })
  if (result[0]) {
    log('found synonym', result)
  }
  return result
}

function termFreqMap (str, compareTo = false) {
  const words = str.split(/\s+/)
  const termFreq = {}
  words.forEach(function (word) {
    let set = false
    if (compareTo && typeof compareTo[word] === 'undefined') {
      const [word2, weight] = findSynonym(word)
      if (word2) {
        termFreq[word2] = (termFreq[word2] || 0) + weight
        set = true
      }
    }
    if (!set) {
      termFreq[word] = (termFreq[word] || 0) + 1
    }
  })
  return termFreq
}

function addKeysToDict (map, dict) {
  for (let key in map) {
    dict[key] = true
  }
}

function termFreqMapToVector (map, dict) {
  const termFreqVector = []
  for (let term in dict) {
    termFreqVector.push(map[term] || 0)
  }
  return termFreqVector
}

function vecDotProduct (vecA, vecB) {
  let product = 0
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i]
  }
  return product
}

function vecMagnitude (vec) {
  let sum = 0
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i]
  }
  return Math.sqrt(sum)
}

function cosineSimilarity (vecA, vecB) {
  return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB))
}

function textCosineSimilarity (strA, strB) {
  log('testing:', strA, strB)

  const termFreqB = termFreqMap(strB)
  const termFreqA = termFreqMap(strA, termFreqB)

  log('termFreqMap', termFreqA, termFreqB)

  const dict = {}
  addKeysToDict(termFreqA, dict)
  addKeysToDict(termFreqB, dict)

  log('dict', dict)

  const termFreqVecA = termFreqMapToVector(termFreqA, dict)
  const termFreqVecB = termFreqMapToVector(termFreqB, dict)

  log('termFreqMapToVector', termFreqVecA, termFreqVecB)

  return cosineSimilarity(termFreqVecA, termFreqVecB)
}

exports.similarity = textCosineSimilarity
