const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'kill',
  aliases: ['murder'],
  description: 'kill another user',
  execute(client, message, cmd, args, Discord){
let member = message.author.username;
let user = message.mentions.users.first();
    

    if(!user) return message.channel.send(`**${member}**, Please Mention a User!`);

      if(user.id === '882458361663213599'){
        let noDeathEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail('https://media.giphy.com/media/jR5btQ9LH000ZehIE6/giphy.gif')
            .setTitle(`I'm not going to kill myself baka!!!`)

            message.channel.send({ embeds: [noDeathEmbed] });
      } else {

        let death = [
          "https://i.pinimg.com/originals/27/3f/2d/273f2de245154f68ff1f3ff87dd9c929.gif",
          "https://qph.fs.quoracdn.net/main-qimg-1c7b4119a161023924027ab20136f523",
          "https://66.media.tumblr.com/01779bfcfcbc0b124656446c46fa19a5/tumblr_n0qxf9Mj8o1sgx3vdo3_500.gif",
          "https://thumbs.gfycat.com/UnrealisticUnlinedIndigowingedparrot-max-1mb.gif",
          "https://c.tenor.com/kMcVFwTTRdMAAAAM/yuno-gasai-future-diary.gif",

        ]
      let mention = message.mentions.users.first().username;
        let replies = [
          `**${mention}** was killed by **${member}**`,
          `**${mention}** was shot down by **${member}**`,
          `**${mention}** was terminated by **${member}**`,
          `**${mention}** slipped on a banana peel`,
          `A Piano fell on **${mention}**`,
          `**${mention}** Died On the way to the hospital`,
          `**${mention}** Died By Explosive Diaherra`,
          `**${member}** Poisoned **${mention}**`,
          `**${mention}** Was Revived By The Doctors`,
          `**${mention}** Died From Cancer`
        ]
        let suicide = [
          `**${mention}** Jumped off a Bridge`,
          `**${mention}** Believed they Could Fly`,
          `**${mention}** Travelled in time to walk with the Dinosaurs`,
          `**${mention}** Thought they were Superman`,
          `**${mention}** Tried to breathe underwater`,
          `**${mention}** Tried to talk with the fish`,


        ]

        let image = Math.floor((Math.random() * death.length))

        let note = Math.floor((Math.random() * suicide.length))
        let result = Math.floor((Math.random() * replies.length))

        let killEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setThumbnail(death[image])
        .setTitle(`${mention} has Passed away`)
        .setDescription(`How did ${user} die?`)
        .setTimestamp()

    let nosuicideEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setThumbnail('https://c.tenor.com/1uWwWGNEexkAAAAM/put-the-gun-down-paranoid.gif')
        .setTitle(`Not Allowed To Kill Yourself!!`)


        if(user.id === message.author.id){
          let suicideEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setDescription(`**${member}** has commited suicide`)

          message.channel.send({ embeds: [suicideEmbed] })
          setTimeout(function(){
            message.channel.send(suicide[note])
          }, 5000)

        } else {
          message.channel.send({ embeds: [killEmbed] })
          setTimeout(function(){
              message.channel.send(replies[result])
           }, 5000);
        }


}
}
}
