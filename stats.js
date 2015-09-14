var cheerio = require("cheerio");
var infoTable = require("./lib/infotable");

var exports = module.exports = {};

function statTable(dom) {
  var dom = cheerio.load(dom)("table");
  Array.prototype.forEach.call(dom[0].children, function(e) {
    console.log(e.html);
  });
}

exports.stat = statTable;
