var vorpal = require('vorpal')(),
    http = require('http'),
    qs = require('querystring'),
    Route = require('./route');

vorpal.command('stats', 'current router stats')
  .action(function(args, cb) {
     var route = Route('stats', '/globe_setup_1pwn1.asp');
     http.request(route.config, route.action).end();
  });

vorpal.command('clients', 'router active clients')
  .action(function(args, cb) {
     var route = Route('clients', '/admin/wlstatbl.asp', true);
     http.request(route.config, route.action).end();
  });

vorpal.command('reboot', 'reboot router')
  .action(function(args, cb) {
     var route  = Route('reboot', '/goform/formGlobal', true);
     route.config.method = 'POST';
     route.config.headers['Content-Length'] = 130;
     route.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
     var req = http.request(route.config, route.action);
     req.write(qs.stringify(route.config.reboot));
     req.end();
  });

vorpal.delimiter('Tedious: ').show().parse(process.argv);
