const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
  name: 'kiss',
  description: 'kiss another user',
  async execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first();


    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);
    const response = await fetch(
      `https://api.waifu.pics/sfw/kiss`, {
      method: "GET",
    }
    );

    response.json()
      .then(data => {
        const imageUrl = data.url;
        if (message.author.id === '733941500253306911') {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let kissEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Kissed **${mention}**`)
          message.channel.send({ embeds: [kissEmbed] })

          return;
        }

        if (user.id === message.author.id) {
          let lonelyEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .addFields(
              {
                name: `**${member}** Kissed themselves`,
                value: `How lonely must one be to do that!`
              }
            )

          message.channel.send({ embeds: [lonelyEmbed] });

        } else if (!reason) {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let kissEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Kissed **${mention}**`)
          message.channel.send({ embeds: [kissEmbed] })


        } else {
          let mention = message.mentions.users.first().username;
          //with args[0]
          let reasonKissEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .setTitle(`**${member}** Kissed **${mention}**`)
            .addFields(
              {
                name: "Reason:",
                value: `${reason}`
              }
            )
          message.channel.send({ embeds: [reasonKissEmbed] })
        }

      })
  }

}
