function circular(app, opt, args) {
  if (isSubapp(app, opt)) {
    circular(app.subapps[opt], args[0], args.slice(1));
  } else if (isOperation(app, opt)) {
    app.operations[opt]();
  } else {
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

// has subapps
function isSubapp(app,opt) {
  return !(app.subapps === undefined) && app.subapps.hasOwnProperty(opt);
}

// has operation
function isOperation(app,opt) {
  return app.operations.hasOwnProperty(opt);
}

function help(app) {
  if (app.subapps) {
    console.log("Available commands for "+ app.name + ": "+ Object.keys(app.subapps).join(", ") + "\n");
  } else {
    console.log("Available commands for "+ app.name + ": "+ Object.keys(app.operations).join(", ") + "\n");
  }
}
