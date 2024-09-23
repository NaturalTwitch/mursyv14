const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "minecraftskinviewer",
  description: "View a Minecraft player's Skin",
  async execute(cmd) {

    const mcUsername = cmd.options.getString("username");

    const mcSkinEmbed = new EmbedBuilder()
    .setTitle(`${mcUsername}'s Minecraft Skin`)
    .setImage(`https://mc-heads.net/body/${mcUsername}`)

    cmd.reply({ embeds: [mcSkinEmbed] })

  },
};
