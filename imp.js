var Destinare = require("./destinare");

function Imp() {
  this.host = "192.168.254.254";
  Destinare.apply(this, Array.prototype.slice.call(arguments));
}

Imp.prototype = new Destinare();

module.exports = Imp;
