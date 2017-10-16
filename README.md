## Installation

```
npm install
```

## Run app
```
npm start
node start_server.js
```

## Description

The application was created partially from react-redux-boilerplate.

Because of limitations of the external API's i have decided to download
whole database from https://api.openweathermap.org/ and use fetched data
in the application.

###### NLP

I have no previous experience in NLP. But I have created something that i'm
not sure if it is NLP but it produces reasonable search results of given query.

I have created modified version of cosine string similarity. It is synonym
sensitive. Check ```ServerApp/modules/string-similarity``` file for details
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

Only results with score with threshold > 51% are displayed.

The algorithm is not fully correct, it requires some improvements but even now
it produces reasonable results - but still it depends on synonyms set with their
weights.

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the installation step, you're ready to start the project!

```bash
$ yarn start  # Start the development server (or `npm start`)
```

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000`|
|`build`            |Builds the application to ./dist|
