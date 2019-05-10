const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Coins', {
    useNewUrlParser: true
});
const Money = require('../module/money.js');


module.exports.run = async (bot, message, args) => {
    await message.delete();
    if (message.author.id !== '425679093842051083')  return;

    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    }, (err,money) => {
        if(err) console.log(err);

        let embed = new Discord.RichEmbed()
        .setTitle("coins")
        .setColor('#4000FF')
        .setThumbnail(message.author.displayAvatarURL);;
        if(!money) {
            embed.addField("coins", "0", true);
            return message.channel.send(embed);
        } else {
            embed.addField("coins", money.money, true);
            return message.channel.send(embed);
        }
    })
}
module.exports.help = {
    name: 'mymoney'
}