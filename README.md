#Description
This is a proof of concept. A node.js app that gets card stack data by id from the [cards backend](https://github.com/edenspiekermann/espi-card-builder) and renders the information in a very basic STAMP template.

#Setup

```
git clone https://github.com/TStrothjohann/zon-stamp-experiment
cd zon-stamp-experiment
npm install
```

#Config
Add an .env file to the root and add the API token:

```
CARDS_TOKEN=YOUR_TOKEN
```

#Start
`npm start` starts the app

#Tests
Run the Jasmine tests with `npm test`

#Routes

`GET /stacks/:stackId` renders a stacks JSON

`GET /stamps/:stackId` renders a STAMP featuring information from the stack with given ID.