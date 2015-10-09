var http   = require("http"),
    url    = require("url"),
    config = require("./config.js.local"),
    helpers = require("./helpers"),
    routerUrl = "http://" + config.auth + "@192.168.254.254",
    idxPage = "/globe_setup_1pwn1.asp",
    activeClientsPath = "/admin/wlstatbl.asp",
    operations = {
      reboot: function() { throw new Error("Not Yet Implemented");  },
      clients: function() { 
        var action = opr(helpers.clients);
        helpers.extend(config, url.parse(routerUrl + activeClientsPath));
        http.request(config, action).end();
      },
      stats: function() {
        var action = opr(helpers.stats);
        helpers.extend(config, url.parse(routerUrl + idxPage));
        http.request(config, action).end();
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
     throw new Error("Unauthorized, check credentials in config.js");
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

init(process.argv[2]);
