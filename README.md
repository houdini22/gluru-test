## Installation

```
npm install
```

## Requirements

Tested on:

* node `^8.6.0`
* npm `^5.5.1`

## Run app
```
npm start
npm server:start
```

## Description

The application was created partially from react-redux-boilerplate.

I didn't implement icons - just can't find similar. I hope that's no big issue for
test purposes. Also lint and tests are not available in this version.

Because of limitations of the external API's i have decided to download
whole database from https://api.openweathermap.org/ and use fetched data
in the application.

###### NLP

I have no previous experience in NLP. But I have created something that i'm
not sure if it is NLP but it produces reasonable search results for given query.

I have created modified version of cosine string similarity. It is synonym
sensitive. I'm just comparing user query with stored description.
Check ```ServerApp/modules/string-similarity``` file for details
and/or run ```ServerApp/_string-similarity-test.js``` for see the test results.

I.e.: "sunny and dry" (search query) gives 61% score with comparing saved 
data which is "clear sky". Of course "clear sky" gives 100% score, but
"sunny sky" gives 100% as well. "bright sky" or "glowing sky" gives ~94% score
because "bright" or "glowing" synonyms has smaller weight which describes
ratio of similarity (given manually).

Other "clear sky" related synonyms are not set.

I have set some "rain" synonyms. For example "heavy flurry" gives 99% score with
matching "heavy rain". "monsoon" matches "light rain" and "heavy rain" with 71%
score.

I also create synonyms for "moderate", "light" and "heavy". So "small raindrops"
will gives 100% score for "light rain" comparison and "big raindrops" will give
the same score for "heavy rain".

Only results with score with threshold > 51% are displayed.

The algorithm is not fully correct, it requires some improvements but even now
it produces reasonable results - but still it depends on synonyms set with their
weights.

The algorithm was developed without knowledge about NLP but with some knowledge
about ML and Neural Networks. Please treat that as an more or less successful
experiment.
