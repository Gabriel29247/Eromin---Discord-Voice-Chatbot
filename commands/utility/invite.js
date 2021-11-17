const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
  
  msg.channel.send(`**Click the link below to invite Eromin:**\nhttps://dsc.gg/eromin\n \nThanks!`)
}

module.exports.help = {
  name:"invite",
  directory: "utility"
}
