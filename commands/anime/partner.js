const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const randomcolor = require("randomcolor")
module.exports.run = async (bot, msg, args, pog) => {
const params = {
  User: msg.author.id
}
chars.findOne(params, async(err, data) => {
  if(!args[0]){
    if(data.Buddy){
      msg.reply(`Your partner is currently: ${bot.guilds.cache.get('885117362385334292').emojis.cache.find(emoji => emoji.name == data.Harem[data.Buddy].rarity.toLowerCase())} ${data.Buddy}`)
    } else return msg.reply(`You don't own a partner yet! Specify a partner using s!partner <any character name>\nExample: s!partner Nekomata Okayu`)
  }
  if(args[0]){
    if(args[0] === 'Rem:Sticker') return msg.reply(`You cannot make a sticker as your partner!`)
  const notexist = Object.keys(data.Harem).includes(args.join(" "))
  if(!notexist) return msg.reply(`You do not own this character or you misspelled it! Please be careful that this function is case and character sensitive!`)
  if(data){
    data.Buddy = args.join(" ")

    msg.reply(`Your partner is now ${bot.guilds.cache.get('885117362385334292').emojis.cache.find(emoji => emoji.name == data.Harem[data.Buddy].rarity.toLowerCase())} ${args.join(" ")}\n`)
    await chars.findOneAndUpdate({ User: msg.author.id }, data)
  } else return msg.reply(`Looks like you haven't started your adventure yet! [s!hunt]`)
  }
})

}

module.exports.help = {
  name: "partner",
  directory:"economy"
}
