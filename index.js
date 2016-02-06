var vorpal = require('vorpal')(),
    http = require('http'),
    Route = require('./route');

vorpal.command('stats', 'current router stats')
  .alias('stats')
  .action(function(args, cb) {
     var route = Route('stats', '/globe_setup_1pwn1.asp');
     http.request(route.config, route.action).end();
  });

vorpal.command('clients', 'current router stats')
  .alias('clients')
  .action(function(args, cb) {
     var route = Route('clients', '/admin/wlstatbl.asp', true);
     http.request(route.config, route.action).end();
  });

vorpal.delimiter('Tedious: ').show().parse(process.argv);
