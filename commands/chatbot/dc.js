const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {

   if(!msg.guild.me.voice.channel) return msg.reply(`**Error:** I am not in any voice channels in **${msg.guild.name}**`);
    if(msg.member.voice.channel){
    if(msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.reply(`**Error:** We aren't in the same VC!`)
    const chan = msg.guild.me.voice.channel
    msg.guild.me.voice.channel.leave();
    msg.reply(`Successfully left ${chan}, I hope I can talk with you soon!`)
       } else {
         msg.channel.send(`**Error:** You need to be in a ${msg.guild.me.voice.channel} to execute this command!`)
       }
}

module.exports.help = {
  name:"dc",
  directory:"chatbot"
}
