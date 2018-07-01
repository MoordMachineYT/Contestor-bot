exports = module.exports = async (client, website, msg, args) => {
  const setPage = async num => {
    await newMsg.removeReactions();
    newMsg = await newMsg.edit({
      embed: {
        title: "Commands | page " + num,
        description: style(commands[num-1], num-1),
        color: client.colors.AQUA,
        footer: {
          text: `Thank you for using Contestor | ${client.prefixes[0]}help`
        }
      }
    });
    if(num === 1) {
      await newMsg.addReaction("➡");
    } else if(num < commands.length) {
      await newMsg.addReaction("⬅");
      await newMsg.addReaction("➡");
    } else {
      await newMsg.addReaction("⬅");
    }
  };
  const reactionAdd = (message, emoji, userID) => {
      let changed;
      if(message.id === newMsg.id && msg.author.id === userID && (emoji.name === "⬅" || emoji.name === "➡")) {
        setPage(emoji.name === "⬅" ? --page : ++page);
        changed = true;
      }
      if(changed) {
        clearTimeout(timeout);
        timeout = setTimeout(() => client.off("messageReactionAdd", reactionAdd), 30000);
      }
    }
  const commands = client.utils.split(client.commands.filter(c => c.enabled && c.permLevel !== 5).map(c => c.call), 10);
  var newMsg = await msg.channel.createMessage({
    embed: {
      title: "Commands",
      description: style(commands[0], 0),
      color: client.colors.AQUA,
      footer: {
        text: `Thank you for using Contestor | ${client.prefixes[0]}help`
      }
    }
  });
  var page = 1;
  var timeout;
  if(commands.length > 1) {
    await newMsg.addReaction("➡");
    client.on("messageReactionAdd", reactionAdd);
    timeout = setTimeout(() => client.off("messageReactionAdd", reactionAdd), 30000);
  }
};
exports.call = "commands";
exports.permLevel = 0;
exports.description = "A list of commands.";
exports.aliases = ["cmds"];
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

function style(commands, page) {
  let i = 10*page;
  return commands.map(c => `${++i}. ${c}`).join("\n");;
}
