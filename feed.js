var EventEmitter = require("events").EventEmitter,
    util = require("util");

function DataFeed(options) {
  this.prop = (typeof options !== "object") ? {} : options;
  this.host = this.host || this.prop.url || "127.0.0.1";
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
