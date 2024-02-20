require('dotenv').config();
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js')
const stp = require('../Modules/stp.js')
const errorLog = require('../Modules/errorlog.js');

module.exports = {
  async execute(member) {
    const client = member.client;


    const welcomeChannel = await getWelcomeChannel(member, client);
    const welcomeMessage = await getWelcomeMessage(member, client);
    const channel = member.guild.channels.cache.find((x) => (x.id === `${welcomeChannel}`));

    const welcomeEmbedNoMessage = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`Welcome👋`)
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setDescription(`<@${member.user.id}> thanks for joining **${member.guild.name}**`)
      .addFields({ name: `Member Count`, value: `${member.guild.memberCount}`, inline: false })
      .setTimestamp()

    if (!channel) {
      return
    } else {
      if (welcomeMessage) {
        const welcomeEmbedWithMessage = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle(`Welcome👋`)
          .setThumbnail(`${member.user.displayAvatarURL()}`)
          .setDescription(stp(welcomeMessage, { member }))
          .addFields({ name: `Member Count`, value: `${member.guild.memberCount}`, inline: false })
          .setTimestamp()

          channel.send({ embeds: [welcomeEmbedWithMessage]})
      } else {
        channel.send({ embeds: [welcomeEmbedNoMessage] })
      }
    }

    //Crystal Raven
    if(member.guild.id === '1091901052141453372') {
      const baby = member.guild.roles.cache.find((role) => {
        return role.id === '1149026277395812403';
      });
      try {
        member.roles.add(baby)
      } catch (e) {
        errorLog(e)
      }
    }

    // True Anarchy
    if(member.guild.id === '1150096918165323948') {
      const baby = member.guild.roles.cache.find((role) => {
        return role.id === '1150098276784291910';
      });
      try {
        member.roles.add(baby)
      } catch (e) {
        errorLog(e)
      }
    }

    //Mursy's Server
    if (member.guild.id === '882449110806982667') {
      const welcomeRole = member.guild.roles.cache.find((role) => {
        return role.name === 'Members'
      })
      try {
        console.log('[Mursy] The Role was added')
        member.roles.add(welcomeRole)

        //Partner Embed
        //   const partner = new EmbedBuilder()
        //     .setColor('#00ff00')
        //     .setTitle(`Mursy's Partnerships`)
        //     .setDescription(`Welcome to Mursy's Community || Feel free to check out some of our sponsored servers`)
        //     .addField("Empty", "Empty")

        //   member.send({ embeds: [partner] })
      } catch (err) {
        console.log(err)
        errorLog(err)
      }
    }
  }
}

async function getWelcomeChannel(member, client) {
  const response = await client.db.query(`select channel_id from welcome where guild_id = $1`, [member.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}

async function getWelcomeMessage(member, client) {
  const response = await client.db.query(`select welcome_message from welcome where guild_id = $1`, [member.guild.id])
  if (response && response.rowCount) return response.rows[0].welcome_message
  return null;
}
