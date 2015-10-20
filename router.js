var http   = require("http"),
    exports = module.exports = {},
    url    = require("url"),
    appConfig = require("./appConfig.js.local").client,
    helpers = require("./helpers"),
    routerUrl = appConfig.ip, 
    idxPage = "/globe_setup_1pwn1.asp",
    activeClientsPage = "/admin/wlstatbl.asp",
    operations = {
      reboot: function() { throw new Error("Not Yet Implemented");  },
      clients: function() {
        var action = opr(helpers.clients);
        helpers.extend(appConfig, helpers.addAuth(routerUrl + activeClientsPage));
        http.request(appConfig, action).end();
      },
      stats: function() {
        var action = opr(helpers.stats);
        helpers.extend(appConfig, url.parse(routerUrl + idxPage));
        http.request(appConfig, action).end();
      }
    }

function opr(a) {
  return function x(b) {
    return httpREH(b, a);
  };
}

function httpREH(res, helperFn) {
  var data = "";
  if (res.statusCode === 401) {
     throw new Error("Unauthorized, check credentials in appConfig.js");
  }
  res
    .on("data", function(chunk) {  
      data += chunk.toString();
    })                             
    .on("end", function() {        
      helperFn(data);
      console.log("Success!");
    })
    .on("error", function(err) {
      console.log(err);
    });
}

function init(operation) {
  if (operations.hasOwnProperty(operation)) {
    operations[operation]();
  } else {
    console.log("Operation Unknown");
  }
};

exports.init = init;
exports.operations = Object.keys(operations);
