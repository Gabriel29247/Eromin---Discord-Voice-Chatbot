const Discord = require("discord.js");

const premium = require("../../models/premium")
const animeCharacter = require('anime-character-random')
const chars = require("../../models/chars")
const slots = require('../../models/slots')
const talkedRecently = new Set()
module.exports.run = async (bot, msg, args, pog) => {

  if (talkedRecently.has(msg.author.id)) return msg.reply(`Yamete Kudasai! The cooldown is 5 seconds per hunt!`)
msg.channel.send(`<:blurple_search:902595865787637760> Searching characters for Sire **${msg.author.tag}**`)
 const tips = [
   "To get more cookies, just talk to me and I reward you :-)",
   "You can join our community server by doing s!server in order to participate in giveaways and drops!",
   "Try not to sadden me too much, I give less cookies the less kind you are :((",
   "Did you know you could change languages and accents? [s!help]",
   "Use the japanese language and accent for a higher multiplier!",
   "Check `s!premium` to achieve a premium sub without any cash!",
   "Support Eromin at `s!vote` if you're having fun :pleading_face:",
   "1 + 1 = 3",
   "Change character images through `s!changeimg!",
   "Battle and upgrade your characters! `s!battleinfo`",
   "Choose a partner and unlock their full abilities! `s!partner`"
 ]
  const aparams = {
    User: msg.author.id
  }

 let tip = tips[Math.floor(Math.random() * tips.length)];
  const rarityNum = Math.floor(Math.random() * 10000) + 1
  let rarity = 'nd'
  let embcolor = '#32fa46'
  let amountwon = 1000
  if (rarityNum < 5000) {
    rarity = 'Common'
    embcolor = '#3dbeff'
    amountwon = 1100
    prob = "50%"
  } else if (rarityNum < 7500) {
    rarity = 'Uncommon'
    embcolor = '#3d77ff'
    amountwon = 2000
    prob = "25%"
  } else if (rarityNum < 9000) {
    rarity = 'Rare'
    embcolor = '#ab3dff'
    amountwon = 5000
    prob = "20%"
  } else if (rarityNum < 9500) {
    rarity = 'Super Rare'
    embcolor = '#ff613d'
    amountwon = 10000
    prob = "10%"
  } else if (rarityNum < 10000) {
    rarity = 'Legendary'
    embcolor = '#f72323'
    amountwon = 50000
    prob = "Less than 5%"
  } else if (rarityNum === 10000) {
    rarity = 'Mythical'
    embcolor = '#32fa46'
    amountwon = 100000
    prob = "About 0.01%!!"
  }
  console.log(rarityNum)
const chance = Math.floor(Math.random() * 250) + 1

    if(chance === 69){

    chars.findOne(aparams, async(prob, info) => {

      if(prob)console.log(prob)
      if(info){
        const pog = Object.keys(info.Harem).length
        if(pog >= 5) return msg.reply(`**UH OH** | Rem:sticker could not be obtained because you have reached your character limit!`)
        const stickerown = Object.keys(info.Harem).includes(`Rem:Sticker`)
        if(stickerown){
          const remEmbed = new Discord.MessageEmbed()
          .setTitle(`You went hunting, and found... AN EVENT ITEM, **REM!**`)
          .setDescription(`Character from: **Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season Part 2!**\n**Card Type:** <:mythical:897018534566174732> **Mythical** (Event rate 1/100)`)
          .setImage('https://images-ext-1.discordapp.net/external/KQ-W9ItcoLBKBt5fNh30OiKNOhHcGt8vcFzBeJxFMOQ/https/cdn.myanimelist.net/images/characters/9/311327.jpg')
          .setColor('ORANGE')
          msg.channel.send(remEmbed)
          msg.channel.send(`Automatically claimed the event **REM!**`)
          delete info.Harem['Rem:Sticker']
          info.Harem['Rem'] = {
            image: 'https://images-ext-1.discordapp.net/external/KQ-W9ItcoLBKBt5fNh30OiKNOhHcGt8vcFzBeJxFMOQ/https/cdn.myanimelist.net/images/characters/9/311327.jpg',
                rarity: 'Mythical',
                level: 0
          }
           await chars.findOneAndUpdate({ User: msg.author.id }, info)
        }
        if(!stickerown){
        info.Harem['Rem:Sticker'] = {
                type: 'Sticker',
                rarity: '<a:rem:902532928150585364>'
        }
        await chars.findOneAndUpdate({ User: msg.author.id }, info)
        msg.channel.send(`WOW! You just obtained a <a:rem:902532928150585364> **REM STICKER!** Type s!event for more details! [1/1000]`)
        }
      }
    })
    }
    if (chance === 69) return;
  const lbchance = Math.floor(Math.random() * 10) + 1
  if(lbchance === 6){
    const paramsvote = {
       User: msg.author.id
    }
  const inventory = require('../../models/inventory')
  inventory.findOne(paramsvote, async(err, data) => {
    if(data){
      const haslootbox = Object.keys(data.Inventory).includes('lootbox')
      if(!haslootbox){
        data.Inventory["lootbox"] = 1
      } else {
        data.Inventory["lootbox"]++
      }
      await inventory.findOneAndUpdate({ User: msg.author.id }, data)
      msg.channel.send(`You couldn't get anything, but you obtained a <:lootbox:881817371000569917> lootbox because I'm kind! ` + '`s!lootbox` to open it up!')
  } else return msg.channel.send(`You could not obtain anything!`)
        })
  }
    if(lbchance === 6)return;

        animeCharacter.getRandomChar(function(anime) {
    if (anime.name === 'Couldnt Fetch Anything please Try Again') return msg.reply(`You couldn't find anything!`)
    let raremoji = bot.guilds.cache.get('885117362385334292').emojis.cache.find(emoji => emoji.name == rarity.toLowerCase())
    if (rarity === 'Super Rare') {
      raremoji = '<:superrare:897020032662532116>'
    }

    chars.findOne(aparams, async (err, data) => {
    const charembed = new Discord.MessageEmbed()
      .setTitle(`You went hunting, and found...\n**${anime.name.replace(",", "")}!**`)
      .setDescription(`Character from: **${anime.title}**\n**Card Type:** ${raremoji} ${rarity} [${prob}!]\n \nType any card catcher to claim this!\nEvent roll: ${chance} :]\nRoll 69 to get an event item!`)
      .setColor(embcolor)
      .setImage(anime.image)
    if(!data || !data.Buddy){

      msg.reply({ content: `\nYou do not own a partner!\nThus, no extra level was added.\nDo` + '`s!partner` to set a buddy!' + ` Here is you character :flushed:\n Loaded a **cute?** character for you!\nA new event is live! Check s!event for more details!\n**TIP:** ${tip}!'`, embeds: [charembed] });
    } else
    if(data.Harem[data.Buddy].level === 1000){

      msg.reply({ content: `\nYour ${data.Buddy} is already the max level!\n:flushed: Loaded a **cute?** character for you!\nA new event is live! Check s!event for more details!\n**TIP:** ${tip}`, embeds: [charembed] });
    } else {

msg.reply({ content: `\nYour ${data.Buddy} gained **+1** level\n:flushed: Loaded a **cute?** character for you!\nA new event is live! Check s!event for more details!\n**TIP:** ${tip}`, embeds: [charembed] });
      data.Harem[data.Buddy].level = data.Harem[data.Buddy].level + 1


    await chars.findOneAndUpdate({ User: msg.author.id }, data)

    }
    const premparam = {
      User: msg.author.id
    }
    premium.findOne(premparam, async(err, data) => {
          if(data){
            data.HuntCount = data.HuntCount + 1
            await premium.findOneAndUpdate({ User: msg.author.id }, data)
          } else {
            new premium({
              User: msg.author.id,
              HuntCount: 1
            }).save()
          }
        })

    if (rarity === 'Legendary') {
      bot.channels.cache.get('895997284146352148').send(`**${msg.author.tag}** just spawned a **${rarity.toUpperCase()}** ${anime.name.replace(",", "")}!`)
    } else if (rarity === 'Mythical') {
      bot.channels.cache.get('895997284146352148').send(`**${msg.author.tag}** just spawned a **${rarity.toUpperCase()}** ${anime.name.replace(",", "")}!`)
    }


    const charIndex = anime.name.replace(",", "")


      console.log(data)

      if (err) return msg.reply(err)

      if (data) {
        const quantity = Object.keys(data.Harem).length

    const slotdata = await slots.findOne({ User: msg.author.id })
    let ownedslots;
    if(!slotdata){
      ownedslots = 5
    } else {
    ownedslots = slotdata.Slots
    }
        if (quantity >= ownedslots) return msg.reply(`You already own the max **${ownedslots}** character(s) for your character inventory! Please divorce some!\nYou get a +1 slot limit if you divorce a mythical!`)
        const hasItem = Object.keys(data.Harem).includes(charIndex)

          msg.channel.send('Type `claim` to claim this character, ETA is 5 seconds!')
          const filter = m => m.content.includes('claim');
          const collector = msg.channel.createMessageCollector({ filter, time: 5000 })

          collector.on('collect', async(m) => {
            if(m.content === 'claim'){
            if (!hasItem) {
              data.Harem[charIndex] = {
                image: anime.image,
                rarity: rarity,
                level: 0
              }

            } else return msg.reply(`You already own this character!`)

            await chars.findOneAndUpdate({ User:  msg.author.id }, data);


            msg.reply(`**${msg.author.tag}** just claimed a **${rarity.toUpperCase()}** ${anime.name.replace(",", "")}\nWith :sparkles: **good luck?** you also earned **${amountwon}** :cookie:`)
            console.log(data)
            collector.stop()
          }
          })
      } else {
        new chars({
          User: msg.author.id,
          Harem: {
            [charIndex]: {
              image: anime.image,
              rarity: rarity,
              level: 0
            }
          },
          Slots: 5
        }).save()

    const premparam = {
      User: msg.author.id
    }


        msg.reply(`**${msg.author.tag}** just claimed a **${rarity.toUpperCase()}** ${anime.name.replace(",", "")}\nWith :sparkles: **good luck?** you also earned **${amountwon}** :cookie:`)
        msg.channel.send('Welcome to Eromin, this character has been automatically claimed for you!')
        console.log(chars)
      }
    })


  })

   talkedRecently.add(msg.author.id)

        setTimeout(() => {

          talkedRecently.delete(msg.author.id);
        }, 5000);




}

module.exports.help = {
  name: "hunt",
  directory: "economy"
}
