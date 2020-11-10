const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu komutu kullanabilmek için `Yönetici` iznine sahip olmalısın!')
message.delete()
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  try {
    await db.delete(`hgK_${message.guild.id}`);
    await message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setTitle(``).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Hey, hoşgeldin kanalı başarıyla sıfırlandı.'))//message.reply(' Hoşgeldin kanalı sıfırlandı')
  } catch(err) { console.log(err) }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 4
};

exports.help = {
  name: 'hoşgeldin-sıfırla',
  description: '',
  usage: '',
};