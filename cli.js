exports = module.exports = {};
var appName = '', 
    appDescription = '';
    messages = {
      'requiredFlags': function(flags) {
         return `required flags missing: ${flags} \n'`
       },
       'missingArgs': function(flagArgs) {
          var missingArguments = flagArgs.map(removeFlagSymbols),
              hasS = missingArguments.length > 1 ? 's' : '';
          return '\nThe required flag' + hasS + 
                 ' has no argument' + hasS +
                 ': ' + missingArguments + '\n';
       }
    },
    pkgInfo = require('./package.json');

function circular(app, opt, args) {
  opOrApp(app, opt, 'subapps') ? 
    circular(app.subapps[opt], args[0], args.slice(1)) : 
    opOrApp(app,opt,'operations') ? app.operations[opt]() : help(app);
}

exports.sequential = function(app) {
  appName = app.name || pkgInfo.name;
  appDescription = app.description || pkgInfo.description;
  if (app.args.length == 0) {
    app.hasOwnProperty('help') ? app.help() : help(app);
    return;
  }
  circular(app, app.args[0], app.args.slice(1));
}

function opOrApp(app, opt, prop) {
  return !(app[prop] === undefined) && app[prop].hasOwnProperty(opt);
}

function help(app) {
  var keyz = Object.keys(app.subapps ? app.subapps : app.operations).join(', '),
      message = `\n${appName}: ${appDescription} \n\nUsage`; 
  if (keyz.length == 0) keyz = 'none'
  keyz.split(', ').forEach(function(v) {
    message += `\n  ${appName} ${app.name} ${v}`
  });
  exitMessage(message);
}

function arrDiff(x, y) {
  return x.filter(function(a) {
    return y.indexOf(a) < 0;
  });
};

function flagsHasArguments(x) {
  var t = x.split('=');
  return (t[1] === undefined || t[1] === '')
}

function toObjPair(pairs, cb) {
  var obj = {}
  pairs.forEach(function(x) {
    var t = x.split('=');
    if (cb) t[0] = cb(t[0]);
    obj[t[0]] = t[1];
  });
  return obj;
};

function removeFlagSymbols(x) {
  return x.replace(/-|=/g, '');
}

function exitMessage(message) {
  console.error(message);
  process.exit(0);
};

exports.withFlags = function(app) {
  var missingFlags = arrDiff(app.requiredFlags, 
                             Object.keys(toObjPair(app.args)))
                             .map(removeFlagSymbols),
      flagArgs = app.args.filter(flagsHasArguments);
  if (app.requiredFlags) {
    if (missingFlags.length > 0) exitMessage(messages['requiredFlags'](missingFlags));
  }
  if (flagArgs.length > 0) {
    exitMessage(messages['missingArgs'](flagArgs));
  };
  return toObjPair(app.args, removeFlagSymbols);
}
