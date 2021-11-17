const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const slots = require('../../models/slots')
module.exports.run = async (bot, msg, args, pog) => {

const params = {
  User: msg.author.id
}
chars.findOne(params, async(err, data) => {

  if(!args[0]) return msg.reply("Specify a valid character!")
  const notexist = Object.keys(data.Harem).includes(args.join(" "))
  if(!notexist) return msg.reply(`You dont own this character or you misspelled it! Please be careful that this function is case and character sensitive!`)
  if(args.join(" ") === data.Buddy && data.Harem[data.Buddy]) return msg.reply(`That is your partner! You need to set a different partner first to divorce her!`)
  console.log(args.join(" "))
  console.log(data.Harem[args.join(" ")])
  if(data.Harem[args.join(" ")].rarity === 'Mythical'){

    const premium = require('../../models/premium')
    const premparam = {
      User: msg.author.id
    }

  }
  let addslots;
  if(data.Harem[args.join(" ")].rarity === 'Common'){
    addslots = 0.01
  } else if(data.Harem[args.join(" ")].rarity === 'Uncommon'){
    addslots = 0.025
  } else if(data.Harem[args.join(" ")].rarity === 'Rare'){
    addslots = 0.05
  } else if(data.Harem[args.join(" ")].rarity === 'Super Rare'){
    addslots = 0.075
  } else if(data.Harem[args.join(" ")].rarity === 'Legendary'){
    addslots = 0.1
  } else if(data.Harem[args.join(" ")].rarity === 'Mythical'){
    addslots = 0.5
  } else if(data.Harem[args.join(" ")].rarity === 'Pokemon'){
    addslots = 0.075
  }
  const slotdata = await slots.findOne({ User: msg.author.id })
    if(!slotdata){
     let newdata = new slots({
        User: msg.author.id,
        Slots: addslots
      }).save()
    } else {
      slotdata.Slots = slotdata.Slots + addslots
      slotdata.save()
    }
  delete data.Harem[args.join(" ")]

  await chars.findOneAndUpdate(params, data)
  msg.reply(`Successfully divorced **${args.join(" ")}!**\nYour slots data is now at: ${slotdata.Slots}`)

})

}

module.exports.help = {
  name: "divorce",
  directory:"economy"
}
