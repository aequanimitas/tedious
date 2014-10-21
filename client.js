var http = require("http");

var Client = function(task) {
  var client = http.request(task.options(), function(res) {
    var d = "";
    res.on("data", function(res) {
      d += res;
    });
    res.on("end", function(res) {
      task.emit("data:received", d)
    });
  });
  client.end(); 
};

module.exports = Client;
