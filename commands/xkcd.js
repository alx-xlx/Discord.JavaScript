const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../config.json')

module.exports.run = async (bot, message, args) => {                
    let messageArray = message.content.split(' ');
    let number = messageArray[1];
    let detail = messageArray[2];
    number = parseInt(number);
    if(message.content == '-xkcd help') {
        let {body} = await superagent
        .get(`${config.xkcd.l1}/${config.xkcd.l2}`);
        message.channel.send('**xkcd Commands**```\n'+
        '-xkcd [To View current xkcd]\n'+
        `-xkcd <PostNumber> [Ex. -xkcd 614] \n1 < PostNumber < ${body.num}\n`+
        '-xkcd <PostNumber> d [To View Transcript, Not all Post have transcript]'+'```');
    }
    if(number != 'help' && !detail) {
        let {body} = await superagent
        .get(`${config.xkcd.l1}/${number}/${config.xkcd.l2}`);
        if(body.transcript) {
            var transcriptAvailable = 'Transcript Available';
        } else {
            var transcriptAvailable = 'Transcript Not Available';
        }
        let xkcdembed2 = new Discord.RichEmbed()
        .setTitle(`${body.title} | #${body.num}`)
        .setDescription(body.alt)
        .setColor('#f47142')
        .setFooter(`Uploaded on : ${body.day}-${body.month}-${body.year} || ${transcriptAvailable} ||`, 'https://i.imgur.com/B0l6ta6.png')
        .setImage(body.img);
        message.channel.send(xkcdembed2);
    }
    if(number && detail == 'd') {
        let {body} = await superagent
        .get(`${config.xkcd.l1}/${number}/${config.xkcd.l2}`);
    
        if(body.transcript) {
            message.channel.send(`**${body.title} | #${body.num}**\n` + '**Transcript**```css\n'+ `${body.transcript}`+'```');
        } else {
            message.channel.send('Sorry no Transcript Available');
        }
    
    }
    if(!number && !detail /*&& number == 'help'*/) {
        let {body} = await superagent
        .get(`${config.xkcd.l1}/${config.xkcd.l2}`);
    
        if(body.transcript) {
            var transcriptAvailable = 'Transcript Available';
        } else {
            var transcriptAvailable = 'Transcript Not Available';
        }
    
        let xkcdembed = new Discord.RichEmbed()
        .setTitle(`${body.title} | #${body.num}`)
        .setDescription(body.alt)
        .setColor('#f47142')
        .setFooter(`Uploaded on : ${body.day}-${body.month}-${body.year} || ${transcriptAvailable} ||`, 'https://i.imgur.com/B0l6ta6.png')
        .setImage(body.img);
        message.channel.send(xkcdembed);
    }
}
module.exports.help = {
    name: "xkcd"
}
/*
To Do
- Add More sub commands to it
-xkcd
-xkcd 614
-xkcd 614 d[etail]
- xkcd help
*/

