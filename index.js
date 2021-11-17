const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`I am listening at http://localhost:${port}`));
////////////////////////////////////////
const topgg = require('@top-gg/sdk')
const Discord = require("discord.js");
const fs = require("fs");
require('discord-reply')

const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const nodeEvents = require('events')
const { AutoPoster } = require('topgg-autoposter');
const { promisify } = require('util');
//const { DiscordTogether } = require('discord-together')
const node_events = require('node-events')

const webhook = new topgg.Webhook('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1NTcwODY3NDYzMDYxNTA0MSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyNzA2Njk1fQ.1S-lQsWOqRbTzrPI4R4252OgdWGOrgWornab6Ji8A1g')
const menu = require("discord-menus")
const mongoose = require("mongoose")
bot.playerList = []
bot.entryPassword = "Lottery666@1"
//bot.discordTogether = new DiscordTogether(bot)
const pog = "s!"
const lottery = require("./models/lottery")
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1NTcwODY3NDYzMDYxNTA0MSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyNzA2Njk1fQ.1S-lQsWOqRbTzrPI4R4252OgdWGOrgWornab6Ji8A1g', bot)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

const schedule = require('node-schedule')


app.post('', webhook.listener(vote => {
  const randomshit = Math.floor(Math.random() * 50000) + 25000
  bot.users.fetch(`${vote.user}`).then((user) => {
    user.send(`**Thank you for voting Eromin!**Your name: was also automatically recorded in the list of the people for Future Premium Giveaways!\nJoin our server using s!server to get more rewards for voting!`)
    const paramsvote = {
      User: user.id
    }
    const inventory = require('./models/inventory')
    inventory.findOne(paramsvote, async (err, data) => {
      if (data) {
        const haslootbox = Object.keys(data.Inventory).includes('lootbox')
        if (!haslootbox) {
          data.Inventory["lootbox"] = 1
        } else {
          data.Inventory["lootbox"]++
        }
        await inventory.findOneAndUpdate({ User: user.id }, data)
        user.send(`You obtained a lootbox! ` + '`s!lootbox` to open it up!')
      } else return user.send(`Uh oh! Looks like you haven't started your adventure for more rewards yet!\nIn order to receive lootboxes, own at least 1 item!` + '`s!shop`')
    })


    bot.channels.cache.get('893455589290684426').send(`Thank you for voting **${user.tag}**`)
    let guild = bot.guilds.cache.get('885117362385334292')


    if (guild.member(user.id)) {
      guild.member(user.id).roles.add('891985075414130718').then(() => {
        bot.channels.cache.get('893455589290684426').send(`Successfully given the **Voter** role for 24 hours!`)
      }).catch(function(error) {
        bot.channels.cache.get('893455589290684426').send(`Missing permissions to add my roles to ${user}!`)
      })
    } else return bot.channels.cache.get('893455589290684426').send(`I couldn't add roles for the specific user because they do not exist in this server!`)
  })
}))


bot.commands = new Discord.Collection();

bot.isReady = true
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus')

const MenusManager = new DiscordMenus(bot);

