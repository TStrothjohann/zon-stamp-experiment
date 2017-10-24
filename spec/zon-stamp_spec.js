require('dotenv').config();
var request = require("request");
var Cardstack = require("../app/models/Cardstack.js");
var base_url = "http://localhost:3000/";
var testStack = require("./test-data/test-stack.js");
var helpers = require("../app/helpers/giphy-url.js");

describe("Server", function() {
  describe("GET /", function() {
    
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("serves an AMP", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toContain("⚡");
        done();
      });
    });

    it("serves a stamped Cardstack", function(done){
      request.get(base_url + "stamps" + "/652", function(error, response, body){
        expect(body).toContain("⚡");
        expect(body).toContain("Sonnenfinsternis USA 2017");
        done();
      })
    })

    it("serves a JSON related stacks list on /related route", function(done){
      request.get(base_url + "stamps" + "/652/related", function(error, response, body){
        expect(response.headers['content-type']).toContain("application/json");
        expect( JSON.parse(body)['Lesen Sie jetzt'] ).toBeDefined();
        done();
      })
    })

  });
});


describe("Cardstack Model", function() {
  
  it("gets a stack from cardstack API", function(done){
    var callback = function(data){
      expect(data.data.name).toBe("Sonnenfinsternis USA 2017");
      done();
    };
    
    testCardstack = new Cardstack("652", callback);
  });

  it("can transform a giphy url to webp url", function(){
    var stack = new testStack;
    stack.data.data.cards[21].data.mediaUrl = helpers.prepareGiphyUrls(stack.data.data.cards[21].data.mediaUrl);
    expect(stack.data.data.cards[21].data.mediaUrl).toBe(
      "https://media.giphy.com/media/xTeWOUiAn4Y1ujJhmw/giphy.webp"
    );
  })

});


// It can render parts of cardstack object into