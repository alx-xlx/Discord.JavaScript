const Discord = require("discord.js");
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
    console.log("Command Handler Tester Loaded");
    let serverembed = new Discord.RichEmbed()
    .setTitle("Krux Community")
    .setDescription("This Server is for uniting people through Music")
    .setColor("#15f153")
    .setThumbnail(`${config.bot.image}`)
    .addField("Server/Guild name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    message.channel.send(serverembed);
}

module.exports.help = {
    name: "test"
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////

// const Discord = require("discord.js");

// module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
//     console.log("Command Handler Tester Loaded");
//     let tUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));      //The mentioned user sees the "-report @user ${args}"
//     if(!tUser) return message.channel.send("**Couldn't Find User**");
//     if(tUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't Test them");
//     let testargs = args.join(" ").slice(22);                                     //Slice(22) because the user ID comes at front and we join each args with " " instead of ","
//     let testembed = new Discord.RichEmbed()
//     .setDescription("Description Set")
//     .setColor("#15f153")
//     .setTitle("Title")
//     .addField("Tested Usr is", `${tUser} with ID : ${tUser.id}`)
//     .addField("Tested By", `${message.author} with ID - ${message.author.id}`)
//     .addField("Channel", message.channel)
//     .addField("Created at Time", message.createdAt)
//     .addField("Reason", testargs);
//     let testchannel = message.guild.channels.find(`name`, "bot_spam");                                                   //Find a channel name report
//     if(!testchannel) return message.channel.send("Could'nt find test Channel !");
//     message.delete()                                                           
//     .then(msg => console.log(`${message.author.username}Tested${tUser.user.username}||Deleted report message`))   //Delete the message from the channel    
//     .catch(console.error);                                                                                          //Send error report if any to console
//     testchannel.send(testembed);
// }

// module.exports.help = {
//     name: "test"
// }