exports = module.exports = (client, website, guild) => {
  guild.emojis.forEach(async e => client.emojis.delete(e.id));
};
exports.enabled = true;