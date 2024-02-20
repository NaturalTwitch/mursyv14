const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'coinflip',
  aliases: ['cf'],
  description: 'flips a coin to solve arguments',
  execute(client, message, cmd, args, Discord) {

    let fullEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setDescription("Please ask a full question!")



    let replies = ["Heads", "Tails"];

    let result = Math.floor((Math.random() * replies.length))


    let ballembed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Heads? or Tails?")
      .setDescription(replies[result])
      .setTimestamp()

    message.channel.send({ embeds: [ballembed] })

  }



}
