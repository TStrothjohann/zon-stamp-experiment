var Cardstack = require("../models/Cardstack.js");
var RelatedStacks = require("../models/Related.js");
var stampServerURL = process.env.STAMP_SERVER_URL;
var helpers = require("../helpers/giphy-url.js");

// Display list of all Cards
exports.cards_list = function(req, res) {

  var renderCallback = function(stack){
    res.render('stamp', { stack: stack.data, id: req.params.stackId, server: stampServerURL });
  }

  var callback = function(stack){
    for (var i = stack.data.cards.length - 1; i >= 0; i--) {
      if(stack.data.cards[i].cms.type == "media"){
        stack.data.cards[i].data.mediaUrl = helpers.prepareGiphyUrls(stack.data.cards[i].data.mediaUrl);
      }
    }
    renderCallback(stack);
  }

  var stack = new Cardstack(req.params.stackId, callback);
};


exports.relatedStacks = function(req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("AMP-Access-Control-Allow-Source-Origin", req.query.__amp_source_origin || '*');
  
  var relatedsCallback = function(relateds){
    res.json(relateds)
  }

  var callback = function(stack){
    var relateds = new RelatedStacks(stack.data.relatedStacks, relatedsCallback);
  }

  var stack = new Cardstack(req.params.stackId, callback);

}