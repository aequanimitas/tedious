var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var Promise = require('bluebird');
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';
var moment = require('moment');
var gmail = google.gmail('v1');
var counter = 0;

fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  authorize(JSON.parse(content), newsletters);
});

var authObj = {
  auth: null,
  userId: 'me',
};

function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function newsletters(auth) {
  authObj.auth = auth;
  gmail.users.messages.list({
    auth: auth,
    userId: 'me',
    q: process.argv.slice(2)[0]
  }, handleMessageList);
}

function handleMessageList(err, response) {
  if (err) {
    console.log(err);
    return;
  } else {
    var messages = response.messages.reduce(function(a,b) {
      a.push(b.id);
      return a;
    }, []);
    var looped = setInterval(function() {
      if (counter >= messages.length) {
        console.log('Task done!!');
        clearInterval(looped);
      } else {
        authObj['id'] = messages[counter];
        gmail.users.messages.get(authObj, writeAsMarkdown);
        counter += 1;
      }
    }, 3000);
  }
}

function writeAsMarkdown(err, response) {
  if (err) {
    console.log(err);
    return;
  } else {
    var tDate = moment(parseInt(response.internalDate, 10)).format('YYYY_MMMM_DD');
    var title = [process.argv.slice(3), tDate].join('_') + '.md';
    fs.writeFile(title, new Buffer(response.payload.parts[0].body.data, 'base64').toString('ascii'), function(err) {
      if(err) return console.log(err);
      console.log('Links written at: ' + title);
    });
  }
}
