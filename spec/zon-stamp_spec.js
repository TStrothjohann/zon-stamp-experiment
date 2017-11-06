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

  it("can transform a giphy url to giphy object with width/height/url", function(done){
    var stack = new testStack;
    var callback = function(gObject){
      expect(gObject.mediaUrl).toEqual("https://media.giphy.com/media/xTeWOUiAn4Y1ujJhmw/giphy.gif");
      expect(gObject.width).toEqual(480);
      expect(gObject.height).toEqual(293);
      done();      
    }

    stack.data.data.cards[21].data.giphyObject = helpers.prepareGiphyUrls(
      {
        "cardNumber": 21,
        "mediaUrl": stack.data.data.cards[21].data.mediaUrl
      }
    ).then(function(data){
      callback(data)
    });
  })

  it("transforms a .gif url to gif-object with url/width/height", function(done){
    var stack = new testStack;
    var callback = function(gObject){
      expect(gObject.mediaUrl).toEqual("https://img.buzzfeed.com/buzzfeed-static/static/2017-08/2/19/asset/buzzfeed-prod-fastlane-01/anigif_sub-buzz-32171-1501715090-1.gif");
      expect(gObject.width).toEqual(320);
      expect(gObject.height).toEqual(180);
      done();      
    }

    stack.data.data.cards[12].data.giphyObject = helpers.prepareGiphyUrls(
      {
        "cardNumber": 12,
        "mediaUrl": stack.data.data.cards[12].data.mediaUrl
      }
    ).then(function(data){
      callback(data)
    });

  })

});


// It can render parts of cardstack object into