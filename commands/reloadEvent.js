exports = module.exports = (client, website, msg, ev) => {
  if(!client.evListeners.has(ev)) {
    return msg.channel.createMessage("Event not found.");
  }
  client.client.removeAllListeners(ev);
  delete require.cache[require.resolve(`../events/${ev}.js`)];
  const event = require(`../events/${ev}.js`);
  client.evListeners.set(ev, event);
  if(event.enabled) client.client.on(ev, (param1, param2, param3) => event(client, website, param1, param2, param3));
  msg.channel.createMessage(`Successfully reloaded event ${ev}!`);
};
exports.call = "reloadEvent";
exports.permLevel = 5;
exports.description = "";
exports.aliases = [];
exports.caseInsensitive = false;
exports.argsRequired = true;
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