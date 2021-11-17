const Discord = require("discord.js");

const chars = require("../../models/chars")
const blacklists = require('../../models/blacklists')
module.exports.run = async (bot, msg, args, pog) => {
if(!process.env.ownerid === msg.author.id) return;
 blacklists.findOne({
    Password: 'poop@123'
  }, async(err, data) => {
    if(!data) return msg.reply(`No one has currently been blacklisted.`)
      const mappedData = Object.keys(data.Users).map((key) => {

        return `<@${key}>\n`
      })

    msg.channel.send(mappedData)
})
}

module.exports.help = {
  name:"blacklistedlist",
  directory: "utility"
}
