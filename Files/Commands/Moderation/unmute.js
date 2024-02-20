const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'unmute',
  description: "unmutes people in your server",
  async execute(client, message, cmd, args, Discord){
    const member = message.mentions.users.first();
    let server = message.guild.name;
    let author = message.author.username;

    let modlog = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${modlog}`));

    const user = message.mentions.members.first();
    if(message.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
    if(message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)){
      const target = message.mentions.users.first();

      if(!target){
        const mentionEmbed = new EmbedBuilder()
          .setColor('#ffff00')
          .setDescription(`Please remember to mention the user **(User Mention eg. <@643945264868098049>)**`)
        message.channel.send({ embeds: [mentionEmbed] });


      } else if(user.isCommunicationDisabled() === false){

        const nonMutedEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Unmute Failed 📢')
          .setDescription(`Sorry **${message.author.username}**, I cannot unmute those who are not muted`)
          .setTimestamp()
        message.channel.send({embeds: [nonMutedEmbed]})


      } else if(target){

        let mention = message.mentions.users.first().username;
        let memberTarget = message.guild.members.cache.get(target.id);

          user.timeout(null)
          //memberTarget.roles.add(mainRole.id);
          const unmuteEmbed = new EmbedBuilder()
          	.setColor('#00ff00')
            .setTitle('Unmute 📢')
            .setThumbnail(message.mentions.users.first().displayAvatarURL())
          	.setDescription(`<@${memberTarget.user.id}> has been unmuted.`)
            .setFooter({
              text: `Unmuted By ${author}`
            })
            .setTimestamp()

          const unmuteDmEmbed = new EmbedBuilder()
          .setColor('#00ff00')
          .setThumbnail(`${message.guild.iconURL()}`)
          .setTitle(`You were unmuted in **${server}**!`)
          .setDescription(`**${mention}** Please Try To Follow the Rules.`)

          user.send({ embeds: [unmuteDmEmbed] });
        if(!channel){
          message.channel.send({ embeds: [unmuteEmbed] });
          message.delete();
        } else {
          message.channel.send(`<@${memberTarget.user.id}> Has Been Unmuted`)
          channel.send({ embeds: [unmuteEmbed] });
          message.delete()
        }

      }
      } else {
      const accessEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription(`You Don't Have Enough Permissions To Execute This Command!`)
      message.channel.send({ embeds: [accessEmbed] });

        }
      } else{
        const permissionEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setDescription("I Don't Have Enough Permissions To Execute This Command! `TIMEOUT MEMBERS`")
      message.channel.send({embeds: [permissionEmbed] })
    }
  }
}

async function getCustomChannel(message, client){
  const response = await client.db.query(`select channel_id from modlogs where guild_id = $1`, [message.guild.id])
  if(response && response.rowCount) return response.rows[0].channel_id
  return null;
}
