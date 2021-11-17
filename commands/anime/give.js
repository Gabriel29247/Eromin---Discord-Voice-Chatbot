const Discord = require("discord.js");

const items = require("../../shopitems")
const chars = require("../../models/chars")
const randomcolor = require("randomcolor")
module.exports.run = async (bot, msg, args, pog) => {

const params = {
  User: msg.author.id
}


const user = msg.mentions.users.first()
if(!user) return msg.reply(`Please specfiy a valid user to donate!`)
if(user.id ===  msg.author.id) return msg.reply(`You cannot give yourself characters!`)
const others = {
  User: user.id
}
const chartogive = args.join(" ")

const stringed = `<@${user.id}>  `

const decided = chartogive.substring(stringed.length)
if(!decided) return msg.reply(`Please specify a character!`)
console.log(decided)


chars.findOne(params, async(err, data) => {
  if(!data) return msg.reply(`You have no characters to give **${user.tag}!**`)
  const hasChar = Object.keys(data.Harem).includes(decided)
  if(!hasChar) return msg.reply(`You do not have the character! Please note that this function is currently case and character sensitive!`)
  if(decided === 'Rem:Sticker') return msg.channel.send(`This item cannot be given! :thinking:`)
  const coolimg = data.Harem[decided].image
  const raretier = data.Harem[decided].rarity

  delete data.Harem[decided]
  await chars.findOneAndUpdate(params, data)


chars.findOne(others, async(problem, info) => {

  if(info){
    const quantity = Object.keys(info.Harem).length
    if(quantity >= 5) return msg.reply(`You cannot receive this character, **${user.tag}**! You already have the max **5** slot(s)! Please divorce some characters!`)
    const hasItem = Object.keys(info.Harem).includes(decided)
    if(hasItem) return msg.reply(`You already own a copy of this character. Please divorce it if you want another copy.`)
    if(!hasItem){
      info.Harem[decided] = {
          image: coolimg,
          rarity: raretier,

        }
    }

    await chars.findOneAndUpdate({ User: user.id }, info);

   msg.reply(`Successfully given **${decided}** to **${user.tag}**`)

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
   msg.reply(`Successfully given **${decided}** to **${user.tag}**`)

  }
})
})
}

module.exports.help = {
  name: "give",
  directory:"economy"
}
