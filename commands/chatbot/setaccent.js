
const Discord = require("discord.js");
const server = require('../../models/server')
const ISO6391 = require('iso-639-1')
module.exports.run = async (bot, msg, args, pog) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send(`<a:rem:902532928150585364> Sorry, you do not have permissions to run this command!`)

    if(!args[0]) return msg.channel.send(`**Specify a valid 639-1 LANGUAGE code!**\n \nWe process your requests through this language code.\nIf you have no idea about what language you want - go into this page! (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)\nGet the desired code of your language through this.\nRecommened argument: **ja** (pretty cute <3)\n \nACCENT settings convert all your messages from ENGLISH to the RECEIVING language's ACCENT ONLY!\nMeaning, you must provide English messages [Hi] to example - Japanese(JA code) [Hi (in a japanese tone!)] .\nThis setting will ONLY change the ACCENT of the particular wordings.\n \nAlmost all of the languages are available! Just find the specific code that you desire.`)

  if(args[0].length > 2) return msg.reply(`A 639-1 code can't be that long!\nIf you do not know your code, please join our support server at **s!server** so we can help you out!`);
  const val = ISO6391.validate(args[0])
  if(val === false) return msg.channel.send('Please provide a **VALID** code!\nLearn more and find your code here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes\nIf you do not know your code, please join our support server at **s!server** so we can help you out!')
  server.findOne({ Server: msg.guild.id }, async(err, data) => {

    if(data){
      data.Accent = args[0]
      await server.findOneAndUpdate({ Server: msg.guild.id}, data)
      msg.channel.send(`Successfully set server accent to **${args[0].toLowerCase()} [${ISO6391.getName(args[0].toLowerCase())}]**\n[s!setaccent en] To get back to default, and without any arguments for great info!`)
    } else {
      new server({
        Server: msg.guild.id,
        Language: 'en',
        Accent: args[0],
        Channel: '0000'
      }).save()
      msg.channel.send(`Successfully set server accent to **${args[0].toLowerCase()} [${ISO6391.getName(args[0].toLowerCase())}]**\n[s!setaccent en] To get back to default, and without any arguments for great info!`)
    }
  })

}


module.exports.help = {
  name:"setaccent",
  directory:"chatbot"
}
