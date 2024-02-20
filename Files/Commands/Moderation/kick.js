const { Discord, EmbedBuilder, PermissionsBitField } = require("discord.js")
module.exports = {
  name: 'kick',
  description: "kicks user from guild",
  async execute(client, message, cmd, args, Discord) {
    const member = message.mentions.users.first();
    const user = message.mentions.members.first();
    let server = message.guild.name;
    let admin = message.author.username;
    let reason = args.join(" ").slice(22);
    if (!reason) reason = "No reason provided";

    let modlog = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${modlog}`));


    let kickReason = `Kicked by ${message.author.tag} for ${reason}`


    const embed = new EmbedBuilder()
      .setDescription("Please remember to mention the user **(User Mention eg. <@643945264868098049>)**")
      .setColor("#ffff00")

    const embed1 = new EmbedBuilder()
      .setDescription("You dont have enough permissions to execute this command!")
      .setColor("#ff0000")

    const embed2 = new EmbedBuilder()
      .setDescription("`You Cannot Kick an Admin`")
      .setColor("#ff0000")

    const embed3 = new EmbedBuilder()

      .setTitle(`You have been kicked from ${server}!`)
      .setThumbnail(`${message.guild.iconURL()}`)
      .addFields({name: 'Reason:', value: `${reason}`})
      .setFooter({ text: `you were kicked by ${admin}` })
      .setTimestamp()
      .setColor('#ff0000')

    const embed5 = new EmbedBuilder()
      .setDescription(`**${admin}**, You Cannot Kick Yourself`)

    const embed6 = new EmbedBuilder()
      .setDescription(`Sorry **${admin}**, I Cannot Kick Myself`)

    const embed7 = new EmbedBuilder()
      .setDescription(`Sorry **${admin}**, I Cannot Kick Admins/Mod Roles`)


    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send({ embeds: [embed1] })
    if (!message.mentions.users.first()) return message.channel.send({ embeds: [embed] })

    if (message.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      if (user.id === '882458361663213599' || user.id === '896851658464722995') {
        message.channel.send({ embeds: [embed6] })
      } else if (user.id === message.author.id) {
        message.channel.send({ embeds: [embed5] })
      } else if (user.roles.cache.some(role => ['Administrator', 'Admin', 'Moderator', 'Mod', 'Owner'].includes(role.name))) {
        message.channel.send({ embeds: [embed7] })
      } else {


        if (!user.kickable) return message.channel.send({ embeds: [embed2] })
        const memberTarget = message.guild.members.cache.get(member.id)
        if (!!message.mentions.users.first() && message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id === '513413045251342336') {

          const embed4 = new EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(message.mentions.users.first().displayAvatarURL())
            .setDescription(`<@${memberTarget.user.id}> has been kicked!`)
            .addFields({name: 'Reason', value: `${reason}`})
            .setFooter({ text: `Kicked by ${admin}` })
            .setTimestamp()


          user.send({ embeds: [embed3] })
          setTimeout(function () {
            user.kick(kickReason).catch(err => console.log(err)).then(() => {
              if (!channel) {
                return message.channel.send({ embeds: [embed4] });
                message.channel.bulkDelete(1);
              } else {
                message.channel.send(`<@${memberTarget.user.id}> Has Been Kicked`)
                channel.send({ embeds: [embed4] });
                message.channel.bulkDelete(1);
              }
            });


          }, 200)
        }
      }
    } else {
      const permissionEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription("I Don't Have Enough Permissions To Execute This Command! `KICK_MEMBERS`")
      message.channel.send({ embeds: [permissionEmbed] })
    }
  }
}


// Grab channel_id from database
async function getCustomChannel(message, client) {
  const response = await client.db.query(`select channel_id from modlogs where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].channel_id
  return null;
}
