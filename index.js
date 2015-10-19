var router = require("./router");
var subapps = {
  "router": router.init,
  "reddit": "",
};

function startTask(opts) {
  if (opts.length == 0) {
    console.log("\nTedious: For things that you do repeatedly\n");
    console.log("Available commands: " + Object.keys(subapps).join(", ") + "\n");
  } else {
    subapps[opts[0]](opts.slice(1));
  }
}

startTask(process.argv.slice(2));
