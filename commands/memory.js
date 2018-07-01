exports = module.exports = (client, website, msg, args) => {
  const mem = process.memoryUsage();
  msg.channel.createMessage({
    embed: {
      author: {
        name: "Memory usage",
        icon_url: msg.author.avatarURL
      },
      description: `\`\`\`md\n* rss: ${~~(mem.rss/1024**2)}MB\n* heapTotal: ${~~(mem.heapTotal/1024**2)}MB\n* heapUsed: ${~~(mem.heapUsed/1024**2)}MB\n* external: ${~~(mem.external/1024**2)}MB\n\`\`\``,
      footer: {
        text: `Thank you for using Contestor | ${client.prefixes[0]}help`
      }
    }
  });
};
exports.call = "memory";
exports.permLevel = 0;
exports.description = "";
exports.aliases = ["mem"];
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