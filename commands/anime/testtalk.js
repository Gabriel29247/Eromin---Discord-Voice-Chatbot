const Discord = require("discord.js");
VoiceText = require('voicetext')
const fs = require('fs')
module.exports.run = async (bot, msg, args, pog) => {
  if (!process.env.ownerid === msg.author.id) return;
  const vc = msg.member.voice.channel
  if (!vc) return msg.reply(`You must join a VC to execute this command!`)
  vc.join()
    .then(connection => {
      voice = new VoiceText(process.env.jptoken)
      voice
        .speaker(voice.SPEAKER.HARUKA)
        .emotion(args[1])
        .emotion_level(args[2])
        .pitch(args[3])
        .speed(args[4])
        .volume(args[5])
        .speak('おはようございます', (e, buf) => {
          const num = Math.floor(Math.random() * 999999999) + 1
          fs.writeFile(`./${num}.wav`, buf, 'binary', e => {
            if (e) console.log(e)
            const dispatcher = connection.play(`./${num}.wav`)
            setInterval(() => {
              if(`./${num}.wav`){
               fs.unlink(`./${num}.wav`,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
                });
              }
            }, 5000)

          })
        })
    })


}

module.exports.help = {
  name: "outdatedaf",
  directory: "updates"
}
