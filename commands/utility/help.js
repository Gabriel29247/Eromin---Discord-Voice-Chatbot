const Discord = require("discord.js");
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus')

module.exports.run = async (bot, msg, args, pog) => {
  const MenusManager = new DiscordMenus(bot);
const myCoolMenu = new MenuBuilder()
    .addLabel('Chatbot Help', { description: 'Main Sector of the bot for chatting!', value: 'value-1', emoji: { name: '💬'}  })
    .addLabel('Economy Help', { description: 'Earn balance, buy pets, feed, eat, etc. through cookies!', value: 'value-2', emoji: { name: '💰'} })
    .addLabel('Anime Help', { description: 'Collect characters and trade over the global economy!', value: 'value-3', emoji: { name: '☄️'}})
    .addLabel('Utility Help', { description: 'This sector is just for test messages and utilization.', value: 'value-4', emoji: { name: '🛠'}})
   

      
    .setMaxValues(1)
    .setMinValues(1)
    .setCustomID('cool-custom-id')
    .setPlaceHolder('🔎 Choose a help category...');
    const newembed = new Discord.MessageEmbed()
    .setTitle("Welcom to Eromin: the BEST VC Artificial Intelligence on Discord!\nThe actual SIRI of Discord!")
    .setColor('#facdf5')
    .setDescription(`Heyyyy, Eromin here! Let me go ahead and say something about myself first!\n I am a **Discord Voice AI Chatbot**, generated just for fun and to fulfill all your talking and activity needs! With me, activity in your server is just one step away!\n 
To get started, just **choose a help category below this MessageEmbed. If a dropdown does not load up, please update your Discord.**\n \n
**TBN:** My main sector ONLY functions in VC. I take your chat messages and speak through that! So if your server doesn’t have any VCs, it would be difficult for me :( I could still be an asset for you though!\n \n**Choose a category from the dropdown below.** Once you do so you'll get an **ephemeral** message, something like the Clyde bot sends you!`)
  .setFooter(`Command executed by ${msg.author.tag} | Bot developed by mikeyy#4832.`)
.setThumbnail(bot.user.displayAvatarURL())
    .setTimestamp()
    MenusManager.sendMenu(msg, newembed, { menu: myCoolMenu }).catch(err => console.error(err));

    
}

module.exports.help = {
  name:"help",
  directory:"utility"
}