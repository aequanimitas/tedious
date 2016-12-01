var url = require('url');
var helpers = require('./helpers');
var appConfig = require('./appconfig.local.json');

function route(helper, endpoint, needsAuth) {
  var config = Object.assign({}, appConfig.client);
  var fullUrl = config.ip + endpoint;
  helpers.extend(config, needsAuth ? helpers.addAuth(fullUrl) : url.parse(fullUrl));
  return {
    config: config,
    action: helpers.partial(helpers.httpResponseHelper, helpers[helper])
  }
};

module.exports = route;
