const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'stab',
  description: 'stab another user',
  execute(client, message, cmd, args, Discord){
    let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first()

    


    if(!user) return message.channel.send(`**${member}**, Please Mention a User!`);


    let stab = [
      "https://i.kym-cdn.com/photos/images/original/001/922/883/930.gif",
      "https://i.pinimg.com/originals/e1/d6/41/e1d64140faed4d1388306df75ff8fa8c.gif",
      "https://i.imgur.com/GOeARov.gif",
      "https://i.gifer.com/IlQa.gif",
      "https://c.tenor.com/aG5D5i9GLVsAAAAC/sword-stabbed.gif",
      "https://i.gifer.com/PWj6.gif"

    ]


    let image = Math.floor((Math.random() * stab.length))





    if (!reason){
    let mention = message.mentions.users.first().username;
    //without args[0]
      let stabEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setThumbnail(stab[image])
      .setDescription(`**${member}** Stabbed **${mention}**`)
    message.channel.send({ embeds: [stabEmbed] })

    } else {
    let mention = message.mentions.users.first().username;
    //with args[0]
      let reasonStabEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(stab[image])
      .setTitle(`**${member}** Stabbed **${mention}**`)
      .addField("Reason:", `${reason}`)
    message.channel.send({ embeds: [reasonStabEmbed] })
    }


  }
}
