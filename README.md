# ZON Cards go STAMP
This is a proof of concept. A node.js app that gets card stack data by id from the [cards backend](https://github.com/edenspiekermann/espi-card-builder) and renders the information in a very basic STAMP template.

## Setup

```
git clone https://github.com/TStrothjohann/zon-stamp-experiment
cd zon-stamp-experiment
npm install
```

## Config
Add an .env file to the root and add the API token:

```
CARDS_TOKEN=YOUR_TOKEN
```

## Start
`npm start` starts the app

## Tests
Run the Jasmine tests with `npm test`

## Routes

`GET /stacks/:stackId` renders a stacks JSON

`GET /stamps/:stackId` renders a STAMP featuring information from the stack with given ID.

For example run `npm start` and open http://localhost:3000/stamps/652


## Info
* A [cardstack on ZON](http://www.zeit.de/wissen/2017-08/sonnenfinsternis-total-eclipse-usa)
* The same cardstack in [this app's stack API view](http://localhost:3000/stacks/652)
* The [same stack as STAMP](http://localhost:3000/stamps/652)


## Prototype on Heroku
You can checkout the prototype on Heroku - here are some stacks. You need to enable the experimental `amp-story` Feature via Console though, which makes it a bit tidious to get it running on mobile.

* https://zon-stamp.herokuapp.com/stamps/652 (Total Eclipse in USA)
* https://zon-stamp.herokuapp.com/stamps/656 (Electoral system in Germany)
* https://zon-stamp.herokuapp.com/stamps/650 (Partial Lunar Eclipses)
* https://zon-stamp.herokuapp.com/stamps/633 (1968 student's revolution in Germany)
* https://zon-stamp.herokuapp.com/stamps/631 (Global Drug Survey)
* https://zon-stamp.herokuapp.com/stamps/651 (AfD and Putin)
* https://zon-stamp.herokuapp.com/stamps/86 (GIF story about the aledged bought World Cup 2006 in Germany)

Four arabic examples:
* https://zon-stamp.herokuapp.com/stamps/70  (Asylum procedures, Arabic)
* https://zon-stamp.herokuapp.com/stamps/69  (Public transportation, Arabic)
* https://zon-stamp.herokuapp.com/stamps/67  (Medical help, Arabic)

##ToDo
* Styling: White text on bright background images
* Image handling (right now it just loads the full resolution images which can be really big. But they are hosted on cloudinary which includes cropping and resize features)
* Background color themes from card stacks
* integration: split card
* integration: choice card
* integration: new gif and html cards