MenusManager.on('MENU_CLICKED', (menu) => {
  if (menu.customID === 'cool-custom-id') {
    if (menu.values[0].toLowerCase() === 'value-1') {
      const chatembed = new Discord.MessageEmbed()
        .setColor('#facdf5')
        .setTitle('💬 Welcome to the Chatbot Help Sector!')
        .setDescription('**Here, ALL the Artificial Intelligence Chatbot commands are situated!**\n \n**s!talk <text>** -------> This is basically - *talk* <text> and text here means whatever you want me to process! You must be in a joinable VC to execute this!\n**s!dc** -------> Make the bot disconnect from the VC to stop talking.\n**s!setlanguage** -------> Use a country code as an argument to change the LANGUAGE of your chat bot! Run this command without arguments to learn more!\n**s!setaccent** -------> Same thing as setlanguage, BUT this changes the accent of the bot! \n ')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`Bot developed by mikeyy#4832.`)
      return menu.reply(chatembed, {
        ephemeral: true
      });
    } else if (menu.values[0].toLowerCase() === 'value-2') {
      const ecoembed = new Discord.MessageEmbed()
        .setColor('#facdf5')
        .setTitle('💰 Welcome to the Economy Help Sector!')
        .setDescription('**Here, ALL the Economy related commands are situated!**\n Please note that this sector is still under heavy development.\n \n**s!bal** -------> Check the balance of yourself (without arguments) or mention a specific user to check theirs!\n**s!shop** -------> Shop is here! Buy exclusive perks and become the best!\n**s!inventory** -------> Check out your bag!\n**s!hunt** -------> ??? [obvious secret command]\n**s!buy** -------> Buy an item from the shop!\n**s!lottery** -------> Buy a lottery ticket for 1000 :cookie: and test your luck!\n')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`Bot developed by mikeyy#4832.`)
      return menu.reply(ecoembed, {
        ephemeral: true
      });
    } else if (menu.values[0].toLowerCase() === 'value-3') {
      const animeEmbed = new Discord.MessageEmbed()
        .setColor('#facdf5')
        .setTitle('Welcome to the Anime Help Sector!')
        .setDescription('**Here, ALL the ANIME related commands are situated!**\nThis sector is still under development. Collect various characters based on tiers as cards, level up and trade over the global economy!\n \n**s!charinventory** -------> Displays your **character** inventory.\n**s!hunt** -------> Hunt for anime chars.\n**s!divorce** -------> Divorce an owned character to free slots!\n**s!give** -------> Give someone a character\n**s!info** -------> View info on an owned character.\n**s!event** -------> View the ongoing event!\n**Please abide by us. This sector is still under development.**')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`Bot developed by mikeyy#4832.`)
      return menu.reply(animeEmbed, {
        ephemeral: true
      });

    } else if (menu.values[0].toLowerCase() === 'value-4') {
      const utilembed = new Discord.MessageEmbed()
        .setColor('#facdf5')
        .setTitle('🛠 Welcome to the Utility Help Sector!')
        .setDescription('**Here, ALL the UTILITY related commands are situated!**\nThis sector is mainly only for testing, so it might not be much of a purpose!\n \n**s!help** -------> Yeah, you know this, get the help command!\n**s!invite** -------> Get the invite link for the bot.\n**s!ping** -------> Get the API latency for the bot.\n**s!stats** -------> Detailed list of statistics for the bot.\n**s!vote** -------> **Vote for me on Top.gg if you want your name in the list of guaranteed FUTURE premium! Leave us a review of what you think <3')
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`Bot developed by mikeyy#4832.`)
      return menu.reply(utilembed, {
        ephemeral: true
      });

    } else {
      return menu.reply('That menu does not exist!', {
        ephemeral: true
      })
    }
  }
})

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);

    bot.commands.set(command.help.name, command);
  }
}


//Playing Message
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
  mongoose.connect('mongodb+srv://ErominDB:eromindb@eromindb.sieku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then((mong) => {
    console.log(`Connected to mongoose!`)
  })
  bot.user.setPresence({ activities: [{ name: 'migrating to v13...' }], status: 'idle' });
});
bot.on('guildCreate', guild => {
  let channelID;
  let channels = guild.channels.cache;

  channelLoop: for (let key in channels) {
    let c = channels[key];
    if (c[1].type === 'text') {
      channelID = c[0];
      break channelLoop;
    }
  }

  let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
  channel.send(
    'Thank you so much for inviting me to your lovely server! I hope I can be an asset for it!\nA new event is live! Check `s!event` for details!\nStart talking with `s!talk`!\nChange languages and accents with `s!setaccent` and `s!setlanguage`!\nHunt characters! `s!hunt`!\nBy using our bot, you agree to the **TERMS AND CONDITIONS**, view those at our community server `s!server`, since its inconvenient to list them all out here.\nEnjoy and stay **Ero~min**!'
  );
  bot.users.cache.get(`759743389037101066`).send(`I was invited to **${guild.name}**`)
});

