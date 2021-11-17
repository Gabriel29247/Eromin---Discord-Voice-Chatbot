const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {


  if(!process.env.ownerid.includes(msg.author.id))return;
  msg.channel.send('evaluating...')
  if(!args[0]) return msg.channel.send(`You forgot to mention a valid server id!`)

  bot.guilds.cache.get(args[0]).leave().catch((e) => {
    if(e)msg.lineReply(e)
    
  })  
  msg.channel.send(`Successfully left.`)

}

module.exports.help = {
  name:"leaveserver",
  directory:"utility"
}
