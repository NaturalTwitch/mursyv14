const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'slap',
  description: 'slap another user',
  async execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let user = message.mentions.users.first();
    let member = message.author.username;


    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);

    const response = await fetch(
      `https://api.waifu.pics/sfw/slap`, {
      method: "GET",
    }
    );

    response.json()
      .then(data => {
        const imageUrl = data.url;
        if (!reason) {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let slapEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Slapped **${mention}**`)
          message.channel.send({ embeds: [slapEmbed] })

        } else {
          let mention = message.mentions.users.first().username;
          //with args[0]
          let reasonSlapEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .setTitle(`**${member}** Slapped **${mention}**`)
            .addFields(
              {
                name: "Reason:",
                value: `${reason}`
              }
            )
          message.channel.send({ embeds: [reasonSlapEmbed] })
        }

      })
  }


}
