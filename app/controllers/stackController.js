var Cardstack = require("../models/Cardstack.js");
var RelatedStacks = require("../models/Related.js")

// Display list of all Cards
exports.cards_list = function(req, res) {
    
  var callback = function(stack){
    res.render('stamp', { stack: stack.data, id: req.params.stackId });
  }
  var stack = new Cardstack(req.params.stackId, callback);
};


exports.relatedStacks = function(req, res) {
  res.setHeader("content-type", "application/json");
  res.setHeader("AMP-Access-Control-Allow-Source-Origin", req.params.__amp_source_origin );
  
  var relatedsCallback = function(relateds){
    res.json(relateds)
  }

  var callback = function(stack){
    var relateds = new RelatedStacks(stack.data.relatedStacks, relatedsCallback);
  }

  var stack = new Cardstack(req.params.stackId, callback);

}