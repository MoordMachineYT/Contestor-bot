// const Map = require("collection").Map;

exports = module.exports = (client, website) => {
  console.log("The bot has started/resumed with " + client.commands.size + " commands and " + 
              client.evListeners.size + " event listeners!");
  client.colors = require("../colors.js");
  client.emojis = new Map();
  for(const guild of client.guilds.values()) {
    for(const emoji of guild.emojis) {
      emoji.toString = () => `${emoji.animated ? "<a:" : "<:"}${emoji.name}:${emoji.id}>`;
      client.emojis.set(emoji.id, emoji);
    }
  }
  if(!client.presenceInterval) client.presenceInterval = setInterval(() => {
    if(client.ready) client.editStatus("online", {
      name: client.presences.next().value,
      type: ~~client.utils.rand(2, 2)
    });
  }, 12000);
  for(const guild of client.guilds.keys()) {
    const module = client.modules.get(guild) || [];
    for(const command of client.commands.values()) {
      if(!command.module) continue;
      if(!module.find(mod => mod.module === command.module)) module.push({
        enabled: true,
        commands: [],
        module: command.module
      });
      module.find(mod => mod.module === command.module).commands.push(command.call);
    }
    client.modules.set(guild, module);
  }
};
exports.enabled = true;