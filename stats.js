var cheerio = require("cheerio");
var infoTable = require("./lib/infotable");

var exports = module.exports = {};

function globeStatsPage(dom) {
  var $statTable = cheerio.load(dom)("tr").filter(function(i, e) { 
    if (e.attribs.hasOwnProperty('bgcolor') && e.attribs["bgcolor"] !== "#808080") {
       return e;
    }
  });
  var stats = {};
  Array.prototype.forEach.call($statTable, function(e) {
    var stat       = infoTable.statPair(e),
        currentKey = Object.keys(stat)[0];
    stats[currentKey] = stat[currentKey];
  });
  console.log(stats);
}

exports.stat = globeStatsPage
