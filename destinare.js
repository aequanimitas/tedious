var EventEmitter = require("events").EventEmitter,
    util = require("util");

var Destinare = function(options) {
  this.prop = (typeof options !== "object") ? {} : options;
  this.host = this.host || this.prop.url || "127.0.0.1";
}

// fffff order
util.inherits(Destinare, EventEmitter);

Destinare.prototype.options = function () {
  return {
    "host": this.host,
    "path": this.path + this.format
  }
}

Destinare.prototype.addListener("data:received", function(data) {
  this.report(this.redata(data));
});

module.exports = Destinare;
