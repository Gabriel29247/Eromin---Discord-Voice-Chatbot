const Discord = require("discord.js");

const prem = require("../../models/premium")
const randomcolor = require("randomcolor")
module.exports.run = async (bot, msg, args, pog) => {
  const param = {
    User: msg.author.id
  }
  /*
    User: String,
    Talk: Number,
    HuntCount: Number,
    Sacrified: Boolean,
    Claims: Number,
    Votes: Number,
    Events: Number,
    Battles: Number,
    Hunted: Boolean
  */

prem.findOne(param, async(err, data) => {

  if(data){
  let oneind;
  let twoind;
  if(data.Sacrified === true){
    oneind = 1
  } else {
    oneind = 0
  }
  if(data.Hunted === true){
    twoind = 1
  } else {
    twoind = 0
  }
  const premium = new Discord.MessageEmbed()
  .setTitle(`Welcome to Eromin's premium program!`)
  .setDescription(`Eromin is a non-profit bot that has been made solely for fun. We do not provide any provision of getting premium through payment!\n \n**Premium is obtainable through passing the following quests:**\n<:goldenbanana:896292776537387028> **Talk 750 times with Eromin:** ${data.Talk || 0}/750\n<:blurple_search:902595865787637760> **Hunt 1000 characters:** ${data.HuntCount || 0}/1000\n:moneybag: **???**\n:skull: **Sacrifice 1 mythical character:** ${oneind}/1`)
  .addField('`s!premiumclaim` to claim your premium!', 'Premium literally gives you tons of perks that cannot even be imagined lol')
  .setColor('BLURPLE')
  .setTimestamp()
  .setThumbnail('https://cdn0.iconfinder.com/data/icons/strategy-22/512/divestiture_different-money-cancel-512.png')
  .setFooter(`Premium perks get updated frequently!`)
    msg.channel.send(premium)



  } else {
    new prem({
      User: msg.author.id,
      Talk: 0,
      HuntCount: 0,
      Sacrified: false,
      Votes: 0,
      Events: 0,
      Battles: 0,
      Hunted: false
    }).save()
    msg.channel.send(`**${msg.author.tag}**, you have successfully taken part in the premium program! Check ` + '`s!premium` ' + `for your progress!`)
  }
})
}

module.exports.help = {
  name: "premium",
  directory:"economy"
}
