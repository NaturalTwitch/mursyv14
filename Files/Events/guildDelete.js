const { EmbedBuilder } = require("discord.js");
const errorLog = require('../Modules/errorlog.js');

module.exports = {
  execute(guild) {
    if (!guild?.name || String(guild?.name) === "undefined") return;

    try {
      console.log(`[Mursy] Server Removed | ${guild.name}`);

      const leaveEmbed = new EmbedBuilder()
        .setDescription(`**Mursy** has left a server`)
        .setColor("#ff0000")
        .setThumbnail(guild.iconURL())
        .addFields(
          { name: "Server Name:", value: `${guild.name}`, inline: true },
          { name: "Server ID:", value: `${guild.id}`, inline: true }
        )
        .setFooter({
          text: ` Mursy is now on ${guild.client.guilds.cache.size} servers`,
        });

      guild.client.channels.cache
        .get("936460712182685718")
        .send({ embeds: [leaveEmbed] });
    } catch (err) {
      console.err();
      errorLog(err)
    }
  },
};
