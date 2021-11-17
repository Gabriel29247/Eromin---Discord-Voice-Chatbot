const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
  
  msg.channel.send(`**Vote for Eromin at:**\nhttps://top.gg/bot/855708674630615041/vote\n \nEnsures a free entry in **FUTURE premium** for the bot!\n**Instant 50,000** :cookie: as a reward, special entries in giveaways and events for voters in our community! [s!server]\nLootboxes are out! Vote now to instantly get one!\nLootboxes give random rewards such as cookies, pokemon and stickers!`)
}

module.exports.help = {
  name:"vote",
  directory:"utility"
}
