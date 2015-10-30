// if an argument that was passed when the main app was invoked
// is a subapp, 
//     - if the subapp has no subapps but operations only, call the operations
//     - if the subapp has subapps, check if
//

module.exports = function(app) {
  var args = process.argv.slice(2);
      helpMessage = {
        "header": "\n" + app.name + ": " + app.description + "\n"
      }


  if (args.length == 0) {
    app.hasOwnProperty("help") ? app.help() : help(app);
    return;
  }

  if (app.subapps.hasOwnProperty(args[0])) {
    if (args.length == 1) {
      help(app.subapps[args[0]])
    } else {
      app.subapps[args[0]].operations[args[1]]();
    }
  }

  function help(app) {
    console.log(helpMessage.header);
    if (app.subapps) {
      console.log("Available commands for "+ app.name + ": "+ Object.keys(app.subapps).join(", ") + "\n");
    } else {
      console.log("Available commands for "+ app.name + ": "+ Object.keys(app.operations).join(", ") + "\n");
    }
  }
};

