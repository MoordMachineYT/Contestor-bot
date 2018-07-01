const config = require("./config.json");
const path = require("path");
const enmap = require("enmap");
const provider = require("enmap-sqlite");
const eris = require("eris");
const Map = eris.Collection;
const fs = require("fs");
const presences = [
  val => `${val} guilds | co!help`,
  val => `${val} users | co!help`,
  val => `you and ${val-1} others | co!help`
];

class Bot extends eris.Client {
  constructor(manager) {
    super(config.token, {
      getAllUsers: true
    });
    this.manager = manager;
    this.devs = [ "392028262965968907"];
    this.commands = new Map();
    this.aliases = new Map();
    this.evListeners = new Map();
    this.prefixes = ["co!"];
    this.presences = function*(i) {
      while(true) {
        i %= presences.length;
        yield presences[i](i++ === 0 ? this.guilds.size : this.users.size);
      }
    };
    this.prependOnceListener("ready", () => {
      this.presences = this.presences(0);
    });
    this.utils = require("./utils.js");
    this.modules = new enmap({ provider: new provider({ name: "guildModules" }) });
  }
  register() {
    const commands = fs.readdirSync(path.join(__dirname, "commands"));
    commands.filter(f => f.endsWith(".js")).forEach(f => {
      const file = require(`./commands/${f}`);
      this.commands.set(file.caseInsensitive ? file.call.toLowerCase() : file.call, file);
      console.log(`Registered ${file.enabled ? "and loaded " : ""}${f}`);
      for(const alias of file.aliases) if(alias) this.aliases.set(alias, file.call);
    });
    const events = fs.readdirSync(path.join(__dirname, "events"));
    events.filter(f => f.endsWith(".js")).forEach(f => {
      const file = require(`./events/${f}`);
      this.evListeners.set(f.slice(0, f.length - 3), file);
      if(file.enabled) this.client.on(f.slice(0, f.length - 3), (param1, param2, param3) => file(this, this.manager.website, param1, param2, param3));
    });
  }
  launch() {
    this.register();
    return this.client.connect();
  }
  get client() {
    return this;
  }
}

module.exports = Bot;