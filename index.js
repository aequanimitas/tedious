var router = require("./router"),
    reddit = require("./reddit"),
    tresdin = require("./tresdin"),
    packageInfo = require("./package.json"),
    subapps = {
      "router": router,
      "reddit": reddit,
    };

function init() {
  tresdin.sequential({
    "name": packageInfo.name,
    "description": packageInfo.description,
    "subapps": subapps,
    "args": process.argv.slice(2)
  });
}

init();
