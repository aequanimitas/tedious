var appName = "", appDescription = "";
exports = module.exports = {};

var messages = {
  unOpts: function(m) { return "Unrecognized option: " + m + "\n"; }
};

function circular(app, opt, args) {
  if (opOrApp(app, opt, "subapps")) {
    circular(app.subapps[opt], args[0], args.slice(1));
  } else if (opOrApp(app, opt, "operations")) {
    app.operations[opt]();
  } else {
//    process.stdout.write("Unrecognized option: " + opt);
    help(app);
  }
}

exports.sequential = function(app) {
  if (app.args.length == 0) {
    app.hasOwnProperty("help") ? app.help() : help(app);
    return;
  }
  appName = app.name;
  appDescription = app.description;
  circular(app, app.args[0], app.args.slice(1));
}

function opOrApp(app, opt, prop) {
  return !(app[prop] === undefined) && app[prop].hasOwnProperty(opt);
}

function help(app) {
  var keyz = Object.keys(app.subapps ? app.subapps : app.operations).join(", "),
      message = "\n" + appName + ": " + appDescription + "\n\n" +
                "\nUsage";
  if (keyz.length == 0) keyz = "none"
  keyz.split(", ").forEach(function(v) {
    var appInvoke = appName + " " + app.name;
    message += "\n  " + appInvoke + " " + v;
  });
  process.stdout.write(message + "\n");
}

function reqArgsPresent(args) {

}

exports.withFlags = function(app) {
  // check if required args exists in args
  // if the arg is present but has no value, return a message
  if (app.requiredArgs) {
    console.log('app has required args');
  }
  var flags = app.args.filter(function(x) {
    if (x[0] == '-') return x;
  });
  var opts = {};
  flags.map(function(x) {
    var optVal = x.split("=");
    opts[optVal[0]] = optVal[1];
  });
  console.log(opts);
};
