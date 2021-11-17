const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const randomcolor = require("randomcolor")
module.exports.run = async (bot, msg, args, pog) => {
const params = {
  User: msg.author.id
}
chars.findOne(params, async(err, data) => {
  if(!args[0]) return msg.reply("Specify a valid character to view info on!")
  const notexist = Object.keys(data.Harem).includes(args.join(" "))
  if(!notexist) return msg.reply(`You dont own this character or you misspelled it! Please be careful that this function is case and character sensitive!`)
  console.log(args.join(" "))
  console.log(data.Harem[args.join(" ")])
  const poop = randomcolor()
  const infoemb = new Discord.MessageEmbed()
  .setTitle(`Info on ${args.join(" ")}!`)
  .setDescription(`**Rarity: ${data.Harem[args.join(" ")].rarity}**\n**Partner Level:** ${data.Harem[args.join(" ")].level || 'Disabled for this char.'}\n This card belongs to **${msg.author.tag}**`)
  .setImage(data.Harem[args.join(" ")].image)
.setThumbnail(msg.author.displayAvatarURL())
  .setColor(poop)
  .setTimestamp()
  msg.reply(infoemb)
})

}

module.exports.help = {
  name: "info",
  directory:"economy"
}
