const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "list",
  description: "list servers the bot is on",
  execute(client, message, cmd, args, Discord) {
    if (message.author.id === "513413045251342336") {
      let clientguilds = client.guilds.cache;
      const serverEmbed = new EmbedBuilder()
        .setColor("BLACK")
        .setTitle(`${message.author.username} Mursy Is Currently on`)
        .setDescription(`${clientguilds.map((g) => `${g.name} `)}`)
        .setFooter({
          text: `Currently ON ${client.guilds.cache.size} servers`,
        });

      message.channel.send({ embeds: [serverEmbed] });
      console.log(clientguilds.map((g) => g.name) || "None");
    } else {
      message.channel.send(
        `Sorry **${message.author.username}** but only the Bot Owner can access this command`
      );
    }
  },
};
