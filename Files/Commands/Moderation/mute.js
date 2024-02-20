const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const ms = require('ms');

module.exports = {
  name: 'mute',
  description: "mutes people in your server",
  async execute(client, message, cmd, args, Discord) {
    const member = message.mentions.users.first();
    const user = message.mentions.members.first();
    let admin = message.author.username;
    let server = message.guild.name;

    let modlog = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${modlog}`));

    //reasons
    let reason = args.slice(2).join(" ");
    if (!reason) reason = "No reason provided";

    let timeoutReason = `Muted by ${message.author.tag} for ${reason}`

    const target = message.mentions.members.first();

    if (message.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      if (message.member.permissions.has(PermissionsBitField.Flags.MuteMembers) || message.author.id === '513413045251342336') {
        if (!user) {
          const mentionEmbed = new EmbedBuilder()
            .setColor('#ffff00')
            .setDescription(`Please remember to mention the user **(User Mention eg. <@643945264868098049>)**`)
          message.channel.send({ embeds: [mentionEmbed] });
          return
        }
        if (user.id === client.user.id) return message.channel.send(`Sorry I cannot mute myself`)
        if (user.id === message.author.id) return message.channel.send(`Sorry **${admin}**, You Cannot Mute Yourself`)

        if (target.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('Sorry I cannot `Timeout` Members with Adminstrator Permissions')
        if (target.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send('Sorry I cannot `Timeout` Members with Manage Server Permissions')


        if (user.roles.cache.some(role => ['Administrator', 'Admin', 'Moderator', 'Mod', 'Owner', 'Leader'].includes(role.name))) {
          message.channel.send("Sorry I cannot `Timeout` Admins/Mods")

          //if user is already muted
        } else if (user.isCommunicationDisabled() === true) {
          const isMutedEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Mute Failed 🔇')
            .setDescription(`Sorry **${message.author.username}**, I cannot mute those who are muted`)
            .setTimestamp()
          message.channel.send({ embeds: [isMutedEmbed] })

          //if there's no time send this
        } else if (!args[1]) {
          const warnEmbed = new EmbedBuilder()
            .setColor('#ffff00')
            .setDescription("Make sure to add a timelimit **(30m - 1h - 7d)**")
          message.channel.send({ embeds: [warnEmbed] });

          //mute the target
        } else if (target) {
          let time = ms(args[1])
          let memberTarget = message.guild.members.cache.get(target.id);
          let memberTargetId = memberTarget.user.id


          memberTarget.timeout(time, timeoutReason)

          const muteEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`Mute 🔇`)
            .setThumbnail(`${message.mentions.users.first().displayAvatarURL()}`)
            .setDescription(`Timeout added to <@${memberTarget.user.id}>`)

            .addFields(
              { name: 'Duration', value: `${ms(ms(args[1]))}`, inline: false },
              { name: 'Reason:', value: `${reason}`, inline: false })
            .setFooter({ text: `Muted by ${admin}` })
            .setTimestamp()

          const muteDmEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setThumbnail(`${message.guild.iconURL()}`)
            .setTitle(`You've received a timeout in **${server}**!`)

            .addFields(
              {
                name: 'Reason',
                value: `${reason}`
              },
              {
                name: 'Duration',
                value:
                  `${ms(ms(args[1]))}`
              }
            )

            .setFooter({ text: `You were muted by ${admin}` })
            .setTimestamp()

          const autoUnmuteEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('Automatic Unmute 📢')
            .setThumbnail(`${message.mentions.users.first().displayAvatarURL()}`)
            .setDescription(`<@${memberTarget.user.id}> Has Been Automatically unmuted`)
            .setTimestamp(Date.now() + ms(args[1]))

          user.send({ embeds: [muteDmEmbed] });
          if (!channel) {
            message.channel.send({ embeds: [muteEmbed] });
            message.delete()
          } else {
            message.channel.send(`<@${memberTarget.user.id}> Has Been Muted`)
            channel.send({ embeds: [muteEmbed] });
            message.delete()
            setTimeout(function () {

              channel.send({ embeds: [autoUnmuteEmbed] })

            }, ms(args[1]))
          }

        }
      } else {
        const accessEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setDescription("You Don't Have Enough Permissions To Execute This Command! `MUTE MEMBERS`")

        message.channel.send({ embeds: [accessEmbed] });

      }
    } else {
      const permissionEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription("I Don't Have Enough Permissions To Execute This Command! `TIMEOUT MEMBERS`")
      message.channel.send({ embeds: [permissionEmbed] })
    }
  }
}

async function getCustomChannel(message, client) {
  const response = await client.db.query(`select channel_id from modlogs where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}

/*
  🎒 Mursy | Norm Development 🧪
  🎨 @NaturalTwitch#8920 🔍
  🎋 Unauthorized Duplication is Prohibited 🥏
*/