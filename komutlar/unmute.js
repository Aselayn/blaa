const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('#ff0000').setThumbnail(message.author.avatarURL).setTimestamp().setDescription(''))

let member = message.mentions.members.first();

if(!member) return message.channel.send(
new Discord.RichEmbed()
.setColor('RANDOM')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
.setDescription('Herhangi birini etiketlemelisiin'))
        .setTimestamp()
  member.removeRole('768090206250598411')//kayıtssız rol id
const embed = new Discord.RichEmbed()

 return message.channel.send(
 new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Hey, ${member.user} adlı kullanıcının cezası kaldırıldı`)
        .setTimestamp()
)}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0
};
exports.help = {
  name: "unmute",
  description: "",
  usage: ""
};