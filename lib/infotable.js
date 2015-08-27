var cheerio = require("cheerio");
var exports = module.exports = {};

function domPair(dom) {
  var pair = {};
  if (!dom) return {};
  dom = cheerio.load(dom)("td");
  pair["" + getCellText(dom[0])] = getCellText(dom[1]);
  return pair;
};

function getCellText(dom) {
  return cheerio.load(dom)("font").text();
};

exports.domPair = domPair;
exports.getCellText = getCellText;
