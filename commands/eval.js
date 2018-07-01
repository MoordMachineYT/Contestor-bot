const util = require("util");

exports = module.exports = (client, website, msg, args) => {
  try {
    let evaled = eval(args);
    if(evaled) {
      msg.channel.createMessage(require("util").inspect(evaled, {
        depth: Array.isArray(evaled) ? 2 : 1
      }).slice(0, 2000));
    } else {
      msg.channel.createMessage("" + evaled);
    }
  } catch(err) {
    msg.channel.createMessage(err);
  }
};
exports.call = "eval";
exports.permLevel = 5;
exports.description = "Evaluates JavaScript code.";
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