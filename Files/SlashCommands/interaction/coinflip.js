const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'coinflip',
  description: 'flips a coin to solve arguments',
  execute(cmd){

let replies = ["Heads" , "Tails"];

let result = Math.floor((Math.random() * replies.length))


let ballembed = new EmbedBuilder()
.setColor(randomColor)
.setTitle("Heads? or Tails?")
.setDescription(replies[result])
.setTimestamp()

cmd.reply({ embeds: [ballembed] })

  }
}
