var Destinare = require("./destinare");

var DataFeed = function(){
  Destinare.apply(this, Array.prototype.slice.call(arguments));
  this.format = this.prop.format || ".json";
}

DataFeed.prototype = new Destinare();
module.exports = DataFeed;
