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

module.exports = function(app) {
  if (app.args.length == 0) {
    app.hasOwnProperty("help") ? app.help() : help(app);
    return;
  }

  circular(app, app.args[0], app.args.slice(1));
}

function opOrApp(app, opt, prop) {
  return !(app[prop] === undefined) && app[prop].hasOwnProperty(opt);
}

function help(app) {
  var keyz = Object.keys(app.subapps ? app.subapps : app.operations).join(", ");
  if (keyz.length == 0) keyz = "none"
  process.stdout.write("\nAvailable commands for " + app.name + ": " + keyz + "\n\n")
}
