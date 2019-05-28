const Discord = require('discord.js');
const yt = require('ytdl-core');



module.exports.run = async(bot,message, args) => {
    let messageArray = message.content.split(" ");
    function play(connection,message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(yt(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on('end', function() {
            if(server.queue[0]) play(connection,message);
            else connection.disconnect();
        });
    }
    var servers = {};


    if(messageArray)

}