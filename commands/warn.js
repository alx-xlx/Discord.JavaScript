
    const Discord = require("discord.js");
const fs = require('fs');
const ms = require('ms');
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
        //!warn
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No ! Can't Do it pal.");
        let wUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!wUser) return message.reply('Couldnt find Them Yo');
        if(wUser.hasPermission('MANAGE_MESSAGE')) return message.reply('THEY WAYY TOO COOL');
        let reason = args.join(" ").slice(22);
    
        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        warns[wUser.id].warns++;
    
        fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
            if(err) console.log(err); return;
        });
    
        let warnEmbed = new Discord.RichEmbed()
        .setDescription('Warns')
        .setColor('#fc6400')
        .addField('Warned User', wUser.tag)
        .addField('Warned IN Channel', message.channel)
        .addField('NUmber of Warnings', warns[wUser.id].warns)
        .addField('REASON', reason);
        
        let warnchannel = message.guild.channels.find(`name`, 'off-topic');
        if(!warnchannel) return message.reply('Coouldnt FInd Channel');
    
        warnchannel.send(warnEmbed);
        if(warns[wUser.id].warns == 2) {
            let muterole = message.guild.roles.find(`name`, 'Muted');
            if(!muterole) return message.reply('CReate the MUTEROLE');
    
            let mutetime = '10s';
            await(wUser.addRole(muterole.id));
            message.channel.send(`${wUser.tag} has been temporarily muted`);
    
            setTimeout(function() {
                wUser.removeRole(muterole.id)
                message.channel.reply(`They Have been unmuted`)
            }, ms(mutetime));
        }
    
        if(warns[wUser.id].warns == 3) {
            message.guild.member(wUser).ban(reason);
            message.channel.send(`${wUser.tag} has been banned`);
        }
    }

module.exports.help = {
    name: "warn"
}