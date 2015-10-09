var http   = require("http"),
    url    = require("url"),
    config = require("./config.js.local"),
    helpers = require("./helpers"),
    routerUrl = "http://" + config.auth + "@192.168.254.254",
    idxPage = "/globe_setup_1pwn1.asp",
    active_client_path = "/admin/wlstatbl.asp",
    operations = {
      reboot: function() { throw new Error("Not Yet Implemented");  },
      active_clients: function() { 
        helpers.extend(config, url.parse(routerUrl + active_client_path));
        http.request(config, httpREH).end();
      },
      stats: function() {
        http.request(routerUrl + idxPage, httpREH).end();
      }
    }

function httpREH(resHandler) {
  var data = "";
  if (resHandler.statusCode === 401) {
     throw new Error("Unauthorized, check credentials in config.js");
  }
  resHandler
    .on("data", function(chunk) {  
      data += chunk.toString();
    })                             
    .on("end", function() {        
      helpers.stats(data);
      console.log(data);
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
