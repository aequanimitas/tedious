var EventEmitter = require("events").EventEmitter; 
    client = require("./client");
    Reddit = require("./reddit");

var nba = new Reddit({
  "sub": "/r/nba",
  "format": ".json" 
});

function Router() {
  this.host = "192.168.254.254";
  this.path = "";
}

client(nba);
