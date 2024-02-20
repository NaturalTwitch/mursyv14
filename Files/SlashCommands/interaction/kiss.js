const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'kiss',
  execute(cmd) {
    let member = cmd.user.username;
    const user = cmd.options.getUser('user')



    if (!user) return cmd.reply(`**${member}**, Please Mention a User!`);

    let kiss = [
      "https://c.tenor.com/ErAPuiWY46QAAAAC/kiss-anime.gif",
      "https://i.pinimg.com/originals/f7/e8/a4/f7e8a4abac5d9e64784bd97480863a19.gif",
      "https://c.tenor.com/SqpFZQfcyEgAAAAM/anime-kiss.gif",
      "https://37.media.tumblr.com/7bbfd33feb6d790bb656779a05ee99da/tumblr_mtigwpZmhh1si4l9vo1_500.gif",
      "https://24.media.tumblr.com/5d51b3bbd64ccf1627dc87157a38e59f/tumblr_n5rfnvvj7H1t62gxao1_500.gif",
      "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-14.gif",
      "https://i.redd.it/y4crk6zfd6g51.gif",
      "https://pm1.narvii.com/6637/8d366734f62c2cf4e05b4f89df5d8720b701e4cd_hq.jpg"

    ]
    let lonely = [
      "https://c.tenor.com/B82nmzIDizcAAAAC/self-love-kiss.gif",
      "https://c.tenor.com/rn00U9VQeXgAAAAC/love-yourself-james-franco.gif",
      "https://media.giphy.com/media/1Q9xDyadSDlUkuIEkL/giphy.gif",
      "https://media.giphy.com/media/dZ9FfuEPfQBfJfOyvp/giphy.gif",
      "https://c.tenor.com/XA7uHTIJTzUAAAAM/malu-viana-lucas-viana.gif"

    ]

    let gif = Math.floor((Math.random() * lonely.length))
    let image = Math.floor((Math.random() * kiss.length))

    if (user.id === cmd.user.id) {
      let lonelyEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setThumbnail(lonely[gif])
        .addFields({ name: `**${member}** Kissed themselves`, value: `How lonely must one be to do that!` })

      cmd.reply({ embeds: [lonelyEmbed] });

    } else {

      let reasonKissEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setImage(kiss[image])
        .setTitle(`**${member}** Kissed **${user.username}**`)
      cmd.reply({ embeds: [reasonKissEmbed] })
    }
  }

}
