const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'tackle',
  description: 'tackle another user',
  execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);

    let tackle = [
      "https://media.giphy.com/media/7JTlYn5apnoULrZx2A/giphy.gif",
      "https://media.giphy.com/media/jULCKZmMGlZ7DPZbQr/giphy.gif",
      "https://media.giphy.com/media/MF12HtlamewVic5j16/giphy.gif",
      "https://media.giphy.com/media/l8ooOxhcItowwLPuZn/giphy.gif",
      "https://media.giphy.com/media/3o7aTsJ6yTVDiiSsO4/giphy.gif",
      "https://media.giphy.com/media/G6fmc0H5xpZDO/giphy.gif",
      "https://media.giphy.com/media/3osxYaWWuMvKmJ6j3q/giphy.gif",
      "https://media.discordapp.net/attachments/906660147395432491/913914836822417418/unknown.gif",
      "https://cdn.discordapp.com/attachments/906660147395432491/913914854518161518/unknown.gif"
    ]

    let image = Math.floor((Math.random() * tackle.length))

    if (!reason) {
      let mention = message.mentions.users.first().username;
      //without args[0]
      let tackleEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setThumbnail(tackle[image])
        .setDescription(`**${member}** Tackled **${mention}**`)
      message.channel.send({ embeds: [tackleEmbed] })


    } else {
      let mention = message.mentions.users.first().username;
      //with args[0]
      let reasonTackleEmbed = new EmbedBuilder()
        .setColor(randomColor)
        .setThumbnail(tackle[image])
        .setTitle(`**${member}** Tackled **${mention}**`)
        .addFields(
          {
            name: "Reason:",
            value: `${reason}`
          }
        )
      message.channel.send({ embeds: [reasonTackleEmbed] })
    }
  }

}
