var router = require("./router"),
    reddit = require("./reddit"),
    cli = require("./cli"),
    packageInfo = require("./package.json"),
    subapps = {
      "router": router,
      "reddit": reddit,
    };

function init() {
  cli.sequential({
    "subapps": subapps,
    "args": process.argv.slice(2)
  });
}

init();
