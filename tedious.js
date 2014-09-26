var http = require('http'),
    fs   = require('fs'),
    querystring = require('querystring'),
    router = require("./router"),
    retrieve = router.Retrieve,
    Route = router.Route,
    config = require('./config')

function reboot(path) {
  config.path = path;
  var form_data = querystring.stringify({
    'rebootMode' :  '0', 'reboot' :  'Reboot', 'submit-url' :  'reboot.asp'
  }); 
  var req = http.request(config.router, function(res) {
      var str = "";
      res.on("data", function(chunk) {
        str += chunk;
      });
      res.on("end", function () {
        console.log(str); 
      });
  });
  req.write(form_data);
  req.end();
}

var available_routes = {
  "reboot": new Route(
    '/goform/admin/formReboot',
    reboot),
  "clients": new Route(
    '/admin/wlstatbl.asp',
    retrieve),
  "stats": new Route(
    '/adsl-statis.asp',
    retrieve)
}

function argument_switch(arg) {
  if (arg == undefined || available_routes[arg] == undefined) {
    console.log("Here's a list of what tasks I can do with: " + Object.keys(available_routes));
  } else {
    config.router.path = available_routes[arg].path;
    available_routes[arg].fn(config.router);
  }
}

(function() {
  argument_switch(process.argv[2]);
})();
