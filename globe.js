var http   = require("http"),
    url    = require("url"),
    config = require("./config"),
    helpers = require("./helpers"),
    routerUrl = "http://192.168.254.254",
    idxPage = "/globe_setup_1pwn1.asp",
    operations = {
      reboot: function() { throw new Error("Not Yet Implemented");  },
      active_clients: function() { throw new Error("Not Yet Implemented"); },
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
  if (operations.hasOwnProperty(operation)) {
    operations[operation]();
  } else {
    console.log("Operation Unknown");
  }
};

init(process.argv[2]);
