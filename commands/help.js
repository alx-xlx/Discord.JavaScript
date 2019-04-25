const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
    console.log("Command Handler Tester Loaded");
    let boticon = bot.user.displayAvatarURL;
    const embed = new Discord.RichEmbed()
    //.addField("Help Commands","```diff\n**-p** *Ping*\n**-bot** *Bot Info*\n**-server** *Server Info*\n**-file** *File Sync*\n**-pic** *Pics Attachment*\n**-report** *Report User*\n**-kick** *Kick User*\n**-ban** *Ban User*\n```  ")
    .addField("--------------------Help Commands--------------------","```diff\n-p  *Ping*\n-bot  *Bot Info*\n-server  *Server Info*\n-file  *File Sync*\n-pic  *Pics Attachment*\n-report  *Report User*\n-kick  *Kick User*\n-ban  *Ban User*\n```")
    .setThumbnail("https://i.imgur.com/HGqUWtL.png")
    .setColor("#9052df");
    message.channel.send(embed);
}

module.exports.help = {
    name: "h"
}