exports = module.exports = (client, website, msg, args) => {
  const db = client.manager.db.connected ? "<:check2:457749533963845632> Connected" : "<:redx:324404899980902403> Cache-only";
  const web = website.isOnline ? "<:check2:457749533963845632> Online" : "<:redx:324404899980902403> Offline";
  const all = client.manager.db.connected && website.isOnline ? "<:check2:457749533963845632> All systems operational" : (!client.manager.db.connected && !website.isOnline ? "<:redx:324404899980902403> All systems down" : "<:OriginalC:459077716755480596> Partially operational");
  msg.channel.createMessage({
    embed: {
      color: client.colors.BROWN,
      fields: [{
        name: "All",
        value: all
      }, {
        name: "Database",
        value: db
      }, {
        name: "Website",
        value: web
      }],
      footer: {
        text: `Thank you for using Contestor | ${client.prefixes[0]}help`
      }
    }
  });
};
exports.call = "system";
exports.permLevel = 0;
exports.description = "";
exports.aliases = ["sys"];
exports.caseInsensitive = true;
exports.argsRequired = false;
exports.enabled = true;
exports.disabled = (client, msg, args) => {
  return {
    embed: {
      color: client.colors.RED,
      description: `${msg.author.mention}, I'm sorry, but this command is disabled. If this shouldn't be the case, please contact one of my creators.`,
      footer: {
        text: `Thank you for using Contestor | ${client.prefixes[0]}help`
      }
    }
  }
};