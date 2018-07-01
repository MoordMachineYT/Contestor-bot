exports = module.exports = (client, website, msg) => {
  if(!msg.author) return;
  if(msg.author.bot) return;
  if(!msg.content) return;
  if(msg.content === client.client.user.mention) {
    return msg.channel.createMessage({
      embed: {
        description: `✅ My prefix is:\n${client.prefixes[0]}\nNeed help? Type ${client.prefixes[0]}help for everything you need!`,
        color: 0x00FFFF
      }
    }).catch(() => {});
  }
  const prefix = client.prefixes.find(pref => msg.content.startsWith(pref));
  if(!prefix) return;
  let [command, ...args] = msg.content.slice(prefix.length).split(" ");
  if(!command) return;
  const cmd = resolveCommand(client, command, args);
  if(!cmd) return;
  if(!cmd.enabled) {
    if(cmd.disabled) msg.channel.createMessage(typeof cmd.disabled === "string" ? cmd.disabled : cmd.disabled(client, msg, args.join(" "))).catch(() => {});
    return;
  }
  if(cmd.argsRequired && !args.length) {
    if(cmd.invalidUsage) msg.channel.createMessage(typeof cmd.invalidUsage === "string" ? cmd.invalidUsage : cmd.invalidUsage(client, msg, args.join(" "))).catch(() => {});
    return;
  }
  if(!getPerms(client, cmd, msg)) {
    if(cmd.invalidPerms) msg.channel.createMessage(typeof cmd.invalidPerms === "string" ? cmd.invalidPerms : cmd.invalidPerms(client, msg, args.join(" "))).catch(() => {});
    return;
  }
  cmd(client, website, msg, msg.content.slice(prefix.length + command.length + 1));
};
exports.enabled = true;

function resolveCommand(client, command, args) {
  const call = client.aliases.get(command) || command;
  const commands = client.commands;
  let cmd = commands.get(call);
  if(!cmd) {
    cmd = commands.get(command.toLowerCase());
    if(!cmd || !cmd.caseInsensitive) return;
  }
  return cmd;
}
function getPerms(client, cmd, msg) {
  if(!cmd.permLevel) return true;
  if(~client.devs.indexOf(msg.author.id)) return true;
  if(cmd.permLevel === 1) {
    if(msg.member.permission.has("manageMessages")) return true;
    return false;
  }
  if(cmd.permLevel === 2) {
    if(msg.member.permission.has("manageGuild")) return true;
    return false;
  }
  if(cmd.permLevel === 3) {
    if(msg.member.permission.has("administrator")) return true;
  }
  if(cmd.permLevel === 4) {
    if(msg.channel.guild.ownerID === msg.author.id) return true;
    return false;
  }
  if(cmd.permLevel === 5) return false;
}