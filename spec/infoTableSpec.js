var cheerio = require("cheerio");
var infotable = require("../lib/infotable");

describe("Handling Table Rows", function() {
  describe ("statPair method", function () {
    it("should just return an object", function() {
      expect(infotable.statPair()).toBeDefined();
      expect(infotable.statPair()).toEqual({});
    });
    it("should return an object with key: IP Address and value: 192.168.254.254", function() {
      var statPair = infotable.statPair(
         "<td width=40%><font size=2><b>IP Address</b></td>" +
         "<td width=60%><font size=2>192.168.254.254</td>"
      );
      expect(Object.keys(statPair).indexOf("IP Address")).not.toEqual(-1);
      expect(statPair["IP Address"]).toEqual("192.168.254.254");
    });
    it("should accept a HOF which will be used to figure out the statPair", function() {
      pending("Idea is still unclear");
    });
  });
  describe("getCellText method *** should be a hof ***", function() {
    it("should be defined", function() {
      expect(infotable.getCellText).toBeDefined()
    });
  });
});
