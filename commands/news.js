const Discord = require("discord.js");
const superagent = require("superagent");
const config = require('../config.json')
module.exports.run = async (bot, message, args) => {
    try {
        //let {body} = await superagent
        //.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=e2364d9cbd2b49eabf55ffed4fc447f5`);
        //${config.link}in&apiKey=${config.apikey}
        //https://newsapi.org/v2/top-headlines?country=in&apiKey=e2364d9cbd2b49eabf55ffed4fc447f5
        let messageArray = message.content.split(' ');
        let countryID = messageArray[1];
        if(countryID) {
            let {body} = await superagent
            .get(`${config.news.link}${countryID}&apiKey=${config.news.apikey}`);
            let newsembed = new Discord.RichEmbed()
            .setTitle(`**Top 10 News From ${countryID}**`)
            .setColor('#ffffff')
            .addField('#1',body.articles[0].title)
            .addField('#2',body.articles[1].title)
            .addField('#3',body.articles[2].title)
            .addField('#4',body.articles[3].title)
            .addField('#5',body.articles[4].title)
            .addField('#6',body.articles[5].title)
            .addField('#7',body.articles[6].title)
            .addField('#8',body.articles[7].title)
            .addField('#9',body.articles[8].title)
            .addField('#10',body.articles[9].title);
            message.channel.send(newsembed);
        } else if(!countryID) {
            let {body} = await superagent
            .get(`${config.news.link}in&apiKey=${config.news.apikey}`);
            let newsembed2 = new Discord.RichEmbed()
            .setTitle(`**Top 10 News From India**`)
            .setColor('#ffffff')
            .addField('#1',body.articles[0].title)
            .addField('#2',body.articles[1].title)
            .addField('#3',body.articles[2].title)
            .addField('#4',body.articles[3].title)
            .addField('#5',body.articles[4].title)
            .addField('#6',body.articles[5].title)
            .addField('#7',body.articles[6].title)
            .addField('#8',body.articles[7].title)
            .addField('#9',body.articles[8].title)
            .addField('#10',body.articles[9].title);
            message.channel.send(newsembed2);
        } else if(countryID == 'help') {
            // let helpembed = new Discord.RichEmbed()
            // .setTitle(`**Country Codes**`)
            // .setColor('#aaaaaa')
            // .addField('#1','This is me !');
            message.channel.send("helpembed");
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports.help = {
    name: "news"
}


// e2364d9cbd2b49eabf55ffed4fc447f5