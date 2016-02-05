var vorpal = require('vorpal')(),
    url = require('url'),
    http = require('http'),
    appConfig = require('./appConfig.js.local'),
    helpers = require('./helpers');

function routeAction(args) {
  var action = helpers.partial(helpers.httpResponseHelper, args.helper);
  helpers.extend(appConfig.client, args.url);
  return {
    config: appConfig.client,
    action: action
  }
}

vorpal.command('stats', 'current router stats')
  .alias('stats')
  .action(function(args, cb) {
     var endpoint = url.parse(appConfig.client.ip + '/globe_setup_1pwn1.asp')
     var temp = routeAction({ helper: helpers.stats, url: endpoint })
     http.request(temp.config, temp.action).end();
  });

vorpal.delimiter('Tedious: ').show().parse(process.argv);
