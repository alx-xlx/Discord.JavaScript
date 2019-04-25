const Discord = require('discord.js');
const client = new Discord.Client();            // Create an instance of a Discord client
const config = require('./config.json');
const  {Client, Attachment, RichEmbed} = require('discord.js');
//const client = new client();
const fs = require ('fs');
client.login(config.token);            //Reads the token from config.json

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag +    //Testube#0679
     client.user.username + "{" +                      //Testube 
     client.user.discriminator + "}  [" +              //0679
     client.user.id + "]");                            //534704709156470784
     console.log('TestTube is Ready')
});

client.on('message', async msg => {
    if (msg.content == '-ping') {     //Reads the content of msg
        msg.reply('**Pong!**' + ' ' + ':ping_pong:');          //Tags the user and then replys to the channel
       // msg.channel.send('pong');    //Only sends the pong message to the channel                
       // msg.author.sendMessage(config.welcome[0] + " **" + client.user.username + "** " + config.welcome[1]) // DMs the author
        msg.reply(msg.author.displayAvatarURL);
    }
    else if (msg.content == '-rip') {
      //  const attachment = new Attachment ('https://i.imgur.com/w3duR07.png');    // Sending Attachment using URL
        const attachment1 = new Attachment ('./files/me.png')                           //Sending attachment from local
      //  msg.channel.send(msg.author, attachment);
        msg.channel.send(attachment1);
    }
    else if (msg.content == '-meme') {                                            //Syncing Files to the channel
        const buffer = fs.readFileSync('./files/file.txt');
        const attachment2 = new Attachment(buffer, 'file.txt');
        msg.channel.send(msg.author,attachment2);
    }
  //  else if (msg.author == client.user) {
  //      msg.channel.send(msg.author + "You are Robot");                            //These coditions will automate :)
  //      return;
  //  }

     else if (msg.content == '-embed') {                                         //Embedding
        const embed = new RichEmbed()                                            
        .setTitle('A slick little embed')                
        .setColor(0xFF0000)    
        .setDescription('Hello, this is a slick embed!');  
         msg.channel.send(embed);
      } 
      else if (msg.content == '-') {
        msg.delete();
        msg.channel.send("10sec")
        .then(messg => {
          messg.delete(300000);
        });
      }
});
