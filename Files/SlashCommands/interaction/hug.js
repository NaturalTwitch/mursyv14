const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'hug',
  description: 'hug another user',
  execute(cmd){
    let member = cmd.user.username;
    let user = cmd.options.getUser('user')

    let hug = [
      "https://external-preview.redd.it/AI3Jl28kpovVFo20G49OS8Wwi9dOO0nChHuHBHMumLc.gif?s=9cc2381beb3fc075eccc773dcabbb61d9a28547b",
      "https://c.tenor.com/1T1B8HcWalQAAAAC/anime-hug.gif",
      "https://66.media.tumblr.com/51634879ac7bf643272d57e4fabf40d8/tumblr_pe53mltmMd1ucf2fl_540.gif",
      "https://c.tenor.com/yoYwKY03PFgAAAAC/lilo-and-stitch-hugs.gif",
      "https://acegif.com/wp-content/uploads/hugs-16.gif",
      "https://i.pinimg.com/originals/5f/f3/21/5ff321f9d17f685340ab364d70d84c44.gif"

    ]


    let image = Math.floor((Math.random() * hug.length))



  //without args[0]
      let hugEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setImage(hug[image])
      .setTitle(`**${member}** Hugged **${user.username}**`)
    cmd.reply({ embeds: [hugEmbed] })

  }

}
