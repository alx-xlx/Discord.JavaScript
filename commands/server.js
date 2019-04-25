const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //let servericon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Krux Community")
    .setDescription("This Server is for uniting people through Music")
    .setColor("#15f153")
    .setThumbnail("https://i.imgur.com/HGqUWtL.png")
    .addField("Server/Guild name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField(message.author.tag + " You Joined the Server on :", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    message.channel.send(serverembed);
}

module.exports.help = {
    name: "server"
}