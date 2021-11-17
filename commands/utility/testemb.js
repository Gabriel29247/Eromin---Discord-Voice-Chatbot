const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
     bot.together.generateTogetherCode(msg.member.voice.channelID, 'youtube').then(async invite => {
    return msg.channel.send(`${invite.code}`);
});
  
}

module.exports.help = {
  name:"testemb",
  directory:"utility"
}
