const config = require("./config.json");
const express = require('express');
const authorization = require("client-oauth2");
const cookieParser = require("cookie-parser");
const http = require("http");

class Website {
  constructor(manager) {
    this.manager = manager;
    this.isOnline = false;
    this.oauth2 = new authorization({
      clientSecret: config.secret,
      clientId: "392028262965968907",
      accessTokenUri: "https://discordapp.com/api/oauth2/token",
      authorizationUri: "https://discordapp.com/api/oauth2/authorize",
      redirectUri: "https://contestor.glitch.me/authorized",
      scopes: ["identify", "guilds"]
    });
    this.server = express();
    this.server.use(express.static('public'));
    this.server.use(cookieParser());
    this.server.get("/", function (req, res) {
      res.sendFile(__dirname + '/index.html');
    });
    this.server.get("/login", (req, res) => {
      if(req.cookies && req.cookies.token) {
        if(this.users.has(req.cookies.token)) {
          
        } else {
          res.clearCookie();
        }
      }
      res.redirect(this.oauth2.code.getUri());
    });
    this.server.get("/authorized", (req, res) => {
      if(req.cookies && req.cookies.token) {

      }
    });
  }
  ping() {
    http.get("http://contestor.glitch.me/");
  }
  launch(port = process.env.PORT) {
    this.listener = this.server.listen(port, () => console.log(`Server is running on port ${port}!`))
      .on("error", err => this.manager.emit("webError", err))
      .on("listening", () => this.manager.emit("webListening"))
      .on("connection", socket => this.manager.emit("webConnection", socket))
      .on("close", () => this.manager.emit("webClose"));
  }
}

module.exports = Website;