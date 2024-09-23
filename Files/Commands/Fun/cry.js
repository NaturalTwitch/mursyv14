const { EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "cry",
  async execute(client, message, cmd, args, Discord) {
    const response = await fetch(
        `https://api.waifu.pics/sfw/cry`, {
        method: "GET",
      }
      );
      
      response.json()
      .then(data => {
        const imageUrl = data.url;
    
    const cryEmbed = new EmbedBuilder()
    .setColor(randomColor)
    .setImage(imageUrl)
    .setDescription(`${message.author} is crying no reason!`)


    message.channel.send({ embeds: [cryEmbed] })
      })
  },
};
