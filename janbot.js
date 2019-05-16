const config = require("./config.json");
const Discord = require('discord.js');
const get = require('./get');
const fs = require("fs");                                                   //Filesystem
const  {Client, Attachment, RichEmbed} = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.login(config.token);              
            
bot.on('error', console.error);

fs.readdir("./commands", (err, files) => {                                  //Reading Folder commands
    if(err) {
        console.log(err);
    }
    let jsfile = files.filter(f => f.split(".").pop() === "js");            //finding filename "report.js" and then removing ".js" from name
    if(jsfile.length <=0) {                       
        console.log("Couldn't find Commands");
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);                             //Object f being called
        console.log('\x1b[1m%s\x1b[31m\x1b[0m', `${f} \x1b[32mloaded!\x1b[0m `);
        bot.commands.set(props.help.name, props); 
    });
});

//Things that can be done when bots online

bot.on("ready", async () =>  {
    console.log(`\x1b[1m\x1b[34mTest\x1b[31mube\x1b[31m\x1b[0m\x1b[1m is\x1b[32m online!\x1b[0m`);                        //Logs on the console window
    var botChannel = bot.channels.get("548555442771591178");
    let configs = JSON.parse(fs.readFileSync("./config.json"));
    var number = configs.Testube.online;
    var nextnumber = number;
    nextnumber++;
    var suffix;
    var numbertostring = nextnumber.toString();
    var lastnumber = numbertostring.substr(-1);
    if (lastnumber == 0 || lastnumber == 4 || lastnumber == 5 || lastnumber == 6 || lastnumber == 7 || lastnumber == 8 || lastnumber == 9) {
        var suffix = "th";    
    }
    if (lastnumber == 2) {
        var suffix = "nd";
    }
    if (lastnumber == 3) {
        var suffix = "rd";
    }
    if (lastnumber == 1) {
        var suffix = "st";
    }
    let readyembed = new Discord.RichEmbed()
    .addField("**Testube is ```ONLINE``` for** " + nextnumber + suffix + " **time !!**","Happy Devving")
    .setColor("#15f153")
    .setFooter('Will Self Destruct in 20sec',`${config.bot.image}`)
    .setThumbnail(`${config.bot.image}`);
    configs[bot.user.username] = {
        online : nextnumber
    };
    fs.writeFile("./config.json", JSON.stringify(configs), (err) => {
        if(err) console.log(err); return;
    });
    botChannel.send(readyembed)
    .then(msg => {
        msg.delete(20000);
    });
    bot.user.setActivity("Visual Studio Code", {type: "PLAYING"});

});


bot.on("message" , async message => {
    if(message.author.bot) return;                                         //If author of msg is BOT then quit
    if(message.channel.type == "dm") return;
    let p = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(p.length));                //getting word "report" after slicing "-"
    if(commandfile) commandfile.run(bot,message,args);                 //#1 Exporting "bot,message,args" to the report.js file
    

 //Pinging the Bot

    if(cmd == `${p}p`) {
        message.delete();
        var resMsg = await message.channel.send('Pinging Bot :ping_pong:')
        message.channel.send({embed: {
            color: 0x2ed32e,
            fields: [{
                name: ":ping_pong:",
                value: "Your ping is : " + Math.round((resMsg.createdTimestamp - message.createdTimestamp) - bot.ping) + ' ms'
            }],
        }})
        .then(msg => {
            resMsg.delete(0);
            msg.delete(5000);
        })                                        // Make Sure the Bot has permission for that channel   
    }

    if(cmd ==`${p}file`) {
        const buffer = fs.readFileSync('./files/file.txt');
        const fileattach = new Attachment(buffer, 'file.txt');
        message.channel.send(fileattach);
    }

    if(cmd == `${p}pic`) {
        //const attachment = new Attachment ('https://i.imgur.com/HELLO.png');    // Sending Attachment using URL
        //const attachment1 = new Attachment ('./files/me.png')                           //Sending attachment from local
        message.channel.send(attachment);
        //message.channel.send(attachment1);
    }
});

bot.on('guildMemberAdd', async member => {
    let welcomeChannel = member.guild.channels.find(`name`, 'logs');
    welcomeChannel.send(`Look ${member} has joined the server`);
});
bot.on('guildMemberRemove', async member => {
    let welcomeChannel = member.guild.channels.find(`name`, 'logs');
    welcomeChannel.send(`Good Riddance ${member} has bailed on the server`);
});
bot.on('channelCreate', async channel => {
    let sChannel = channel.guild.channels.find('name', 'logs');
    sChannel.send(`**${channel}** Channel has been created`);
});
bot.on('channelDelete', async channel => {
    let sChannel = channel.guild.channels.find('name', 'logs');
    sChannel.send(`**${channel.name}** Channel has been deleted`);
});

