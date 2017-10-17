require('dotenv').config();
var request = require("request");
var Cardstack = require("../app/models/Cardstack.js");
var base_url = "http://localhost:3000/";

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

  });
});


describe("Cardstack", function() {
  
  it("gets a stack from cardstack API", function(done){
    var callback = function(data){
      expect(data.data.name).toBe("Sonnenfinsternis USA 2017");
      done();
    };
    
    testCardstack = new Cardstack(callback);
  });
});


// It can render parts of cardstack object into