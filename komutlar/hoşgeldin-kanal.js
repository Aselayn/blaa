const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
if(!message.member.hasPermission("ADMINISTRATOR")) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription('Hey, ``Yönetici`` iznine sahip olmalısın.')
return message.channel.send(embed)
}
let kinal = db.fetch(`hgK_${message.guild.id}`)
if(db.has(`hgK_${message.guild.id}`)) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`Hey, hoşgeldin kanalını ayarlanmış! \n \n sıfırlamak için: \`${ayarlar.prefix}hoşgeldin-sıfırla\``)
.setTimestamp()
.setThumbnail(message.author.avatarURL)
.setFooter('Exercitus', client.user.avatarURL)
message.delete()
return message.channel.send(embed)
}
  
let kanal = message.mentions.channels.first();
  
if(!kanal) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`Hey, herhangi bir kanalı etiketlemelisin! \n \n \`Örneğin: ${ayarlar.prefix}hoşgeldin-kanal #kanal\``)
.setTimestamp()
.setThumbnail(message.author.avatarURL)
.setFooter('Exercitus', client.user.avatarURL)
message.delete()
return message.channel.send(embed)
}
db.set(`hgK_${message.guild.id}`, kanal.id);

const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`Hoşgeldin kanalını ${kanal} olarak ayarlandı`)
.setTimestamp()
.setAuthor(message.author.username, message.author.avatarURL)
.setFooter('Exercitus', client.user.avatarURL)
message.delete()   
message.channel.send(embed)                                                                                                                                      
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [''],
permLevel: 4
};

exports.help = {
name: 'hoşgeldin-kanal',
description: '',
usage: 'hoşgeldin-kanal #kanal'
};