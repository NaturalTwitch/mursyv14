const { EmbedBuilder } = require('discord.js')

module.exports = {
  execute(guild) {

    console.log(`[Mursy] New Server Joined | ${guild.name}`)


    const joinEmbed = new EmbedBuilder()
      .setDescription(`**Mursy** Has Joined a New Server`)
      .setColor('#00ff00')
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: 'Server Name:', value: `${guild.name}`, inline: true },
        { name: 'Server ID:', value: `${guild.id}`, inline: true },
        { name: 'Member Count:', value: `${guild.memberCount}`, inline: false }
      )
      .setFooter({ text: ` Mursy is now on ${guild.client.guilds.cache.size} servers` })


    guild.client.channels.cache.get('936460712182685718').send({ embeds: [joinEmbed] })

  }
}
