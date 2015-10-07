var http   = require("http"),
    url    = require("url"),
    config = require("./config"),
    helpers = require("./helpers"),
    routerUrl = "http://192.168.254.254",
    idxPage = "/globe_setup_1pwn1.asp",
    operations = {
      reboot: function() { return undefined },
      active_clients: function() { return undefined },
      stats: function() {
        http.request(routerUrl + idxPage, httpREH).end();
      }
    }

function httpREH(resHandler) {
  var data = "";
  resHandler
    .on("data", function(chunk) {  
      data += chunk.toString();
    })                             
    .on("end", function() {        
      helpers.stats(data);
      console.log("Success");
    })
    .on("error", function(err) {
      console.log(err);
    });
}

function init(operation) {
  if (operation in operations) {
    if (operations[operation]() === undefined) {
      console.log("Operation not yet implemented");
    }
  } else {
    console.log("Operation Unknown");
  }
};

init(process.argv[2]);
