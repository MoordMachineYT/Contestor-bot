exports = module.exports = (client, website, msg, cmd) => {
  if(!client.commands.has(cmd)) return msg.channel.createMessage(`❌ Command "${cmd}" not found.`).catch(() => {});
  try {
    delete require.cache[require.resolve(`./${cmd}.js`)];
  } catch(err) {
    return msg.channel.createMessage("❌ Failed to reload command: " + err.message);
  }
  const command = require(`./${cmd}.js`);
  client.commands.set(command.call, command);
  for(const alias of command.aliases) if(alias) client.aliases.set(alias, command.call);
  msg.channel.createMessage(`✅ Successfully reloaded ${cmd}!`);
};
exports.call = "reload";
exports.permLevel = 5;
exports.description = "";
exports.aliases = ["rl"];
exports.caseInsensitive = true;
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