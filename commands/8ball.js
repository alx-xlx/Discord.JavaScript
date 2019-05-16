const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // -8ball <question faelfanlf>
    if(!args[2]) return message.reply('Please ask a full Question');
    let replies = ["Yes.", "No.", "I don't Know.","Ask again Later."];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor('#f47142')
    .addField("Question", question)
    .addField("Answer", replies[result]);
    message.channel.send(ballembed);
}

module.exports.help = {
    name: "8ball"
}


/*
Could be used as a AI
*/
