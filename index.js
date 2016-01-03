var router = require('./router'),
    reddit = require('./reddit'),
    cli = require('./cli'),
    packageInfo = require('./package.json'),
    subapps = {
      'router': router,
      'reddit': reddit,
    };

function init() {
  console.log(
    `${packageInfo.name} v${packageInfo.version}`
  );
  return;
//
//  cli.sequential({
//    'subapps': subapps,
//    'args': process.argv.slice(2),
//    'app': {
//      'name': packageInfo.name,
//      'description': packageInfo.description
//    }
//  });
}

init();
