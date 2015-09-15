var cheerio = require("cheerio");
var exports = module.exports = {};

function statPair(dom) {
  var pair = {};
  if (!dom) return {};
  dom = cheerio.load(dom)("td");
  pair["" + getCellText(dom[0])] = getCellText(dom[1]);
  return pair;
};

function cleanString(str) {
  return str.replace(/(\r\n|\n|\r)/gm, "").trim();
};

function getCellText(dom) {
  return cleanString(cheerio.load(dom)("font").text());
};

exports.statPair = statPair;
exports.getCellText = getCellText;
