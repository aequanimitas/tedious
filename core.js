var EventEmitter = require("events").EventEmitter; 
    http = require("http"),
    util = require("util");

var Task = function(options){
  this.options = options;
};

var Client = function(task) {
  var client = http.request(task.options, function(res) {
    var d = "";
    res.on("data", function(res) {
      d += res;
    });
    res.on("end", function(res) {
      console.log("ye?");
      task.emit("data:received", d)
    });
  });
  client.end(); 
}

var Parser = function () {}

util.inherits(Task, EventEmitter);

Task.prototype.report = function (data, cb) {
  if (cb === undefined) {
    console.log("Default reporter");
    console.log(data);
  }
};

var reddit = new Task({
  "host": "www.reddit.com",
  "path": "/r/" + "nba" + ".json"
});

reddit.addListener("data:received", function(data) {
  this.report(data);
});
var future_socket = function () {
  var welcome_message = "Hi!";
  
}

Client(reddit);
