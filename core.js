var EventEmitter = require("events").EventEmitter; 
    util = require("util"),
    client = require("./client"),
    DataFeed = require("./feed");

function Reddit() {
  this.host = "www.reddit.com";
  this.path = "/r/";
  DataFeed.apply(this, Array.prototype.slice.call(arguments));
}

Reddit.prototype = new DataFeed();

Reddit.prototype.redata = function (data) {
  this.data = data;
  return JSON.parse(data).data.children;
}

Reddit.prototype.report = function (data) {
  for (var x = 0; x < data.length; x += 1) {
    console.log(data[x].data.title);
    console.log(data[x].data.url);
    console.log("" + this.host+data[x].data.permalink);
    console.log("\n");
  }
}

var nba = new Reddit({
  "sub": "nba",
  "format": ".json" 
});


function Router() {
  this.host = "192.168.254.254";
  this.path = "";
}

client(nba);
