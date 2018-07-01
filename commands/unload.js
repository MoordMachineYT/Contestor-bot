exports = module.exports = (client, website, msg, cmd) => {
  try {
    if(!cmd.endsWith(".js")) cmd += ".js";
    delete require.cache[require.resolve(`./${cmd}`)];
    const command = require(`./${cmd}`);
    command.enabled = false;
    client.commands.set(command.call, command);
    for(const alias of command.aliases) if(alias) client.aliases.set(alias, command.call);
    console.log(`Unloaded ${cmd}`);
    msg.channel.createMessage(`Successfully unloaded ${cmd}!`);
  } catch(err) {
    msg.channel.createMessage("Command not found.");
  }
};
exports.call = "unload";
exports.permLevel = 5;
exports.description = "";
exports.aliases = [];
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