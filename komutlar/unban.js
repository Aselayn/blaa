const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

  const permError = new Discord.RichEmbed()
    .setColor('#ff0000')
      .setTitle('')
        .setDescription('Hey, dostum! \n \n Bu komutu kullanmak için, __Üyeleri Yasakla__ iznine sahip olmalısın!')
    
  const userError = new Discord.RichEmbed()
    .setColor('#ff0000')
      .setTitle('')
        .setDescription('Hey! ID belirtmelisin')
  
  const userError2 = new Discord.RichEmbed()
    .setColor('#ff0000')
      .setTitle('')
        .setDescription("Hey! ID'de harf kullanamazsın")
  
  const userError3 = new Discord.RichEmbed()
    .setColor('#ff0000')
      .setTitle('')
        .setDescription('Hey, bu kullanıcı uzaklaştırılmamış')
    
  const levelError = new Discord.RichEmbed()
    .setColor('#ff0000')
      .setTitle('')
        .setDescription('Hey, yeterli iznin yok!')


  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send
        (permError).then
          (message.delete()).then
            (msg => msg.delete(5000));
  
  let user = args[0];
    if  (!user) return message.channel.send
          (userError).catch(console.error).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  if  (isNaN(args[0])) return message.channel.send
        (userError2).catch(console.error).then
          (message.delete()).then
            (msg => msg.delete(5000));

  if  (user.highestRole >= message.author.highestRole) return message.channel.send
          (levelError).then
            (message.delete()).then
              (msg => msg.delete(5000));
  
  
  const banList = await message.guild.fetchBans();
  
 // console.log(banList.map(s => s.users.id))
  
  if (!user.id === banList) return message.channel.send
      (userError3).then
        (message.delete()).then
          (msg => msg.delete(5000));
  
  message.guild.unban(user);
  return message.channel.send(`<@!${user}> adlı kullanıcının uzaklaştırılması kaldırıldı.`)
  
  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,

  };

  exports.help = {
    name: 'unban',
    description: 'İstediğiniz kişinin banını kaldırır.',
    usage: 'unban [kullanıcı] [sebep]'
  };