const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'invite',
  description: "Invites The Bot to your server",
  execute(client, message, cmd, args, Discord){
    let inviteEmbed = new EmbedBuilder()
    .setColor("RED")
    .setDescription("[Click here](https://discord.com/oauth2/authorize?client_id=882458361663213599&scope=bot&permissions=1357553069303) to invite this bot to your server")
    message.channel.send({ embeds: [inviteEmbed] });
  }
}
