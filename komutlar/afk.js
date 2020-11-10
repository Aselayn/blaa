const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let user = message.author
  let sebep = args.join(" ")

  if (!sebep) return  message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription('Sebep belirtmelisin!'))
  message.member.setNickname(`AFK ${message.author.username}`);    
  db.set(`afk_${user.id}`, sebep)
  message.channel.send(new Discord.RichEmbed().setTimestamp().setColor('RANDOM').setDescription(`**__${sebep}__** sebebiyle afk oldun.`))
message.delete()
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: ''
}