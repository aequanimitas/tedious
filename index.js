var vorpal = require('vorpal')(),
    url = require('url'),
    http = require('http'),
    appConfig = require('./appConfig.js.local'),
    helpers = require('./helpers');

vorpal.command('stats', 'current router stats')
  .alias('stats')
  .action(function(args, cb) {
     var action = helpers.partial(helpers.httpResponseHelper, helpers.stats);
     var routerUrl = appConfig.client.ip;
     var idxPage = '/globe_setup_1pwn1.asp';
     helpers.extend(appConfig.client, url.parse(appConfig.client.ip + idxPage));
     http.request(appConfig.client, action).end();
  });

vorpal.delimiter('Tedious: ').show().parse(process.argv);
