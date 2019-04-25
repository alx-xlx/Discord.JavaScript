const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.login(config.token);

bot.on('ready', ()=> {
    console.log("Hello there");
    
})

bot.createVoiceBroadcast("Hello");