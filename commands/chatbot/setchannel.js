const Discord = require("discord.js");
const server = require('../../models/server')
module.exports.run = async (bot, msg, args, pog) => {

  if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(`<a:rem:902532928150585364> Sorry, you do not have permissions to run this command!`)
  if(!msg.mentions.channels.first()) return msg.channel.send(`<a:rem:902532928150585364> Mention a valid channel!`)
  if(msg.mentions.channels.first().type === 'voice') return msg.reply(`I cannot take your messages in **voice channels**, they have to be taken from text channels!`)
  const chanid = msg.mentions.channels.first().id

  server.findOne({ Server: msg.guild.id }, async(err, data) => {
    if(data){
      data.Channel = chanid
      await server.findOneAndUpdate({ Server: msg.guild.id}, data)
      msg.reply(`Your server chat channel is now <#${chanid}>`)
      bot.channels.cache.get(chanid).send(`This is the new chat channel: <#${chanid}>, please chat here instead!`)
    } else {
      new server({
        Server: msg.guild.id,
        Language: 'en',
        Accent: 'en',
        Channel: chanid
      }).save()
      msg.mentions.channels.first().send(`This channel is now the new chat channel! Type anything and I'll respond without any prefix! If you forget the chatchannel, please do not forget it.`)
      msg.reply(`Successfully set your chat channel to <#${chanid}>!`)
    }
  })

}

module.exports.help = {
  name:"setchannel",
  directory:"chatbot"
}
