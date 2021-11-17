const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
  const changelogger = new Discord.MessageEmbed()
  .setTitle(`Halloween Update - October 30th`)
.setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/a/a2/Jack-o%27-Lantern_2003-10-31.jpg`)
  .setDescription(`Happy spooks to you, **${msg.author.tag}** :jack_o_lantern:\n
    **NEW UPDATES**\n• Brand new event with Rem:sticker now obtainable! Check s!event for more details!\n• Lootboxes: Perfectly new, obtainable at a rate of **1/25** through hunting and a free one through voting!\n• New anime characters from recently released anime.\n• Pokemon are now obtainable through lootboxes available in the methods above.\n• Minor bug fixes and ping issues fixed.\n \nFor the complete changelog, please visit our server by doing s!server.`)
  .setColor('ORANGE')
  .setFooter(`Executed by ${msg.author.tag}.`)
  .setTimestamp()
  msg.reply(changelogger)
}

module.exports.help = {
  name:"changelog",
  directory:"utility"
}
