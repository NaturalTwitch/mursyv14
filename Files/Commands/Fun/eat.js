const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch');


module.exports = {
  name: 'eat',
  aliases: ['nom', 'bite', 'chomp'],
  description: 'kill another user',
  async execute(client, message, cmd, args, Discord) {
    let member = message.author.username;
    let reason = args.join(" ").slice(22);
    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);
    const response = await fetch(
      `https://api.waifu.pics/sfw/nom`, {
      method: "GET",
    }
    );

    response.json()
      .then(data => {
        const imageUrl = data.url;

        if (!reason) {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let eatEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Bit **${mention}**`)
          message.channel.send({ embeds: [eatEmbed] })

        } else {
          let mention = message.mentions.users.first().username;
          //with args[0]
          let reasonEatEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .setTitle(`**${member}** Bit **${mention}**`)
            .addFields(
              {
                name: "Reason:",
                value: `${reason}`
              }
            )
          message.channel.send({ embeds: [reasonEatEmbed] })
        }

      })
  }
}
