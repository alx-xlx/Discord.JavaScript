const Discord = require("discord.js");
const config = require("./config.json");



bot.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.content.startsWith(config.prefix + 'ping')) {
        var resMsg = await message.channel.send('Ping is being appreciated... :bar_chart:');
        resMsg.edit('Ping: ' + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - bot.ping));
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Pong",
                value: "My Ping: " + Math.round(bot.ping) + ' ms'
            }],
        }})
    }
});

bot.on('message', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (message.content.startsWith(config.prefix + 'p')) {
        var resMsg = await message.channel.send('Ping is being appreciated... :bar_chart:');
        resMsg.edit('Ping: ' + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - bot.ping));
        message.channel.send(Date.now() - message.createdTimestamp);
        message.channel.send(message.createdTimestamp - Date.now());
        message.channel.send("Pong" + bot.ping + "||" + Date.now() + " " + message.createdTimestamp);
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Pong" + bot.ping + "||" + Date.now() + " " + message.createdTimestamp,
                value: (Date.now() - message.createdTimestamp)
            }],
        }})
    }
});