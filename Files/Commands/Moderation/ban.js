const { Discord, EmbedBuilder, BitField, PermissionsBitField, Permissions } = require("discord.js")
const errorLog = require('../../Modules/errorlog.js');

module.exports = {
  name: 'ban',
  description: "bans user from guild",
  async execute(client, message, cmd, args, Discord) {
    const member = message.mentions.users.first();
    const user = message.mentions.members.first();
    let admin = message.author.username;
    let server = message.guild.name;

    let reason = args.join(" ").slice(22);
    if (!reason) reason = "No reason provided";

    let modlog = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${modlog}`));

    let banReason = `Kicked by ${message.author.tag} for ${reason}`

    const embed = new EmbedBuilder()
      .setDescription("Please remember to mention the user **(User Mention eg. <@643945264868098049>)**")
      .setColor("#ffff00")

    const embed1 = new EmbedBuilder()
      .setDescription("You dont have enough permissions to execute this command!")
      .setColor("#ff0000")

    const embed2 = new EmbedBuilder()
      .setDescription("`Sorry But this User is not Bannable`")
      .setColor("#ff0000")


    const embed4 = new EmbedBuilder()

      .setTitle(`You have been banned from ${server}!`)
      .setThumbnail(`${message.guild.iconURL()}`)
      .addFields(
        {
          name: 'Reason:',
          value: `${reason}`
        })
      .setFooter({
        text: `you were banned by ${admin}`
      })
      .setTimestamp()
      .setColor('#ff0000')

    const embed5 = new EmbedBuilder()

      .setDescription(`**${admin}**, You Cannot Ban Yourself`)

    const embed6 = new EmbedBuilder()
      .setDescription(`Sorry **${admin}**, I Cannot Ban Myself`)

    const embed7 = new EmbedBuilder()
      .setDescription(`Sorry **${admin}**, I Cannot Ban Admins/Mod Roles`)


    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send({ embeds: [embed1] })
    if (!message.mentions.users.first()) return message.channel.send({ embeds: [embed] })

    //if Mursy has Ban Member Permission
    console.log(message.guild.members.me)
    if (message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {

      if (user.id === '882458361663213599' || user.id === '896851658464722995') {
        message.channel.send({ embeds: [embed6] })
      } else if (user.id === message.author.id) {
        message.channel.send({ embeds: [embed5] })
      } else if (user.roles.cache.some(role => ['Administrator', 'Admin', 'Moderator', 'Mod', 'Owner'].includes(role.name))) {
        message.channel.send({ embeds: [embed7] })
      } else {


        if (!user.kickable) return message.channel.send({ embeds: [embed2] })

        if (!!message.mentions.users.first() && message.member.permissions.has('BAN_MEMBERS')) {

          const memberTarget = message.guild.members.cache.get(member.id)
          const embed3 = new EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(message.mentions.users.first().displayAvatarURL())
            .setDescription(`<@${memberTarget.user.id}> has been banned!`)
            .addFields({ name: 'Reason', value: `${reason}` })
            .setFooter({
              text: `Banned by ${admin}`
            })
            .setTimestamp()

          user.send({ embeds: [embed4] })
          setTimeout(function () {
            user.ban({ reason: banReason }).catch(err => console.log(err)).then(() => {
              if (!channel) {
                message.channel.send({ embeds: [embed3] })
                message.delete();
              } else {
                message.channel.send(`<@${memberTarget.user.id}> Has Been Banned`)
                channel.send({ embeds: [embed3] })
                message.delete()
              }
            });
          }, 200)
        }
      }
    } else {
      const permissionEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription("I Don't Have Enough Permissions To Execute This Command! `BAN_MEMBERS`")
      message.channel.send({ embeds: [permissionEmbed] })
    }
  }
}

async function getCustomChannel(message, client) {
  const response = await client.db.query(`select channel_id from modlogs where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}
