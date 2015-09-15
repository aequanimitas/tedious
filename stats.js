var cheerio = require("cheerio");
var infoTable = require("./lib/infotable");

var exports = module.exports = {};

function statTable(dom) {
  var statTable = cheerio.load(dom)("table");
   console.log(statTable.children()[1]('font b'));
//  Array.prototype.forEach.call(statTable.children(), function(e) {
//    console.log(e.text);
//  });
}

exports.stat = statTable;
