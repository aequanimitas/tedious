var http = require("http");

function retrieve(options) {
  http.request(options, function(res) {
    var str = '';
    res.on('data', function(chunk) {
      str += chunk;
    });
    res.on('end', function () {
      console.log(str);
    });
  }).end();
}

module.exports = retrieve;
