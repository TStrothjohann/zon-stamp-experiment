var request = require("request");
var token = process.env.CARDS_TOKEN;


function Cardstack(id, callback){
  this.error = false;
  this.data = '';

  var dataurl = "http://card-builder.lovely-cdn.com/api/v1/organisations/1/stacks/" + id + "?token=" + token;
  var self = this;

  request
    .get({url:dataurl, json:true })
    .on('error', function(error){
      console.log("error in request in Cardstack.js: ", error)
    })
    .on('data', function(chunk){
      self.data += chunk;
    })
    .on('end', function(){
      try{
        callback( JSON.parse( self.data.toString() ) );
      }catch(err){
        console.log("error when parsing fresh cardstack data", self.data);
        self.error = true;
      }
    })
};

module.exports = Cardstack;