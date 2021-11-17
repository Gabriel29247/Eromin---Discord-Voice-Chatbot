const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
  
  msg.channel.send(`**Pong!** ${bot.ws.ping}ms`)
  msg.channel.send(`Node process time: <t:${Date.now()}>`)
}

module.exports.help = {
  name:"ping",
  directory:"utility"
}
