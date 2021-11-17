
    const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, pog) => {
 var milliseconds = parseInt((bot.uptime % 1000) / 100),
        seconds = parseInt((bot.uptime / 1000) % 60),
        minutes = parseInt((bot.uptime / (1000 * 60)) % 60),
        hours = parseInt((bot.uptime / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;



   const alatency = Math.floor(bot.ws.ping);
    const statembed = new Discord.MessageEmbed()
    .setTitle('Detailed List of Statistics for me!')
    .setDescription(`:pirate_flag: **Ahoy! I am alive!**\n \n:ping_pong: **API Latency:** -------> ${alatency} ms\n:computer: **Servers:** -------> ${bot.guilds.cache.size}\n:card_box: **ID:** -------> ${bot.user.id}\n:film_frames: **CHANNELS:** -------> ${bot.channels.cache.size}\n:keyboard: **UPTIME:** -------> ${hours} H ${minutes} M ${seconds} S ${milliseconds} MS\n:compass: **RAM:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n:people_hugging: **MEMBERS:** ------> ${bot.users.cache.size}`)
    msg.reply(statembed)
}

module.exports.help = {
  name:"stats",
  directory:"utility"
}
