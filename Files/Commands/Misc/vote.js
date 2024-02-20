const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports ={
  name: 'upvote',
  aliases: ['vote'],
   description: "generates memes",
  execute(client, message, cmd, args, Discord){
    let inviteEmbed = new EmbedBuilder()
    .setColor("RED")
    .setAuthor('Mursy on Top.gg','https://avatars.githubusercontent.com/u/34552786?s=280&v=4')
    .setTitle("Mursy Discord Bot | Top.gg")
    .setURL(`https://top.gg/bot/882458361663213599`)
    .setDescription("Administration Bot and Fun Bot")
    .setImage('https://cdn.discordapp.com/icons/882449110806982667/fb6c632aa85a19f2cfb848aabecd0d95.webp')

    message.channel.bulkDelete(1);
    message.channel.send(`<@${message.author.id}>, The Upvote link has been sent to your DM's`);
    setTimeout(function(){
      message.channel.bulkDelete(1);
    }, 5000);
    message.author.send({content: `**${message.author.username}**, Thanks For Your Consideration `, embeds: [inviteEmbed] });

  }
}
