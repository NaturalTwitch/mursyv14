const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'repeat',
  aliases: ['say'],
  description: 'repeats what is said',
  execute(client, message, cmd, args, Discord){
    let messageRepeat = args.join(" ");
    if(message.author.id !== '513413045251342336') return
    if(!messageRepeat) return message.channel.send(`<@${message.author.id}>, Please add what you want me to say`)

    message.delete(1)
    message.channel.send(`${messageRepeat}`)
  }
}
