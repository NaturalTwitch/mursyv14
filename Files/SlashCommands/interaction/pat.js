const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'pat',
  description: 'pat another user',
  execute(cmd){
    let member = cmd.user.username;
    let user = cmd.options.getUser('user');


    let pat = [
      "https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif",
      "https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif",
      "https://media.giphy.com/media/109ltuoSQT212w/giphy.gif",
      "https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif",
      "https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif",
      "https://c.tenor.com/dmYhPDHbbI4AAAAM/misha-misha-necron-anos-voldigoad-the-misfit-of-demon-king-academy-headpat-pat.gif",
      "https://i.imgur.com/UWbKpx8.gif",
      "https://c.tenor.com/jEfC8cztigIAAAAC/anime-pat.gif"
    ]

    let image = Math.floor((Math.random() * pat.length))

      //without args[0]
          let patEmbed = new EmbedBuilder()
          .setColor(randomColor)
          .setImage(pat[image])
          .setTitle(`**${member}** Patted **${user.username}**`)
        cmd.reply({ embeds: [patEmbed] })

  }

}
