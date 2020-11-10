const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Aserai");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
  if (message.member.hasPermission("MOVE_MEMBERS")) permlvl = 1;  
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
  


const activities_list = [
    "Exercitus 🍂'Lo odio †", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Exercitus 🍂'Lo odio †", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    "Exercitus 🍂'Lo odio †", // Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
    ]; 

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 1000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});


client.on("guildMemberAdd", async member => {
    let girenKisi = client.users.get(member.id);
    let girisKanal = client.channels.get(db.fetch(`hgK_${member.guild.id}`));
    let Güvenli = `**Hesap Durumu: Güvenli** <a:prmths_siyahtik:767772796737552424>`;
    let Şüpheli = `**Hesap Durumu: Güvenli değil**`;
  
     var ce1 = ['Umarım Pizza Getirmişsindir.', 'Sen Geldiğine Göre Parti Başlayabilir.', 'Geldiğine Çok Sevindik.', 'Merhaba desene!', 'Hepimiz Seni Bekliyorduk.']
  
     var mesaj = ce1[Math.floor((Math.random() * ce1.length))];
  
     var ce2 = ['https://cdn.discordapp.com/attachments/773264679371538494/775106907773861918/tenor.gif']
  
     var mesajresim = ce2[Math.floor((Math.random() * ce2.length))];
  
    const ktarih = new Date().getTime() - girenKisi.createdAt.getTime();
  
    var kontrol;
    if (ktarih > 2629800000) kontrol = Güvenli;
    if (ktarih < 2629800001) kontrol = Şüpheli;
    let kanal = await db.fetch(`hgK_${member.guild.id}`);
    if (!kanal) return;
  
     client.channels.get(kanal).send(``);
  
      const giris = new Discord.RichEmbed()      
       .setColor("RANDOM")
      .setTimestamp()
      .setFooter('Exercitus', client.user.avatarURL)
      .setDescription(`
      <a:prmths_g155:772772074082140161> **Sunucumuza Yeni Kişi Katıldı , ${member} Hoş Geldin** 

    <a:beyazkalp:757639704610078740> **Kaydının yapılması için sesli odaya girip ses vermen gerekli**

<a:siyahalev:762329864036286527> <@&757615401092907018> **Rolündeki yetkililer seninle ilgilenecektir**

     <a:kblk:757640711092044037> **Tagımızı Alarak そ Bize Destek Olabilirsin**
  
      <a:siyahkalp:757640662425534645> **Bu Kullanıcıyla Birlikte ${member.guild.memberCount} Kişi Olduk!**
  
      <a:snszlk:757639371993120839> **Kullanıcı ID   \`${member.user.id}\`**
  
        ${kontrol}
  
  `)
        .setImage(mesajresim)
  .setThumbnail(member.user.avatarURL);
    client.channels.get(kanal).send(giris);
  });
  //////////////////////////////////////////////////////////////////////////////////

  client.on('message', async message => {
 
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
   
    let kullanıcı = message.mentions.users.first() || message.author
    let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
    let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
    let afkkullanıcıı = await db.fetch(`afk_${kullanıcı}`)
    let sebep = afkkullanıcı
   
    if (message.author.bot) return;
    if (message.content.includes(`${prefix}afk`)) return;
  
    if (!message.content.includes(`<@${kullanıcı.id}>`)) {
      if (afkdkullanıcı) {
        message.member.setNickname(`${message.author.username}`);
        
        message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription(`Hey, artık afk değilsin.`))//message.channel.send(`**<@${message.author.id}>** No longer afk`)
        db.delete(`afk_${message.author.id}`)
      }
     
    }
  });

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {  
    msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setDescription('**Aleyküm selam, hoşgeldin <a:prmths_g155:772772074082140161> **'))
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {  
    msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setDescription('**Aleyküm selam, hoşgeldin <a:prmths_g155:772772074082140161> **'))
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {  
    msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setDescription('**⛤**'))
  }
});


client.on("ready", () => {
  client.channels.get("768769805221494804").join();
   
})

client.on('userUpdate', async user => {
  let sunucuid = "757583902104879164"; //Buraya sunucunuzun IDsini yazın
  let tag = "そ"; //Buraya tagınızı yazın
  let rol = "757614605748142181"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'tag-information'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Hey, <@${user.id}> adlı kullanıcı, ${tag} tagımızı aldığı için <@&${rol}> rolü verildi`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Hey, <@${user.id}> adlı kullanıcı, ${tag} tagımızı sildiği için <@&${rol}> rolü alındı.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});