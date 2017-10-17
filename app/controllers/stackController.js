var Cardstack = require("../models/Cardstack.js");

// Display list of all Cards
exports.cards_list = function(req, res) {
    
  var callback = function(stack){
    res.render('stamp', { stack: stack.data });
  }
  var stack = new Cardstack(req.params.stackId, callback);
};