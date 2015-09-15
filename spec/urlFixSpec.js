var url    = require("url"),
    urlFix = require("../lib/urlFix");

describe("Handling URL arguments", function() {

  beforeEach(function() {
    this.routerUrl = "192.168.254.254";
    this.routerUrlWithProtocol = "http://192.168.254.254";
  });

  it("URL object should be the same", function() {
    expect(urlFix.format(this.routerUrl)).toEqual(url.parse(this.routerUrlWithProtocol));
  });
});
