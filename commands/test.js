exports = module.exports = (client, website, msg, args) => {
  msg.channel.createMessage("<a:ablobgift:460444029490954261>");
};
exports.call = "test";
exports.permLevel = 0;
exports.description = "";
exports.aliases = [];
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