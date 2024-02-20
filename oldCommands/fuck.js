const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'fuck',
  aliases: ['sex'],
  description: 'fuck another user',
  execute(client, message, cmd, args, Discord){
  let reason = args.join(" ").slice(22);
    let member = message.author.username;
    let user = message.mentions.users.first();



if(message.guild.id === '906660147395432488' || message.author.id === '702171083448647730'){
//savanna's server "nsfw feature" her word's
message.reply(`Sorry **${message.author.username}**, But this command has been turned off for you.`)

} else {

  if(!user) return message.channel.send(`**${member}**, Please Mention a User!`);

  let fuck = [
    "https://c.tenor.com/6jRTU4uo7LgAAAAC/kiss-anime.gif",
    "https://c.tenor.com/V0nBQduEYb8AAAAC/anime-kiss-making-out.gif",
    "https://64.media.tumblr.com/9542f21e7a0e361f28eb42d38d6b5449/tumblr_onc292wBcZ1vhnny1o1_500.gifv",
    "https://animemotivation.com/wp-content/uploads/2021/04/sao-asuna-and-kirito-scene-gif.gif",
    "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-27.gif"

  ]


  let gif = Math.floor((Math.random() * fuck.length))

if (user.id === '882458361663213599' || user.id === '896851658464722995'){
  let getFuckedEmbed = new MessageEmbed()
  .setColor("GREEN")
  .setThumbnail(fuck[gif])
  .setDescription(`You can't do that to me...\n**${user.username}** Fucked **${member}**`)
  message.channel.send({ embeds: [getFuckedEmbed] });
  return
}

if (!reason){

        let mention = message.mentions.users.first().username;
      //without args[0]
          let fuckEmbed = new MessageEmbed()
          .setColor("GREEN")
          .setThumbnail(fuck[gif])
          .setDescription(`**${member}** Fucked **${mention}**`)
        message.channel.send({ embeds: [fuckEmbed] })


  } else {
      let mention = message.mentions.users.first().username;
      //with args[0]
          let reasonFuckEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(fuck[gif])
          .setTitle(`**${member}** Fucked **${mention}**`)
          .addField("Reason:", `${reason}`)
      message.channel.send({ embeds: [reasonFuckEmbed] })
    }
  }

}
}
