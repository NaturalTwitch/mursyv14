const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'kill',
  description: 'kill another user',
  execute(cmd){
let author = cmd.user.username;
let user = cmd.options.getUser('user');

      if(user.id === '882458361663213599'){
        let noDeathEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail('https://media.giphy.com/media/jR5btQ9LH000ZehIE6/giphy.gif')
            .setTitle(`I'm not going to kill myself baka!!!`)

            cmd.reply({ embeds: [noDeathEmbed] });
      } else {

        let death = [
          "https://i.pinimg.com/originals/27/3f/2d/273f2de245154f68ff1f3ff87dd9c929.gif",
          "https://qph.fs.quoracdn.net/main-qimg-1c7b4119a161023924027ab20136f523",
          "https://66.media.tumblr.com/01779bfcfcbc0b124656446c46fa19a5/tumblr_n0qxf9Mj8o1sgx3vdo3_500.gif",
          "https://thumbs.gfycat.com/UnrealisticUnlinedIndigowingedparrot-max-1mb.gif",
          "https://c.tenor.com/kMcVFwTTRdMAAAAM/yuno-gasai-future-diary.gif",

        ]
      let mention = cmd.options.getUser('user')
        let replies = [
          `**${mention.username}** was killed by **${author}**`,
          `**${mention.username}** was shot down by **${author}**`,
          `**${mention.username}** was terminated by **${author}**`,
          `**${mention.username}** slipped on a banana peel`,
          `A Piano fell on **${mention.username}**`,
          `**${mention.username}** Died On the way to the hospital`,
          `**${mention.username}** Died By Explosive Diaherra`,
          `**${author}** Poisoned **${mention.username}**`,
          `**${mention.username}** Was Revived By The Doctors`,
          `**${mention.username}** Died From Cancer`
        ]
        let suicide = [
          `**${mention.username}** Jumped off a Bridge`,
          `**${mention.username}** Believed they Could Fly`,
          `**${mention.username}** Travelled in time to walk with the Dinosaurs`,
          `**${mention.username}** Thought they were Superman`,
          `**${mention.username}** Tried to breathe underwater`,
          `**${mention.username}** Tried to talk with the fish`,


        ]

        let image = Math.floor((Math.random() * death.length))

        let note = Math.floor((Math.random() * suicide.length))
        let result = Math.floor((Math.random() * replies.length))

        let killEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setImage(death[image])
        .setTitle(`${author} Killed ${mention.username}`)

    let nosuicideEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setThumbnail('https://c.tenor.com/1uWwWGNEexkAAAAM/put-the-gun-down-paranoid.gif')
        .setTitle(`Not Allowed To Kill Yourself!!`)


        if(user.id === cmd.user.id){
          let suicideEmbed = new EmbedBuilder()
          .setColor(randomColor)
          .setDescription(`**${author}** has commited suicide`)

          cmd.reply({ embeds: [nosuicideEmbed], content: `${suicide[note]}` })

        } else {
          cmd.reply({ embeds: [killEmbed], content: `${replies[result]}` })
          
        }


}
}
}
