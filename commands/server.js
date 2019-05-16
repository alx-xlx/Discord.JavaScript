const Discord = require("discord.js");
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {
    //let servericon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setTitle(`${config.server.name}`)
    .setDescription(`${config.server.description}`)
    .setColor("#15f153")
    .setThumbnail(`${config.bot.image}`)
    .addField("Server/Guild name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField(message.author.tag + " You Joined the Server on :", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    message.channel.send(serverembed);
}

module.exports.help = {
    name: "server"
}