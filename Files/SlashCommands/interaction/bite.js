const { EmbedBuilder } = require('discord.js')


module.exports = {
  name: 'bite',
  description: 'bite another user',
  execute(cmd){
    let member = cmd.user.username;
    let user = cmd.options.getUser('user');

    if(!user) return message.channel.send(`**${member}**, Please Mention a User!`);


    let eat = [
      "https://c.tenor.com/FVqibRmEe-4AAAAC/neck-bite-anime.gif",
      "https://c.tenor.com/w4T323o46uYAAAAC/anime-bite.gif",
      "https://i.pinimg.com/originals/95/9e/4c/959e4c3712933367c0a553d7a124c925.gif",
      "https://i.kym-cdn.com/photos/images/newsfeed/001/027/044/1cd.gif"
    ]


    let image = Math.floor((Math.random() * eat.length))

          let eatEmbed = new EmbedBuilder()
          .setColor(randomColor)
          .setImage(eat[image])
          .setTitle(`**${member}** Bit **${user.username}**`)
        cmd.reply({ embeds: [eatEmbed] })

  }
}
