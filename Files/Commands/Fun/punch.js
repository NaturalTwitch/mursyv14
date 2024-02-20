const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'punch',
  description: 'punch another user',
  execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first()


    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);


    let punch = [
      "https://i.imgur.com/g91XPGA.gif",
      "https://thumbs.gfycat.com/KlutzyPowerfulEgret-size_restricted.gif",
      "https://giffiles.alphacoders.com/131/13126.gif",
      "https://j.gifs.com/W7nz1g@large.gif",
      "https://c.tenor.com/GuML2yHT58kAAAAd/punch-anime.gif",
      "https://giphy.com/gifs/fairy-tail-punching-10azGY0EdjzD3O",
      "https://i.gifer.com/C3SI.gif",
      "https://c.tenor.com/UGw1bVaQFZAAAAAC/anime-punch.gif"

    ]

    let image = Math.floor((Math.random() * punch.length))

    if (!reason) {
      let mention = message.mentions.users.first().username;
      //without args[0]
      let punchEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setThumbnail(punch[image])
        .setDescription(`**${member}** Punched **${mention}**`)
      message.channel.send({ embeds: [punchEmbed] })

    } else {
      let mention = message.mentions.users.first().username;
      //with args[0]
      let reasonPunchEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setThumbnail(punch[image])
        .setTitle(`**${member}** Punched **${mention}**`)
        .addFields(
          {
            name: "Reason:",
            value: `${reason}`
          }
        )
      message.channel.send({ embeds: [reasonPunchEmbed] })
    }
  }

}
