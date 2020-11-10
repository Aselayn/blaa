const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription(`Hey, ${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`))
let log = await db.fetch(`mlog_${msg.guild.id}`)
  if (!log) return msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription('Hey, log kanalı ayarlı değil! \n \n Ayarlamak için: `.mute-log #kanal`'))
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')
 
  if (!user) return msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription('Hey, herhangi bir kullanıcıyı etiketlemelisin!'))
 if (!reason) return msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription('Hey, süre belirtmelisin! \n \n Örneğin: `1sn/1m/1h/1d/1w`'))
if (!sebep) return msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription('Hey, sebep belirtmelisin!'))
 
 
 
  let mute = msg.guild.roles.find(r => r.name === "Muted");
         
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
 
    }
 
 
  await(user.addRole(mute.id));
msg.channel.send(``)
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription(`${user} Adlı kullanıcı , ${mutezaman} susturuldu!`))
db.set(`muteli_${msg.guild.id + user.id}`, 'muteli')
db.set(`süre_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                         
  const muteembed = new Discord.RichEmbed()
        .setTitle('Ceza: susturulma')
    .setThumbnail(msg.author.avatarURL)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setTimestamp()
    .setDescription(`Hey, ${user} adlı kullanıcı metin kanallarında susturuldu!`)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Süre',`\`${mutezaman}\``)
  .setColor("RANDOM")
msg.guild.channels.get(log).sendEmbed(muteembed)
 
  setTimeout(function(){
db.delete(`muteli_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription(`Hey, <@${user.id}> susturulma cezan kalktı!`))
  }, ms(mutetime));
 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 3
};
 
exports.help = {
  name: "mute",
  description: "",
  usage: ""
};