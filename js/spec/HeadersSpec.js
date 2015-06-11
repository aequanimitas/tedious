var Header = require("../lib/Headers");
describe("Header Config", function(){
  "use strict";
  it("should have properly set the necesarry headers", function () {
    "use strict";
    expect(Header["User-Agent"]).not.toBe(undefined);
    expect(Header["Connection"]).not.toBe(undefined, "Connection should be set");
    expect(Header["Host"]).not.toBe(undefined, "Host should be set");
  });
})
