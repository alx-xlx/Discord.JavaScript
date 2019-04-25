const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
    console.log("Kick CMD Handler Loaded");
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Couldn't Find the user");
    let kreason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't Do it Pal !!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't be kicked");
    let kickembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#15f153")
    .setTitle("Kicking On me")
    .addField("Kicked Usr is", `${kUser} with ID : ${kUser.id}`)
    .addField("Kicked By", `${message.author} with ID - ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Created at Time", message.createdAt)
    .addField("Reason", kreason);
    let kickchannel = message.guild.channels.find(`name`, "bot_spam");
    if(!kickchannel) return message.channel.send("Could'nt find Kick Channel !");
    message.delete()                                                           
    .then(msg => console.log(`${message.author.username} kicked ${kUser.user.username} Deleted kick message`))      
    .catch(console.error);
    message.guild.member(kUser).kick(kreason);
    kickchannel.send(kickembed);
}

module.exports.help = {
    name: "kick"
}