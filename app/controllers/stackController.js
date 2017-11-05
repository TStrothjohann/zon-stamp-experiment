var Cardstack = require("../models/Cardstack.js");
var RelatedStacks = require("../models/Related.js");
var stampServerURL = process.env.STAMP_SERVER_URL;
var helpers = require("../helpers/giphy-url.js");

process.on('unhandledRejection', r => console.log(r));
// Display list of all Cards
exports.cards_list = function(req, res) {
  

  var renderCallback = function(stack, mediaCards){
    
    //Transform all giphy URLs to valid .gif URLs and add size information
    var actions = mediaCards.map(helpers.prepareGiphyUrls);
    
    //Wait for all the URLs to be transformed
    var results = Promise.all(actions);
    
    //add additional information to stack data and render stack
    results.then(function(){
      for (var i = mediaCards.length - 1; i >= 0; i--) {
        stack.data.cards[mediaCards[i].cardNumber].data.gif = mediaCards[i];
      }

      res.render('stamp', { stack: stack.data, id: req.params.stackId, server: stampServerURL });
    });
  }

  var callback = function(stack){
    var mediaCards = [];
    for (var i = stack.data.cards.length - 1; i >= 0; i--) {
      if(stack.data.cards[i].cms.type == "media"){    
        mediaCards.push({
          "cardNumber": i,
          "mediaUrl": stack.data.cards[i].data.mediaUrl 
        });
      }
    }
    renderCallback(stack, mediaCards);
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