var http   = require('http'),
    exports = module.exports = {},
    url    = require('url'),
    qs = require('querystring'),
    appConfig = require('./appConfig.js.local'),
    helpers = require('./helpers'),
    routerUrl = appConfig.client.ip,
    partial = helpers.partial,
    idxPage = '/globe_setup_1pwn1.asp',
    activeClientsPage = '/admin/wlstatbl.asp',
    urlBlocking = '/url_blocking.asp',
    wirelessSecurity = '/wlwpa_mbssid.htm',
    wirelessSettingsBasic = '/wlbasic.asp',
    wirelessAdvancedSettings = '/wladvanced.asp',
    rebootPage = '/goform/formGlobal',
    operations = {
      reboot: function() { 
        var action = partial(httpREH, function(d) {
          console.log(d);
        });
        helpers.extend(appConfig.client, helpers.addAuth(routerUrl + rebootPage));
        appConfig.client['method'] = 'POST';
        appConfig.client.headers['Content-Length'] = 130;
        appConfig.client.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        var req = http.request(appConfig.client, action);
        req.write(qs.stringify(appConfig.reboot));
        req.end();
      },
      clients: function() {
        var action = partial(httpREH, helpers.clients);
        helpers.extend(appConfig.client, helpers.addAuth(routerUrl + activeClientsPage));
        http.request(appConfig.client, action).end();
      },
      stats: function() {
        var action = partial(httpREH, helpers.stats);
        helpers.extend(appConfig.client, url.parse(routerUrl + idxPage));
        var req = http.request(appConfig.client, action);
        req.end();
      }
    }

function httpREH(res, helperFn) {
  var data = '';
  if (res.statusCode === 401) {
     throw new Error('Unauthorized, check credentials in appConfig.js');
  }
  res
    .on('data', function(chunk) {  
      data += chunk.toString();
    })                             
    .on('end', function() {        
      helperFn(data);
      console.log('Success!');
    })
    .on('error', function(err) {
      console.log(err);
    });
}

function init(operation) {
  if (operations.hasOwnProperty(operation)) {
    operations[operation]();
  } else {
    console.log('Operation Unknown');
  }
};

exports.init = init;
exports.operations = operations;
exports.name = 'router';
