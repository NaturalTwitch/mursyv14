const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'pat',
  description: 'pat another user',
  async execute(client, message, cmd, args, Discord) {
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`**${member}**, Please Mention a User!`);

    const response = await fetch(
      `https://api.waifu.pics/sfw/pat`, {
      method: "GET",
    }
    );

    response.json()
      .then(data => {
        const imageUrl = data.url;

        if (!reason) {
          let mention = message.mentions.users.first().username;
          //without args[0]
          let patEmbed = new EmbedBuilder()
            .setColor("#00ff00")
            .setThumbnail(imageUrl)
            .setDescription(`**${member}** Patted **${mention}**`)
          message.channel.send({ embeds: [patEmbed] })


        } else {
          let mention = message.mentions.users.first().username;
          //with args[0]
          let reasonPatEmbed = new EmbedBuilder()
            .setColor(randomColor)
            .setThumbnail(imageUrl)
            .setTitle(`**${member}** Patted **${mention}**`)
            .addFields(
              {
                name: "Reason:",
                value: `${reason}`
              }
            )
          message.channel.send({ embeds: [reasonPatEmbed] })
        }

      })
  }

}
