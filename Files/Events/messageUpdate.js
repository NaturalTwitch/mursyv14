const { EmbedBuilder } = require('discord.js')
const currentDate = new Date()
const errorLog = require('../Modules/errorlog.js');

module.exports = {
  async execute(oldMessage, newMessage) {
    if (!oldMessage.author) return;

    try {
      if (newMessage.author.bot) {
        return
      }
    } catch (err) {
      console.log(err)
      errorLog(err)
    }


    const client = newMessage.client;

    const customChannel = await getCustomChannel(newMessage, client)
    let channel = newMessage.guild.channels.cache.find((x) => (x.id === `${customChannel}`));

    if (!channel) {
      return;
    }
    console.log(`[${currentDate.toLocaleString()}][Mursy Systems] a message has been edited in ${newMessage.guild.name}....`)

    try {
      let messageDelete = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(`${newMessage.author.displayAvatarURL()}`)
        .setDescription(`<@${newMessage.author.id}> edited a message in <#${newMessage.channel.id}>`)
        .addFields(
          { name: 'Old Message:', value: `${oldMessage}`, inline: false },
          { name: 'New Message:', value: `${newMessage}`, inline: false }
        )
        .setTimestamp()

      channel.send({ embeds: [messageDelete] })
    } catch (err) {
      return
    }
  }
}

async function getCustomChannel(newMessage, client) {
  const response = await client.db.query(`select channel_id from messagelog where guild_id = $1`, [newMessage.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}
