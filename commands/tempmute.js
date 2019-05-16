const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them");
    let muterole = message.guild.roles.find(`name`, "Muted");
    
//Two ways of muting 
//#1. Add them to a Muted Role.
//#2. Make a muted role for them.
//Start of create role
    if(!muterole) {
        try {                                                          //Try doing this i.e creating a role
            muterole = await message.guild.createRole({                            
                name: "Muted",
                color: "#112233",
                permissions:[]
               
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    
                });
            });
            console.log('\x1b[31m%s\x1b[0m', 'Muted Role has been created');           //Red
        } catch(e) {                                           // If above trying above fails , then do this
            console.log(e.stack);
            console.log('\x1b[31m%s\x1b[0m', 'Caught ERRORS !!', 'hello');             //Red
        }
    }
//End oof create Role

    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time !");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted !`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}


//Further Improvement

//1. able to delete roles.
//2. able to send DM to the muted party.
//3. Embbed message in the report logs.