const Discord = require("discord.js");

const chars = require("../../models/chars")
const blacklists = require('../../models/blacklists')
module.exports.run = async (bot, msg, args, pog) => {

  msg.reply('Are you sure you want to delete your data? Type `yes` if you want to request a deletion of your data. This will blacklist you from the bot.')
   msg.channel.awaitMessages(message => message.content.toLowerCase() == "yes",
		{
			maxMatches: 1,
			max: 1,
			time: 7000,
			errors: ['time']
		}).then(async(message1) => {

      chars.deleteMany({ User: msg.author.id }, async(err, data) => {
        if(err) console.log(err)
        if(!data) return msg.reply(`Your economy database was successfully cleared.`)
      })
      blacklists.findOne({ Password: 'poop@123' }, async(prob, info) => {
        if(info){
          info.Users[msg.author.id] = {
            Blacklisted: true,
            Time: `<t:${Date.now()}:R>`
          }
          await blacklists.findOneAndUpdate( { Password: 'poop@123' }, info)
        } else {
          new blacklists({
            Password: 'poop@123',
            Users: {
              [msg.author.id]: {
                Blacklisted: true,
                Time: `<t:${Date.now()}:R>`
              }
            }
          }).save()
        }
      })
      msg.reply(`Your entire data was successfuly deleted from the database at process time <t:${Date.now()}:R>.`)
      msg.author.send(`We noticed that you deleted your data for Eromin at process time <t:${Date.now()}:R>.\nIf it was intentional, please leave us a review in our server, s!server for it. We will be glad to hear your response.\nIf it was not intentional and you did not intent to delete your data, please contact us in the community server, same command as before.\nHere is the invite link for appealing: https://discord.gg/RYjvGjWpfu`)
    })

}

module.exports.help = {
  name:"deletemydata",
  directory: "utility"
}
