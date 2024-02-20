const { EmbedBuilder } = require('discord.js');
const canvacord = require('canvacord');
const { time } = require('console');

module.exports = {
  name: 'test',
  description: 'Test Commands',
  async execute(client, message, cmd, args, Discord) {

    const cetDate = new Date('2024-01-01T11:00:00Z');
    const targetDay = new Date(cetDate.toLocaleString("en-US", {timeZone: "America/New_York"}));


   // message.channel.send(`${targetDay}`)

    const timeDiff = targetDay.getTime() - Date.now();

    // message.channel.send(`${timeDiff}`)

      const newYears = new EmbedBuilder()
      .setColor('#f1bc27')
      .setTitle('<:Fire_Work_Blue:1189627309381124156> HAPPY NEW YEARS <:Firework_Red:1189627289768558683>')
      .setDescription(`On behalf of the Mursy team, We wish you a very Happy New Years.\n 
      We Hope you Enjoy 2024, with the new year there are going to be alot more commands showing up.
      `)
      .setThumbnail('https://cdn.mursybot.com/users/513413045251342336/AI/Gvl5tO6Fa7Z4A.png')
      .setFooter({ text: 'Thanks you for Choosing Mursy'})


      setTimeout(() => {
        message.channel.send({ embeds : [newYears]})
      }, timeDiff)
      
    

  }
}
