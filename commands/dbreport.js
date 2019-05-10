const Discord = require("discord.js");
const mongoose = require('mongoose');
const Report = require('../module/reports.js');



module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
    console.log("Report Command Loaded");
    mongoose.connect('mongodb://localhost/Reports');
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));      //The mentioned user sees the "-report @user ${args}"
    if(!rUser) return message.channel.send("**Couldn't Find User**");
    if(rUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't report them");
    let rreason = args.join(" ").slice(22);                                     //Slice(22) because the user ID comes at front and we join each args with " " instead of ","
    let reportembed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("#15f153")
    .setTitle("Reporting On me")
    .addField("Reported Usr is", `${rUser} with ID : ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID - ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Created at Time", message.createdAt)
    .addField("Reason", rreason);
    let reportschannel = message.guild.channels.find(`name`, "bot_spam");                                                   //Find a channel name report
    if(!reportschannel) return message.channel.send("Could'nt find report Channel !");
    message.delete()                                                           
    .then(msg => console.log(`${message.author.username} reported ${rUser.user.username}||Deleted report message`))   //Delete the message from the channel    
    .catch(console.error);                                                                                          //Send error report if any to console
    reportschannel.send(reportembed);
    
    
    const report = new Report({
        _id: mongoose.Types.ObjectId(),
        username: rUser.user.username,
        userID: rUser.id,
        reason: rreason,
        rUsername: message.author.username,
        rID: message.author.id,
        time: message.createdAt
    });

    report.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    message.reply('Report saved in Database')
}
module.exports.help = {
    name: "dbreport"
}