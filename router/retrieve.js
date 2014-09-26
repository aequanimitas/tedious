var http = require("http");

function retrieve(options) {
  http.get(options, function(res) {
    var str = '';
    res.on('data', function(chunk) {
      str += chunk;
    });
    res.on('end', function () {
      console.log(str);
    });
  });
}

module.exports = retrieve;
