var request = require("request");
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

// It can get a cardstack from cardstack api 
// It can render parts of cardstack object into