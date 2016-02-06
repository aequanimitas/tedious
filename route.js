var url = require('url');
var helpers = require('./helpers');
var appConfig = require('./appConfig.js.local');

function route(helper, endpoint) {
  var config = Object.assign({}, appConfig.client)
  helpers.extend(config, url.parse(config.ip + endpoint));
  return {
    config: config,
    action: helpers.partial(helpers.httpResponseHelper, helpers[helper])
  }
};

module.exports = route;
