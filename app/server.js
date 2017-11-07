require('dotenv').config();
var express = require('express');
var app = express();
var Cardstack = require("./models/Cardstack.js");
var thePort = process.env.PORT || 3000;
// Controllers
var cardstack_controller = require('./controllers/stackController.js');

// Server Config
app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("index", {title: "Hello STAMP!"});
});

app.get("/stacks/:stackId", function(req, res) {
  var callback = function(data){
    res.send(data);
  }
  var stack = new Cardstack(req.params.stackId, callback);
});



/// Stack ROUTES ///

/* GET cards list. */
app.get('/stamps/:stackId', cardstack_controller.cards_list);

app.get('/stamps/:stackId/related', cardstack_controller.relatedStacks);

app.listen(thePort);
console.log("listening on ", thePort);