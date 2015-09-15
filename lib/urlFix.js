var url = require("url");

function toProperUrlObj(urlArg) {
  var rUrl = url.parse(urlArg);
  if (rUrl.protocol == null) {
    rUrl = url.parse("http://" + urlArg); 
  }
  return rUrl;
};

var exports = module.exports = {
  format: toProperUrlObj
}
