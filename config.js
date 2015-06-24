exports.config = {
  keepAlive: true,
  headers: {
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "DNT": 1,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36",
  }
  basicAuth: {
    username: process.env.ROUTER_BASIC_USERNAME || "user",
    password: process.env.ROUTER_BASIC_PASSWORD || "password"
  },
  username: process.env.ROUTER_USERNAME || "",
  password: process.env.ROUTER_PASSWORD || ""
}
