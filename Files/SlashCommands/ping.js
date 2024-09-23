const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "ping",
  execute: (cmd) => {
    const pingEmbed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle('Pong!')
    .setDescription(`🏓**${Math.round(cmd.client.ws.ping)}ms**`)
      cmd.reply({embeds: [pingEmbed] ,
      ephemeral: false})
  }
}
