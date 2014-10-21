var EventEmitter = require("events").EventEmitter,
    util = require("util");

var DataFeed = function (options) {
  this.prop = (typeof options !== "object") ? {} : options;
  this.host = this.host || this.prop.url;
  this.path = this.prop.path || this.path + this.prop.sub;
  this.format = this.prop.format || ".json";
}

// fffff order
util.inherits(DataFeed, EventEmitter);

DataFeed.prototype.options = function () {
  return {
    "host": this.host,
    "path": this.path + this.format
  }
}

DataFeed.prototype.addListener("data:received", function(data) {
  this.report(this.redata(data));
});

module.exports = DataFeed;
