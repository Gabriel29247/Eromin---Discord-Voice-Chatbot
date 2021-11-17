const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const randomcolor = require("randomcolor")
const slots = require('../../models/slots')
module.exports.run = async (bot, msg, args, pog) => {
/*
  Algorithm:
  1) Find out if the message's author is the owner.
  2) Store the arguments given by the owner through a confirm message
  3) Update MongoDB cluster
*/

if(!process.env.ownerid.includes(msg.author.id)) return;

const params = {
  User: msg.author.id
}


const user = msg.mentions.users.first()
if(!user) return msg.reply(`Please specfiy a valid user to donate!`)
const others = {
  User: user.id
}
const decided = args[1]
const coolimg = args[2]
const raretier = args[3]



chars.findOne(others, async(problem, info) => {

  if(info){
    const quantity = Object.keys(info.Harem).length
   const slotdata = await slots.findOne({ User: msg.author.id })
    let ownedslots;
    if(!slotdata){
      ownedslots = 5
    } else {
    ownedslots = slotdata.Slots
    }
    if(quantity >= ownedslots) return msg.reply(`You cannot receive this character, **${user.tag}**! You already have the max **${ownedslots}** slot(s)! Please divorce some characters!`)
    const hasItem = Object.keys(info.Harem).includes(decided)
    if(hasItem) return msg.reply(`You already own a copy of this character. Please divorce it if you want another copy.`)
    if(!hasItem){
      info.Harem[decided] = {
          image: coolimg,
          rarity: raretier,

        }
    }

    await chars.findOneAndUpdate({ User: user.id }, info);

   msg.reply(`Successfully given **${decided}** to **${user.tag}**\nhttps://c.tenor.com/UQzoT3KnRbUAAAAC/harley-quinn-girl.gif`)

  } else {
    new chars({
     User: user.id,
     Harem: {
       [decided]: {
         image: coolimg,
          rarity: raretier,


       }
     },
    }).save()
   msg.reply(`Successfully given **${decided}** to **${user.tag}**\nhttps://c.tenor.com/UQzoT3KnRbUAAAAC/harley-quinn-girl.gif`)
   console.log(chars)
  }
})


}

module.exports.help = {
  name: "forcegive",
  directory:"economy"
}
