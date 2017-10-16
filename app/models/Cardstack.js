var request = require("request");

function Cardstack(response){
  var error = false;
  var data = '';
  var token = process.env.CARDS_TOKEN;
  var dataurl = "http://card-builder.lovely-cdn.com/api/v1/organisations/1/stacks/652?token=" + token;
  
  request
    .get({url:dataurl, json:true })
    .on('error', function(error){
      console.log("error in request in Cardstack.js: ", error)
    })
    .on('data', function(chunk){
      data += chunk;
    })
    .on('end', function(){
      try{
        this.content = JSON.parse( data.toString() );
        response.send(this.content);
      }catch(err){
        console.log("error when parsing fresh cardstack data", data);
        error = true;
      }
    })
};

module.exports = Cardstack;