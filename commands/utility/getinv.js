
const ownerid = "759743389037101066";


const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
 

   if (msg.author.id === ownerid) {
        let guild = null;

        if (!args[0]) returnmsg.channel.send("Enter Guild Name or Guild ID of where you want Invite Link.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            returnmsg.channel.send("That's the Invalid Guild Name");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                returnmsg.channel.send("Sorry, I doesn't have CREATE_INSTANT_INVITE Permission There!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                returnmsg.channel.send(`${err} has occured!`);
            });
           msg.channel.send(invite.url);
        } else {
            returnmsg.channel.send(`\`${args.join(' ')}\` - I'm not in that Server.`);
        }
    } else {
        return;
    }
}

  

  
  

module.exports.help = {
  name:"getinv",
  directory:"utility"
}
