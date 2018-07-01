"use strict";

const Bot = require("./bot.js");
const DataStorage = require("./DataStorage.js");
const UserStorage = require("./UserStorage.js");
const Website = require("./website.js");

class Manager {
  constructor() {
    this.db = new DataStorage(false);
    this.website = new Website(this);
    this.bot = new Bot(this);
    this.users = new UserStorage();
  }
  launch(port) {
    this.website.launch(port);
    this.bot.launch();
    this.registerEvents();
    this.db.connect();
  }
  registerEvents() {
    this.db.on("open", url => this.bot.emit("dbOpen", url)).on("close", code => this.bot.emit("dbClose")).on("debug", val => this.bot.emit("dbDebug", val)).on("error", err => this.bot.emit("dbError", err));
  }
  ping() {
    this.website.ping();
  }
  emit(ev, param1, param2, param3) {
    return this.bot.emit(ev, param1, param2, param3);
  }
}

const manager = new Manager();
setInterval(() => manager.ping(), 275000);
manager.launch(process.env.PORT || 3000);

process.on("unhandledRejection", err => {
  console.log("Unhandled promise rejection: ", err.message);
});