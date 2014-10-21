var DataFeed = require("./feed");

var Reddit = function () {
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

module.exports = Reddit;
