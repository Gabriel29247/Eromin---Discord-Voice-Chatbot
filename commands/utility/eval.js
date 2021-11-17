const Discord = require("discord.js");
const ownerid = "759743389037101066";
const { inspect } = require('util')
module.exports.run = async (bot, msg, args, pog) => {
    
   if(msg.author.id === ownerid) {
      
        
let evaled;
     try { 
       evaled = await eval(args.join(' ')); msg.channel.send(inspect(evaled)); console.log(inspect(evaled)); } catch (error) { console.error(error); msg.reply('there was an error during evaluation.'); }
      
            

          
    }
  
}
  
module.exports.help = {
    name: "eval",
    directory: "utility"
}