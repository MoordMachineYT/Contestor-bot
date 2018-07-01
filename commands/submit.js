exports = module.exports = (client, website, msg, args) => {
  msg.channel.createMessage("Framework is too OP!").catch(() => {});
};
exports.call = "submit";
exports.permLevel = 0;
exports.description = "";
exports.aliases = [];
exports.caseInsensitive = true;
exports.argsRequired = true;
exports.enabled = true;
exports.disabled = (client, msg, args) => {
  return {
    embed: {
      color: client.colors.RED,
      thubmnail: {
        url: "https://cdn.discordapp.com/avatars/392028262965968907/e8766ad589d3ac920374219298ed0b31.jpg?size=128"
      },
      description: `${msg.author.mention}, I'm sorry, but this command is disabled. If this shouldn't be the case, please contact one of my creators.`,
      footer: {
        text: `Thank you for using Contestor | ${client.prefixes[0]}help`
      }
    }
  }
};