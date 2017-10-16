require('dotenv').config();
var express = require('express');
var app = express();
var Cardstack = require("./models/Cardstack.js");

// Server Config
app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("index", {title: "Hello STAMP!"});
});

app.get("/stack", function(req, res) {
  var stack = new Cardstack(res);
});

app.listen(3000);
console.log("listening on 3000");