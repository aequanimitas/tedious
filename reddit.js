var DataFeed = require("./feed");

function Reddit() {
  this.host = "www.reddit.com";
  this.path = "/r/";
  DataFeed.apply(this, Array.prototype.slice.call(arguments));
}

Reddit.prototype = new DataFeed();

Reddit.prototype.redata = function (data) {
  this.data = data;
  var formatted_data = [], temp = JSON.parse(data).data.children;
  for (var x in temp) {
    var dtemp = temp[x].data, temp_obj = {};
    temp_obj["id"] = dtemp.id;
    temp_obj["title"] = dtemp.title;
    temp_obj["url"] = dtemp.url;
    temp_obj["thread"] = this.host + dtemp.permalink;
    formatted_data.push(temp_obj);
  }
  return formatted_data;
}

Reddit.prototype.report = function (data) {
  console.log(data);
}

module.exports = Reddit;
