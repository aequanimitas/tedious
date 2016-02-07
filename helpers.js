var zlib    = require('zlib'),
    url     = require('url'),
    cheerio = require('cheerio'),
    appConfig  = require('./appConfig.js.local');

function statPair(dom) {
  var pair = {};
  if (!dom) return {};
  dom = cheerio.load(dom)('td');
  pair['' + getCellText(dom[0])] = getCellText(dom[1]);
  return pair;
};

function cleanString(str) {
  return str.replace(/(\r\n|\n|\r)/gm, '').trim();
};

function getCellText(dom) {
  var txt = cheerio.load(dom)('font');
  if (txt.length == 2) return txt[1].children[0].data;
  return cleanString(cheerio.load(dom)('font').text());
};

function toProperUrlObj(urlArg) {
  var rUrl = url.parse(urlArg);
  if (rUrl.protocol == null) {
    rUrl = url.parse('http://' + urlArg); 
  }
  return rUrl;
};

function encodingHandler(response) {
  var data     = '',
      resEncod = response.headers['content-encoding'];
  if (resEncod === 'gzip') {
    var gzip = zlib.createGunzip();
    response.pipe(gzip);
    data = responseEventsHandler(gzip);
  } else {
    data = responseEventsHandler(response);
  }
};

module.exports.extend = function() {
  var source      = arguments[1],
      destination = arguments[0],
      sKeys       = Object.keys(source),
      counter, 
      currentKey,
      sKey;

  for(var x in sKeys) {
    sKey = source[sKeys[x]];
    destination[sKeys[x]] = sKey;
  }
};

module.exports.addAuth = function(urlPath) {
  var authUrl = url.parse(urlPath);
  authUrl.auth = appConfig.client.auth;
  return authUrl;
};

module.exports.reboot = function(d) {
  console.log(d);
};

module.exports.stats = function(dom) {
  var $statTable = cheerio.load(dom)('tr').filter(function(i, e) { 
      if (e.attribs.hasOwnProperty('bgcolor') && e.attribs['bgcolor'] !== '#808080') {
         return e;
      }});
  var stats = {};
  [].forEach.call($statTable, function(e) {
    var stat       = statPair(e),
        currentKey = Object.keys(stat)[0];
    stats[currentKey] = stat[currentKey];
  });
  console.log('Stats');
  console.log(stats);
};

module.exports.clients = function(dom) {
   var $trs = cheerio.load(dom)('tr').filter(function(i, e) { 
      if (e.attribs.hasOwnProperty('bgcolor') && e.attribs['bgcolor'] === '#b7b7b7') {
         return e;
      }});
  var clients = {};
  [].forEach.call($trs, function(e, i) {
    var x = cheerio.load(e)('font');
    clients['Client ' + i] = x[0].children[0].data;
  });
  console.log('Clients');
  console.log(clients);
}

function partial(aFn, aArgFn) {
  return function inFn(b) {
    return aFn(b, aArgFn);
  }
}

module.exports.clear = function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
};

module.exports.statPair = statPair;
module.exports.getCellText = getCellText;
module.exports.partial = partial
module.exports.httpResponseHelper = function httpResponseHelper(res, helperFn) {
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
