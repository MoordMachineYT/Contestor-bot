exports = module.exports = (bot, website, msg, args) => {
  if(!args) {
    return msg.channel.createMessage({
      embed: {
        thumbnail: {
          url: msg.author.avatarURL
        },
        color: bot.colors.AQUA,
        title: "Commands",
        description: `✅ Try \`${bot.prefixes[0]}help <command>\` to get information about my commands. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
        footer: {
          text: `Thank you for using Contestor | ${bot.prefixes[0]}help`
        }
      }
    });
  }
  const cmd = bot.commands.get(bot.aliases.get(args) || args);
  if(!cmd) {
    return msg.channel.createMessage({
      embed: {
        thumbnail: {
          url: msg.author.avatarURL
        },
        color: bot.colors.RED,
        title: ":four::zero::four: Not found",
        description: `❌ Command ${args} not found. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
        footer: {
          text: `Thank you for using Contestor | ${bot.prefixes[0]}help`
        }
      }
    });
  }
  if(cmd.permLevel === 5 && !~bot.devs.indexOf(msg.author.id)) {
    return msg.channel.createMessage({
      embed: {
        color: bot.colors.RED,
        title: "<:prohibited:324404946298732544> Private",
        description: `❌ Command ${args} is private, and therefore only my developers can see it. \nTry \`${bot.prefixes[0]}commands\` to see my commands!`,
        footer: {
          text: `Thank you for using Contestor | ${bot.prefixes[0]}help`
        }
      }
    });
  }
  msg.channel.createMessage({
    embed: {
      title: `<:greencheck:324404826123272192> ${cmd.call}`,
      color: bot.colors.GREEN,
      description: cmd.description || "No description.",
      thumbnail: {
        url: msg.author.avatarURL
      },
      fields: [{
        name: "Usage",
        value: "`" + (cmd.usage || `${bot.prefixes[0] + cmd.call} ${cmd.argsRequired ? "<args>" : ""}`) + "`"
      }],
      footer: {
          text: `Thank you for using Contestor | ${bot.prefixes[0]}help`
      }
    }
  });
};
exports.call = "help";
exports.permLevel = 0;
exports.description = "Shows information about commands.";
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