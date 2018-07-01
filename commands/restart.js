const fs = require("fs");

exports = module.exports = async (client, website, msg, args) => {
  
  let newMsg = await msg.channel.createMessage("Restarting now...");
  await client.client.disconnect({
    reconnect: true
  });
  const commands = await fs.readdirSync(__dirname);
  commands.filter(f => f.endsWith(".js")).forEach(f => delete require.cache[require.resolve(`./${f}`)]);
  const events = await fs.readdirSync(require("path").join(__dirname, "../events"));
  events.filter(f => f.endsWith(".js")).forEach(f => delete require.cache[require.resolve(`../events/${f}`)]);
  client.commands.clear();
  client.aliases.clear();
  client.evListeners.clear();
  client.client.eventNames().forEach(ev => client.client.removeAllListeners(ev));
  client.client.prependOnceListener("ready", () => {
    newMsg.edit("Restarted!").then(() => newMsg.addReaction("✅"));
  });
  client.launch();
  
};
exports.call = "restart";
exports.permLevel = 5;
exports.description = "";
exports.aliases = [];
exports.caseInsensitive = true;
exports.argsRequired = false;
exports.enabled = true;