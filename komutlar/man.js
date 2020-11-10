const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('#ff0000').setThumbnail(message.author.avatarURL).setTimestamp().setDescription('Bu komutu kullanabilmek için __Kullanıcı Adları Yönet__ iznine sahip olmalısın!'))

let kullanici = message.mentions.users.first();
let isim = args.slice(1).join(' '); 
let member = message.mentions.members.first();

if(!member) return message.channel.send(
new Discord.RichEmbed()
.setColor('RANDOM')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
.setDescription('Kayıt ediceğin kullanıcıyı etiketlemelisin!'))
        .setTimestamp()

if(!isim)return message.channel.send(
new Discord.RichEmbed()
.setColor('RANDOM')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
.setDescription('Kayıt etmek istediğin kullanıcının adını ve ismini girmelisin!'))
        .setTimestamp()

  member.removeRole('757614480313155746')//kayıtssız rol id
  member.addRole('757614369365426266')//erkek rolü id
const embed = new Discord.RichEmbed()

message.guild.members.get(kullanici.id).setNickname(`${isim}`)
 return message.channel.send(
 new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Hey, yeni bir kullanıcı kayıt edildi! \n \n <a:snszlk:757639371993120839> Kayıt edilen üye: ${member.user} \n \n <a:snszlk:757639371993120839> Girilen isim: __${isim}__\n \n <a:snszlk:757639371993120839> Verilicek rol: <@&757614369365426266> \n \n <a:snszlk:757639371993120839> Kayıt eden yetkili: <@${message.author.id}>`)
        .setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/773264679371538494/775106907773861918/tenor.gif')
        .setThumbnail(message.author.avatarURL)
)}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "man",
  description: "",
  usage: ""
};