const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  name: 'cuddle',
  description: 'cuddle another user',
  async execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first();


    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);

    const response = await fetch(
      `https://api.waifu.pics/sfw/cuddle`, {
      method: "GET",
    }
    );

    response.json()
      .then(data => {
        const imageUrl = data.url;
        if (user.id === message.author.id) {
          let lonelyEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .addField(`**${member}** cuddled themselves`, `How lonely must one be to do that!`)

          message.channel.send({ embeds: [lonelyEmbed] });

        } else if (!reason) {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let cuddleEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Cuddled **${mention}**`)
          message.channel.send({ embeds: [cuddleEmbed] })


        } else {
          let mention = message.mentions.users.first().username;
          //with args[0]
          let reasonCuddleEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .setTitle(`**${member}** Cuddled **${mention}**`)
            .addField("Reason:", `${reason}`)
          message.channel.send({ embeds: [reasonCuddleEmbed] })
        }
      })

  }

}
