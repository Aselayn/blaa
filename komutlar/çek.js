const Discord = require('discord.js');
exports.run = async (client, message, args ) => {
  if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setTitle(``).setColor('#ff0000').setFooter('Exercitus', client.user.avatarURL).setThumbnail(message.author.avatarURL).setTimestamp().setDescription('Bu komutu kullanabilmek için, __Üyeleri Taşı__ iznine sahip olmalısın!'))

 let seslikanal = message.member.voiceChannelID
let seslikanal1 = message.member.voiceChannel
let kullanıcı = message.mentions.members.first()
let kullanıcıkanal = kullanıcı.voiceChannel
if(!seslikanal) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Herhangi bir ses kanalında bulunmalısın!'))
if(kullanıcı.id == message.member.id) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Kendini herhangi bir ses kanalına çekemezsin!'))
if(!args[0]) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Herhangi birini etiketlemelisin!'))
if(!kullanıcıkanal) message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Etiketlediğin kullanıcı şuanda herhangi bir ses kanalında bulunmuyor!')) 

if(kullanıcıkanal) {
kullanıcı.setVoiceChannel(seslikanal)
message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setTitle(``).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription(`${kullanıcı} başarıyla, __${kullanıcıkanal}__ kanalından, __${seslikanal1}__ kanalına çekildi!`))
}
 }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çek',
  açıklama: ''
};