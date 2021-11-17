const request = require("request");
const Discord = require("discord.js");
const axios = require('axios')
const discordTTS = require('discord-tts')
const fs = require('fs')

const { translate } = require('free-translate');
const inventory = require('../../models/inventory')
const premium = require('../../models/premium')
module.exports.run = async (bot, msg, args, pog) => {
  msg.channel.send(`The talk function has recently deprecated.\n**To set a new channel:** Use ` + '`s!setchannel`' + ` and mention a channel where you can talk with me without the need of a prefix!\nACCENTS AND LANGUAGES HAVE ALSO RESET! Please specify those again, thanks!\nIf this in your chat channel, please do not run this command to talk. Just talk with words like how you talk with an actual person, example: hi`)
}


module.exports.help = {
  name:"talk",
  directory:"chatbot"
}
