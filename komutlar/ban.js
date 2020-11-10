const Discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) 
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return  message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Hey, dostum! \n \n yeterli iznin bulunmamakta.')).then(m => m.delete(8000))
    if (!args[0]) {
        return  message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('ID belirtmelisin!'))
   }
   var sebeb = args.slice(1).join(" ");
   var seyfooo = args[0]
   var now = new Date()
   if (!sebeb) {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Bu kullanıcı zaten uzaklaştırılmış!'))
               }
               message.guild.ban(seyfooo, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.fetchUser(member);
                       }
                       message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription(`<@!${user.id}> Adlı kullanıcı uzaklaştırıldı!`))
                   })
                   .catch(error => {
                    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Hata oluştu'))
                       console.error(':x: Hata:', error);
                   });
           });
   } else {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Bu kullanıcı zaten uzaklaştırılmış!'))
               }
               message.guild.ban(seyfooo, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.fetchUser(member);
                       }
                       message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('<@!${user.id}> sunucudan uzaklaştırıldı!'))
                   })
                   .catch(error => {
                    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setFooter('Exercitus', client.user.avatarURL).setTimestamp().setDescription('Hata oluştu'))
                       console.error(' Hata:', error);
                   });
           });
   }
 
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['ban'],
   permLevel: 3
 
};
 
exports.help = {
   name: 'ban',
   description: 'Oylama yapmanızı sağlar.',
   usage: 'forceban <id>'
};
