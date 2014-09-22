var http = require('http'),
    fs   = require('fs'),
    querystring = require('querystring'),
    config = require('./config');


// make this a callback fn
function reboot(path) {
  config.router.path = path;
  var form_data = querystring.stringify({
    'rebootMode' :  '0', 'reboot' :  'Reboot', 'submit-url' :  'reboot.asp'
  }); 
  var req = http.request(config.router , function(res) {
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

function index(path) {
  config.router.path = path;
  http.request(config.router, function(res) {
    var str = '';
    res.on('data', function(chunk) {
      str += chunk;
    });
    res.on('end', function () {
      console.log(str);
    });
  }).end();
}

function Route(path, fn) {
  this.path = path;
  this.fn = fn;
}

var available_routes = {
  "reboot": new Route(
    '/goform/admin/formReboot',
    reboot),
  "root": new Route(
    '/globe_setup_1pwn1.asp',
    index)
};

function argument_switch(arg) {
  available_routes[arg].fn(available_routes[arg].path)
}

(function() {
  argument_switch(process.argv[2]);
})();
