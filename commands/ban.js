const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {                                //#1 exported "bot,message,args"
    console.log("Ban CMD Handler Loaded");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Couldn't Find the user");
    let breason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Can't Do it Pal !!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't be kicked");
    let banembed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#bc0000")
    .setTitle("Banning On me")
    .addField("Banned Usr is", `${bUser} with ID : ${bUser.id}`)
    .addField("Banned By", `<@${message.author}> with ID - ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Created at Time", message.createdAt)
    .addField("Reason", breason);
    let banchannel = message.guild.channels.find(`name`, "bot_spam");
    if(!banchannel) return message.channel.send("Could'nt find Ban Channel !");
    message.delete()                                                           
    .then(msg => console.log(`${message.author.username} Banned ${bUser.user.username} Deleted Ban message`))      
    .catch(console.error);
    message.guild.member(bUser).ban(breason);
    banchannel.send(banembed);
}

module.exports.help = {
    name: "ban"
}