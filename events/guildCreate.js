exports = module.exports = (client, website, guild) => {
  for(const emoji of guild.emojis) {
    emoji.toString = () => `${emoji.animated ? "<a:" : "<:"}${emoji.name}:${emoji.id}>`;
    client.emojis.set(emoji.id, emoji);
  }
  const ch = guild.channels.find(channel => channel.type === 0 && channel.permissionsOf(client.client.user.id).has("sendMessages"));
  if(ch) ch.createMessage(`<:blobwave:460447566106984459> Hey there, thank you for adding me to your server. Try ${client.prefixes[0]}help to see what I can do!`);
};
exports.enabled = true;