//Command Manager
bot.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  if (msg.content.includes(bot.user.id)) return msg.channel.send(`Hiii, I am Eromin, a Voice Chatbot! Get started with me doing s!help, and I hope I can be an asset for your lovely server!`)

  let prefix = 's!';
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  const server = require('./models/server')

  server.findOne({ Server: msg.guild.id }, async(e, info) => {
    if(info){
  if (!cmd.startsWith(prefix) && msg.channel.id === info.Channel) {

    msg.channel.startTyping()
    const request = require('request')
    const axios = require('axios')
    const discordTTS = require('discord-tts')
    const fs = require('fs')

    const { translate } = require('free-translate');
    const inventory = require('./models/inventory')
    const premium = require('./models/premium')
    const random = Math.floor(Math.random() * 1000) + 1;
    if (!msg.member.voice.channel) return msg.reply(`You must be in a VC to execute this command!`) && msg.channel.stopTyping()
    if (bot.isReady === false) return msg.reply(`Slow down!! **${msg.author.username}**, let me speak first!\nThe cooldown for non premium servers is 5 seconds!\nYour server status: **NOT PREMIUM**\n \nIf that was a legit command you ran, **some rare text are only not converted by me!**`) && msg.channel.stopTyping()
    const tips = [
      "To get more cookies, just talk to me and I reward you :-)",
      "You can join our community server by doing s!server in order to participate in giveaways and drops!",
      "Try not to sadden me too much, I give less cookies the less kind you are :((",
      "Did you know you could change languages and accents? [s!help]",
      "Use the japanese language and accent for a higher multiplier!",
      "Check `s!premium` to achieve a premium sub without any cash!",
      "Support Eromin at `s!vote` if you're having fun :pleading_face:",
      "1 + 1 = 3",
      "Change character images through `s!changeimg!`",
      "Battle and upgrade your characters! `s!battleinfo`"
    ]

    let tip = tips[Math.floor(Math.random() * tips.length)];
    if (msg.content.length > 250) return msg.reply(`Keep below the text limit! [Nearly 250 Characters]`) && msg.channel.stopTyping()
    if (msg.content.includes('@')) return msg.reply(`While talking to me, please don't mention anyone, thanks!`) && msg.channel.stopTyping()
    if (!msg.content) return msg.reply(`Sorry, I can't process your empty messages! Specify a valid message alongside it, example: s!talk hi eromin`) && msg.channel.stopTyping()

    const input = info.Accent || 'en'

    const output = info.Language || 'en'

    if (bot.isReady === true && msg.member.voice.channel) {
      const params = {
        User: msg.author.id
      }

      let multiplier = 1

      inventory.findOne(params, async (err, data) => {
        if (data) {
          const hasItem = Object.keys(data.Inventory).includes('banana')
          if (!hasItem) return;
          multiplier = 2 * data.Inventory['banana']
        }
      })

      bot.isReady = false;
      const modifiedmssg = msg.content
      if (modifiedmssg == "") {
        msg.channel.send('I cant process empty messages!')
        msg.channel.stopTyping()
        bot.isReady = true
      }
      if (modifiedmssg == "") return;
      const guardians = [
        "Michael",
        "My Dad",
        "Mom",
        "My Boyfriend",
        "The Cops"
      ]
      const parent = guardians[Math.floor(Math.random() * guardians.length) + 1]
      const swearjar = require('swearjar-extended2')
      if(swearjar.profane(modifiedmssg) === true) {
        msg.reply(`**${msg.author.tag}:** ${swearjar.censor(modifiedmssg)}\n:scream: :oncoming_police_car: ${parent} caught you harassing me! Please avoid this in the future!`)
        bot.isReady = true


      }
      msg.channel.stopTyping()

      axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${modifiedmssg}&botname=Eromin&ownername=mikeyy#4832&user=${msg.author.id}`).then(function(response) {

        const reply = response.data.message

        const broadcast = bot.voice.createBroadcast();
        const channelId = msg.member.voice.channelID;
        const channel = bot.channels.cache.get(channelId);
        if (!msg.guild.me.permissionsIn(channel).has("SPEAK")) {
          msg.reply(`**I cannot speak in your channel :(**\nIf I have been disabled by server mute manually, please do not do that.\n \nGo directly into the channel perms and give me perms to speak.`)
          bot.isReady = true
          msg.channel.stopTyping()
        }

        if (!msg.guild.me.permissionsIn(channel).has("SPEAK")) return;
        const link = (`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${input}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURI(reply)}`)
        request.get(link, (error, response, body) => {
          if (error)
            msg.reply('Error occured:' + error);
            msg.channel.stopTyping()

          try {
            let translation = JSON.parse(body);
            const trtext = translation[0][0][0]

            channel.join().then(connection => {
              if (reply.length > 200) {
                console.log('REPLY was a bit long, so its substring.')
                msg.reply(`Aw man, I got tired of speaking such a long sentence, here is the full thing I CTRL+V*ed* :) ---> ${trtext} **+${random}** :cookie:!`)

                msg.channel.stopTyping()
              }
              const sentence = trtext.substring(0, 200)

              if (!msg.guild.me.permissionsIn(channel).has("SPEAK")) return;
              broadcast.play(discordTTS.getVoiceStream(`${trtext}`, { lang: output || 'en' }))
              const dispatcher = connection.play(broadcast)
              msg.reply(sentence + `\n(${reply}) ----> For translation purposes! [s!setlanguage]\n**TIP:** ${tip}\nFacing problems and issues? Contact our support at ` + '`s!server`!')
              msg.channel.stopTyping()

              const premparam = {
                User: msg.author.id
              }
              premium.findOne(premparam, async (err, data) => {
                if (data) {
                  data.Talk = data.Talk + 1
                  await premium.findOneAndUpdate({ User: msg.author.id }, data)
                } else {
                  new premium({
                    User: msg.author.id,
                    Talk: 1
                  }).save()
                }
              })
              setTimeout(() => {
                bot.isReady = true
              }, 5000)

            }).catch(function(error) {
              msg.channel.send(`An error occured while processing your command! \n${error}\n \nPlease fix the permissions and try again!`)
              bot.isReady = true
              msg.channel.stopTyping()
            })
          }
          catch (err) {
            msg.reply('Error occured: ' + err);
            msg.channel.stopTyping()
          }
        });




      }).catch(function(error) {
        msg.channel.send(`Error with the API occured!\n${error}\n \nPlease try again later, thank you!\nAlso, please do not give any special characters like: **Hange Zoë** or any emojis!`)
        bot.isReady = true
        msg.channel.stopTyping()
      });


    }
  msg.channel.stopTyping()


  }
    }
  })
  if (!cmd.startsWith(prefix)) return;
  if (!msg.guild.me.permissionsIn(msg.channel).has("EMBED_LINKS")) return msg.reply('I cannot send EMBEDS in this channel. Please fix my permissions since most of my messages turn out as embeds!')
  const blacklists = require('./models/blacklists')
  const eparam = {
    Password: 'poop@123'
  }
  blacklists.findOne(eparam, async (err, data) => {

    if (data.Users[msg.author.id] && '759743389037101066' !== msg.author.id) return msg.react('❌')





    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if (commandfile) commandfile.run(bot, msg, args, pog);

    bot.channels.cache.get('903534590793252904').send(`**${msg.author.tag}** just ran the ${cmd} command at ${msg.guild.name} in channel ${msg.channel.name} with arguments: ${args.join(" ")}`)


  })


});
//Token need in token.json
bot.login('ODU1NzA4Njc0NjMwNjE1MDQx.YM2azg.nHxl-o1uXBWmU-0Vjl_zQS5QqkE');
