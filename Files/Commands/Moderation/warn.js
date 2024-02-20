const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'warn',
  description: 'gives members a warning',
  async execute(client, message, cmd, args, Discord) {
    const member = message.mentions.members.first();
    //  let warnFirst = Number(1)
    let reason = args.join(" ").slice(22);
    if (!reason) reason = "No reason provided";
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      message.channel.send(`Sorry <@${message.author.id}>, But you don't have enough Permission to do this! \`Mute Members\``)
      return
    }


    if (member) {
      await client.db.query(`insert into warn (guild_id, user_id, warn_amount, guild_name, user_name) values ($1, $2, 1, $3, $4) on conflict (guild_id, user_id) do update set warn_amount = warn.warn_amount + 1`, [message.guild.id, member.user.id, message.guild.name, member.user.username])

      let modlog = await getCustomChannel(message, client)
      let channel = message.guild.channels.cache.find((x) => (x.id === `${modlog}`));


      const warnAmount = await getWarnAmount(message, client, member)
      let warnEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Warn')
        .setDescription(`${member} Has Been Warned`)
        .setThumbnail(`${member.displayAvatarURL()}`)
        .addFields(
          {
            name: 'Warn Amount:', value: `${warnAmount}`, inline: false
          },
          {
            name: 'Reason:', value: `${reason}`, inline: false
          }
        )


      let dmWarnEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle("You've Been Warned")
        .setDescription(`You Received a Warning in ${message.guild.name}`)
        .setThumbnail(`${message.guild.iconURL()}`)
        .addFields(
          {name:'Warn Amount:', value: warnAmount, inline: false},
          {name: 'Reason:', value: reason, inline: false}
          )



      member.send({ embeds: [dmWarnEmbed] })

      if (channel) {
        message.delete(1)
        channel.send({ embeds: [warnEmbed] })
      } else {
        message.delete(1)
        message.channel.send({ embeds: [warnEmbed] })
      }
    } else {
      message.channel.send(`${message.author.username}, Please Make sure to Mention who you want to warn (User Mention eg. <@643945264868098049>)`)
    }

  }
}

async function getWarnAmount(message, client, member) {
  const response = await client.db.query(`select warn_amount from warn where guild_id = $1 and user_id = $2`, [message.guild.id, member.user.id])
  if (response && response.rowCount) return response.rows[0].warn_amount
  return null;
}

async function getCustomChannel(message, client) {
  const response = await client.db.query(`select channel_id from modlogs where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}
