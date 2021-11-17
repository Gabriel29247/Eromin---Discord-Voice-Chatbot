const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const slots = require('../../models/slots')
module.exports.run = async (bot, msg, args, pog) => {
  const tips = [
   "To get more cookies, just talk to me and I reward you :-)",
   "You can join our community server by doing s!server in order to participate in giveaways and drops!",
   "Try not to sadden me too much, I give less cookies the less kind you are :((",
   "Did you know you could change languages and accents? [s!help]",
   "Use the japanese language and accent for a higher multiplier!"
 ]
 let tip = tips[Math.floor(Math.random() * tips.length)];
  const user = msg.mentions.users.first() || msg.author
  chars.findOne({
    User: user.id
  }, async(err, data) => {
    if(!data) return msg.reply(`No items to display!! [s!hunt]`)
    const quantity = Object.keys(data.Harem).length

    const mappedData = Object.keys(data.Harem).map((key) => {
        let raremoji = bot.guilds.cache.get('885117362385334292').emojis.cache.find(emoji => emoji.name == data.Harem[key].rarity.toLowerCase()) || '<a:rem:902532928150585364>'
        if(data.Harem[key].rarity === 'Super Rare'){
          raremoji = '<:superrare:897020032662532116>'
        }
        return `${raremoji} **${key}** - ${data.Harem[key].rarity}`

      })

    const slotdata = await slots.findOne({ User: msg.author.id })
    let ownedslots;
    if(!slotdata){
      ownedslots = 5
    } else {
    ownedslots = slotdata.Slots
    }

    const exemplar = new Discord.MessageEmbed()
    .setTitle(`${user.tag}'s Character Inventory! (${quantity}/${Math.floor(ownedslots) || 5})\nYour current slot data: ${slotdata.Slots || 5}`)
    .setDescription(`${mappedData}`)
    .setThumbnail(user.displayAvatarURL())
    .setFooter(`TIP: ${tip}`)
    .setColor('#faa2a2')
    msg.reply({ content: ":scream: Divorce characters to build up your slots!\nView your item inventory using `s!inventory`", embeds: [exemplar] })
  }

  )

}

module.exports.help = {
  name: "charinventory",
  directory:"economy"
}
