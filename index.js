var router = require("./router"),
    reddit = require("./reddit"),
    subapps = {
      "router": router,
      "reddit": reddit,
    };

function startTask(opts) {
  console.log("\nTedious: For things that you do repeatedly\n");
  if (opts.length == 0) {
    console.log("Available commands: " + Object.keys(subapps).join(", ") + "\n");
  } else if (opts.length == 1) {
    console.log("Available commands for " + opts[0] + ": " + subapps[opts[0]].operations.join(", ") + "\n");
  } else {
    subapps[opts[0]].init(opts.slice(1));
  }
}

startTask(process.argv.slice(2));
