const Discord = require("discord.js");
const YTDL = require('ytdl-core');


module.exports.run = async (bot, message, args) => {
    
    let messageArray = message.content.split(" ");
    function play(connection,message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(YTDL(server.queue[0],{filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on('end', function() {
            if(server.queue[0]) play(connection,message);
            else connection.disconnect();
        });
    }
    var servers = {};

    if (messageArray[0] == 'listen' && !messageArray[1]) {
        message.channel.send('Please provide the Song');
        return;
    }
    if(!message.member.voiceChannel) {
        message.channel.send('Join a Voice Channel');   
        return;
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
    var server = servers[message.guild.id];
    server.queue.push(messageArray[1]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection,message);    
    });
    if(messageArray[0] == 'quit') {
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }

}

module.exports.help = {
    name: "music"
}