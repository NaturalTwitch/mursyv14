const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ping",
  execute: (cmd) => {
    const pingEmbed = new MessageEmbed()
    .setColor("RED")
    .setTitle('Pong!')
    .setDescription(`🏓**${Math.round(cmd.client.ws.ping)}ms**`)
      cmd.reply({embeds: [pingEmbed] ,
      ephemeral: false})
  }
}
