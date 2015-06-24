var cheerio = require("cheerio");
var exports = module.exports = {};

function pairs(dom) {
  var pair = dom, key, val;
  if (!pair) return {};
  pair = cheerio.load(pair)("td")
  key = getCellText(pair[0]);
  val = getCellText(pair[1]);
  pair[key] = val;
  return pair;
};

function getCellText(dom) {
  return cheerio.load(dom)("font").text();
};

exports.pairs = pairs;
exports.getCellText = getCellText;
