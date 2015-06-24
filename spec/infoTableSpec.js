var cheerio = require("cheerio");
var infotable = require("../lib/infotable");

describe("Handling Table Rows", function() {
  describe ("pairs method", function () {
    it("should just return an object", function() {
      expect(infotable.pairs()).toBeDefined();
    });
    it("should return an object with key: IP Address and value: 192.168.254.254", function() {
      var pairs = infotable.pairs(
         "<td width=40%><font size=2><b>IP Address</b></td>" +
         "<td width=60%><font size=2>192.168.254.254</td>"
      );
      expect(Object.keys(pairs).indexOf("IP Address")).not.toEqual(-1);
      expect(pairs["IP Address"]).toEqual("192.168.254.254");
    });
    it("should accept a HOF which will be used to figure out the pairs", function() {
      pending("Idea is still unclear");
    });
  });
  describe("getCellText method *** should be a hof ***", function() {
    it("should be defined", function() {
      expect(infotable.getCellText).toBeDefined()
    });
  });
});
