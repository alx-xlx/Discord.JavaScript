const Discord = require("discord.js");
const config = require('../config.json')
//#1 exported "bot,message,args"
module.exports.run = async (bot, message, args) => {                                
    let boticon = bot.user.displayAvatarURL;
    let usericon = message.author.displayAvatarURL;
    message.delete();                   
    let botembed = new Discord.RichEmbed()
    .setDescription(`**I am a Discord Bot !!**\n**I am Currently being Developed by *${config.meAlias}* (For Fun ofc)**`)
    .setTitle("**TesTube**")
    .setURL(`${config.bot.image}`)
    .setThumbnail(boticon)                                  //This lin prints pic in small way
    .setColor("#9052df")
    .addField(`Version`, `*${config.Testube.version} (03/04/2019)*`)
    .addField("Created on:", bot.user.createdAt);
    message.channel.send(botembed)
    .then(msg => {
        msg.delete(30000);
    });

    if(message.content.startsWith('%')) {
        message.channel.send('BIT');
    }
    //message.channel.send(boticon);                           //This Line will print the whole image with link
}

module.exports.help = {
    name: "bott"
}