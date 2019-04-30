const Discord = require("discord.js");
const mongoose = require('mongoose');
const Report = require('../module/reports.js');

mongoose.connect('mongodb://localhost/Reports');


module.exports.run = async (bot, message, args) => {

}

module.exports.help = {
    name: "dbreport"
}