const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //-addrole @testube Dog Person
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry pal cannot be dome");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("No user");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify the role");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldnn't find  the role");

    if(rMember.roles.has(gRole.id));
    await(rMember.addRole(gRole.id));

    try {
        await rMember.send(`Congo you have been given role ${gRole.name}`);
        await message.channel.send(`Congo you have been given the role ${gRole.name}` );
    }catch(e) { 
        console.log(e);
    }
}

module.exports.help = {
    name: "addrole"
}