require('dotenv').config();
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js')
const stp = require('../Modules/stp.js')
const errorLog = require('../Modules/errorlog.js');

module.exports = {
  async execute(member) {
    const client = member.client;


    const welcomeChannel = await getWelcomeChannel(member, client);
    const leaveMessage = await getLeaveMessage(member, client);
    const channel = member.guild.channels.cache.find((x) => (x.id === `${welcomeChannel}`));

    const goodbyeEmbedNoMessage = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle(`Goodbye👋`)
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setDescription(`<@${member.user.id}> has left the server`)
      .addFields({ name: `Member Count`, value: `${member.guild.memberCount}`, inline: false })
      .setTimestamp()

    if (!channel) {
      return
    } else {
      if (leaveMessage) {
        const goodbyeEmbedWithMessage = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle(`Goodbye👋`)
          .setThumbnail(`${member.user.displayAvatarURL()}`)
          .setDescription(stp(leaveMessage, { member }))
          .addFields({ name: `Member Count`, value: `${member.guild.memberCount}`, inline: false })
          .setTimestamp()

        channel.send({ embeds: [goodbyeEmbedWithMessage] })

      } else {
        channel.send({ embeds: [goodbyeEmbedNoMessage] })
      }
    }
  }
}

async function getWelcomeChannel(member, client) {
  const response = await client.db.query(`select channel_id from welcome where guild_id = $1`, [member.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}

async function getLeaveMessage(member, client) {
  const response = await client.db.query(`select leave_message from welcome where guild_id = $1`, [member.guild.id])
  if (response && response.rowCount) return response.rows[0].leave_message
  return null;
}