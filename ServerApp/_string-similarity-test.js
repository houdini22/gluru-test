const similarity = require('./modules/string-similarity')

console.log('clear sky', 'vs', 'clear sky', similarity.similarity('clear sky', 'clear sky')) // perfect match
console.log('sunny sky', 'vs', 'clear sky', similarity.similarity('sunny sky', 'clear sky')) // should be perfect match
console.log('bright sky', 'vs', 'clear sky', similarity.similarity('bright sky', 'clear sky')) // non perfect but ok with this weight
console.log('none sure', 'vs', 'clear sky', similarity.similarity('none sure', 'clear sky')) // should be none
console.log('blue sky', 'vs', 'clear sky', similarity.similarity('blue sky', 'clear sky')) // none keywords but sky common so 50/50 (???)
console.log('sunny', 'vs', 'clear sky', similarity.similarity('sunny', 'clear sky')) // ...
console.log('bright', 'vs', 'clear sky', similarity.similarity('bright', 'clear sky')) // ...
console.log('one two', 'vs', 'three two', similarity.similarity('one two', 'three two')) // just for sure 50/50
console.log('sunny and dry', 'vs', 'clear sky', similarity.similarity('sunny and dry', 'clear sky')) // ~0.6?
console.log('sunny all', 'vs', 'clear none', similarity.similarity('sunny all', 'clear none')) // ???
console.log('heavy clouds', 'vs', 'heavy rain', similarity.similarity('heavy clouds', 'heavy rain'))
console.log('light rain', 'vs', 'heavy rain', similarity.similarity('light rain', 'heavy rain'))
console.log('light rain', 'vs', 'light rain', similarity.similarity('light rain', 'light rain'))
console.log('flurry', 'vs', 'rain', similarity.similarity('flurry', 'rain'))
console.log('light flurry', 'vs', 'light rain', similarity.similarity('light flurry', 'light rain'))
console.log('light flurry', 'vs', 'heavy rain', similarity.similarity('light flurry', 'heavy rain'))
