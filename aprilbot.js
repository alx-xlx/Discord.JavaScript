const config = require("./config.json");
const Discord = require('discord.js');
//const get = require('./get');
const fs = require('fs');
const superagent = require('superagent');
const sql = require('sqlite');
const  {Client, Attachment, RichEmbed} = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
//const mysql = require('mysql');
bot.commands = new Discord.Collection();
bot.login(config.token);              
bot.on('error', console.error);

sql.open("userData.sqlite");


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
    var botChannel = bot.channels.get(`${config._CH}`);
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


// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'toor',
//     database: 'ttdb'
// });

// con.connect(err => {
//     // if(err) throw err;
//     console.log("Connected to Server");
// });

// function generateXP() {
//     let max = 20;
//     let min = 10;
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }


bot.on("message" , async message => {
    if(message.author.bot) return;                                         //If author of msg is BOT then quit
    if(message.channel.type == "dm") return;
    let p = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(p.length));                //getting word "report" after slicing "-"
    if(commandfile) commandfile.run(bot,message,args);                 //#1 Exporting "bot,message,args" to the report.js file




    // con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`,(err,rows) => {
    //     if(err) return err;
    //     console.log(rows);
    //     let sql;
    //     if(rows.length < 1) {
    //         sql = `INSERT INTO xp (id,xp) VALUES ('${message.author.id}', ${generateXP()})`
    //     } else {
    //         let xp = rows[0].xp;
    //         sql = `UPDATE xp SET xp = ${xp + generateXP()} WHERE id = '${message.author.id}'`;
    //     }
    //     con.query(sql)
    // })

 //Pinging the Bot

    if(cmd == `ping`) {
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
            resMsg.delete(5000);
            msg.delete(5000);
        })                                        // Make Sure the Bot has permission for that channel   
    }

    if(cmd ==`${p}file`) {
        const buffer = fs.readFileSync('./files/file.txt');
        const fileattach = new Attachment(buffer, 'file.txt');
        message.channel.send(fileattach);
    }

    if(cmd == `${p}pic`) {
        const attachment = new Attachment (`${config.bot.rip}`);    // Sending Attachment using URL
        //const attachment1 = new Attachment ('./files/me.png')                           //Sending attachment from local
        message.channel.send(attachment);
        //message.channel.send(attachment1);
    }

    if(messageArray[0] == 'pls' && messageArray[1] =='cat') {
        let {body} = await superagent
        .get(`${config.bot.cat}`);
        let linky = body.file;
        let mp4 = linky.search('.mp4');
        if(mp4 != -1) {
            let mp4embed1 = new Discord.RichEmbed()
            .addField(':cat2:', 'feels bad man\ntry again man')
            .setThumbnail(`${config.bot.cat0}`)
            .setColor('#f47142');
            message.channel.send(mp4embed1);
        }
        let catembed = new Discord.RichEmbed()
        .setColor('#f47142')
        .setImage(body.file);
        message.channel.send(catembed);
        message.delete(5000);
    }

    if(messageArray[0] == 'pls' && messageArray[1] =='dog') {
        let {body} = await superagent
        .get(`${config.bot.dog}`);
        let linky = body.url;
        let mp4 = linky.search('.mp4');
        if(mp4 != -1) {
            let mp4embed = new Discord.RichEmbed()
            .addField(':dog2:', 'feels bad man\ntry again man')
            .setThumbnail(`${config.bot.dog0}`)
            .setColor('#f47142');
            message.channel.send(mp4embed);
        } else {
            let dogembed = new Discord.RichEmbed()
            .setColor('#f47142')
            .setImage(body.url);
            message.channel.send(dogembed);
            message.delete(5000);
        }
    }

    if(messageArray[0] == 'pls' && messageArray[1] == 'embed') {
        let linky = messageArray[2];
        let mp4 = linky.search('.mp4');
        if(messageArray[2] == null) {
            message.channel.send('Use ```css\npls embed url_of_image\nFormat Supported : .jpg .jpeg .png .gif .giphy .bmp\nExample :\npls embed https://random.dog/6843-7121-9258.jpg```')
            .then(msg => {
                msg.delete(10000);
            });
            message.delete(5000);
        } else if(messageArray[2] != null && mp4 == -1) {
            let plsembed = new Discord.RichEmbed()
            .setColor('#f47142')
            .setImage(messageArray[2]);
            message.channel.send(plsembed);
            message.delete(5000);
        } else if(messageArray[2] != null && mp4 != -1) {
            let plsembed2 = new Discord.RichEmbed()
            .setColor('#f47142')
            .addField('Can\'t do it Buddy','pls embed');
            message.channel.send(plsembed2);
            message.delete();
        }
    }

    sql.get(`SELECT * FROM userData WHERE userId ="${message.author.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO userData (userId, username, level, money, time) VALUES (?, ?, ?, ?, ?)", [message.author.id, message.author.username, 0, 1, 0]);
        }
    }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS userData (userId TEXT, username TEXT, level INTEGER, money INTEGER, time INTEGER)").then(() => {
            sql.run("INSERT INTO userData (userId, username, level, money, time) VALUES (?, ?, ?, ?, ?)", [message.author.id, message.author.username, 0, 2, 0]);
        });
    });

    if (cmd == `${p}sql`) {
        sql.all('SELECT username,money FROM userData ORDER BY money DESC').then(rows => {
            rows.forEach(function (row) {  
                console.log(row.username, row.money);
                message.channel.send(row.username + ' Has: $' + row.money);  
            }) 
        })
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

