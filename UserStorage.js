const enmap = require("enmap");
const provider = require("enmap-sqlite");

class UserStorage {
  constructor() {
    this.db = new enmap({ provider: new provider({ name: "userStorage" }) });
    this.db.defer;
  }
  async has(token) {
    return await this.db.has(token);
  }
  set(token, user) {
    if(this.has(token)) return this.update(token, user);
    this.db.set(token, user);
  }
}

module.exports = UserStorage;