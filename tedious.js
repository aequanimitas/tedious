var http = require('http'),
    fs   = require('fs'),
    querystring = require('querystring'),
    file = __dirname + '/settings.json';

var options = {
  host: '192.168.254.254',
  path: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': ''
  }  
};

fs.readFile(file, function (err,data) {
  var data = JSON.parse(data);
  options.auth = data.username + ':' + data.password;
});


// make this a callback fn
function reboot() {
  var form_data = querystring.stringify({
    'rebootMode' :  '0', 'reboot' :  'Reboot', 'submit-url' :  'reboot.asp'
  }); 
  var req = http.request(options, function(res) {});
  req.write(form_data);
  req.end();
}

function index(path) {
  options.path = path;
  http.request(options, function(res) {
    var str = '';
    res.on('data', function(chunk) {
      str += chunk;
    });
    res.on('end', function () {
      console.log(typeof str);
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
