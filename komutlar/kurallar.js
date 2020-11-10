const Discord = require('discord.js');

exports.run = function(client, message) {

const embed = new Discord.RichEmbed()

.setColor('RANDOM')

.setTitle('')

.setAuthor(message.author.username, message.author.avatarURL)

.setTimestamp()

.setDescription(`
**そ EXERCİTUS RULES**

<a:logo:757639759941337260> **Din, Dil ve Irk ayırımı yapmak yasaktır!**

<a:logo:757639759941337260> **Sohbet Odalarında ve Chatte Küfür Etmek Yasaktır!**

<a:logo:757639759941337260> **Chatte ve Seste kavga etmek, Tartışmak, Kavgayı Devam Ettirmek Yasaktır!**

<a:logo:757639759941337260> **Diğer Sunucuların Sesten, Dm'den Reklamını Yapmak Yasaktır!**

<a:logo:757639759941337260> **Sohbet Odalarına Müzik Botu Çağırıp İnsanları Rahatsız Etmek Troll Yapmak Yasaktır**

<a:logo:757639759941337260> **Üyeleri Kışkırtmak, Ortamın Düzenini Bozmak Yasaktır!**

<a:logo:757639759941337260> **Herkes Yaptığı Hakaretten Sorumludur, Her Kural Yazılı Olmak Zorunda Değil!**

<a:logo:757639759941337260> **Spam, Flood Yapmak ve Caps Lock Açmak Yasaktır!**

<a:logo:757639759941337260> **Eğer Bir Yetkili veya normal üye sizi haklı durumundayken haksız duruma Düşürdüyse Daha Üst Mevkide bulunan Yetkililere Başvurun!**

<a:logo:757639759941337260> **Herkes Kuralları okumuş olarak kabul edilir, Herkes kendi yaptığından Sorumludur.**

@everyone @here <a:siyahalev:762329864036286527>

`) 
.setFooter('Exercitus', client.user.avatarURL)

.setTimestamp()

.setImage('https://cdn.discordapp.com/attachments/773264679371538494/775106907773861918/tenor.gif')

message.delete()

message.channel.send(embed)

};

exports.conf = {

  enabled: true,

  guildOnly: false, 

  aliases: [''], 

  permLevel: 0 

};

exports.help = {

  name: 'kurallar',

  description: 'Yardım komutu',

  usage: 'yardım'

};