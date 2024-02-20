const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'whois',
  description: 'Displays Information about a user',
  async execute(client, message, cmd, args, Discord){
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);
    let muteRole = message.member.roles.cache.some(role => role.name === 'muted')
    if(!muteRole) muteRole = message.member.roles.cache.some(role => role.name === 'Muted');


    if(member.isCommunicationDisabled() === true){

    }

    const userInfoEmbed = new EmbedBuilder()
    .setColor("#000000")
    .setTitle(`User Info for ${user.username}`)
    .setThumbnail(`${user.displayAvatarURL()}`)
    .addFields(
      { name: 'User Tag:', value: `${user.tag}` },
      { name: 'Online Status:', value: `${member.clientStatus}` },
      { name: 'Nickname:', value: member.nickname || 'N/A' },
      { name: 'Bot:', value: `${user.bot}` , inline: true },
      { name: 'Joined on:', value: new Date(member.joinedTimestamp).toLocaleDateString() , inline: true },
      { name: 'Created on:', value: new Date(user.createdTimestamp).toLocaleDateString() , inline: true },
      { name: 'Bannable:', value: `${member.bannable}` , inline: true },
      { name: 'Highest Role:', value: `${member.roles.highest}`, inline: true },
      { name: 'Muted:', value: `${member.isCommunicationDisabled()}`, inline: true},
 )
//  .setFooter(`Requested by ${message.author.username}`)
 .setTimestamp()


message.channel.send({ embeds: [userInfoEmbed] })

  }
}
