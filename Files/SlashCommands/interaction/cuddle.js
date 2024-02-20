const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'cuddle',
  description: 'cuddle another user',
  execute(cmd) {
    let member = cmd.user.username;
    let user = cmd.options.getUser('user')

    let cuddle = [
      "https://i.imgur.com/A0QJd5Z.gif",
      "https://i.imgur.com/yP3HhQw.gif",
      "https://cdn.myanimelist.net/s/common/uploaded_files/1461068547-d8d6dc7c2c74e02717c5decac5acd1c7.gif",
    ]
    let lonely = [
      "https://media2.giphy.com/media/ISOckXUybVfQ4/giphy.gif",
      "https://c.tenor.com/8_oYyEfgASYAAAAC/im-alone-lonely.gif",
      "https://media0.giphy.com/media/el7sQOQvINr9e/giphy.gif",
      "https://media3.giphy.com/media/FUmZiYfJsKHeti80CY/200.gif",
      "https://media2.giphy.com/media/p8E1sVuRJqkUmwpKvG/200.gif"
    ]

    let gif = Math.floor((Math.random() * lonely.length))
    let image = Math.floor((Math.random() * cuddle.length))

    if (user.id === cmd.user.id) {
      let lonelyEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setImage(lonely[gif])
        .addFields({ name: `**${member}** cuddled themselves`, value: `How lonely must one be to do that!` })

      cmd.reply({ embeds: [lonelyEmbed] });

    } else {
      let mention = cmd.options.getUser('user')
      //without args[0]
      let cuddleEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setImage(cuddle[image])
        .setTitle(`**${member}** Cuddled **${mention.username}**`)
      cmd.reply({ embeds: [cuddleEmbed] })


    }
  }

}
