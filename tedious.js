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

function Route(path, fn) {
  this.path = path;
  this.fn = fn;
}

var available_routes = {
  "reboot": new Route(
    '/goform/admin/formReboot',
    reboot
  )
}

console.log(available_routes);
http.request(options,function(res) {
  console.log(res);
}).end();
