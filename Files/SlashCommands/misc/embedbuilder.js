const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const urlVerifer = require("C:/Users/aweso/Desktop/mursyv14/Files/Modules/urlVerifier.js");

module.exports = {
  name: "embedbuilder",
  description: "Build Custom embeds",
  async execute(cmd) {
    if (!cmd.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return cmd.reply({
        content:
          "You do not have the required permissions to use this command. (Manage Server)",
        ephemeral: true,
      });
    const color = cmd.options.getString("color");
    const title = cmd.options.getString("title");
    const descript = cmd.options.getString("description");
    const foot = cmd.options.getString("footer");
    const image = cmd.options.getString("image");

    let customEmbed = null;
    const eColor = color ? color : "99AAb5";

    if (title && !descript && !foot && !image) {
      customEmbed = new EmbedBuilder().setTitle(title).setColor(`#${eColor}`);
    } else if (!title && descript && !foot && !image) {
      customEmbed = new EmbedBuilder()
        .setDescription(descript)
        .setColor(`#${eColor}`);
    } else if (!title && !descript && foot && !image) {
      customEmbed = new EmbedBuilder()
        .setFooter({ text: foot })
        .setColor(`#${eColor}`);
    } else if (title && descript && !foot && !image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setDescription(descript);
    } else if (title && !descript && foot && !image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setFooter({ text: foot });
    } else if (!title && descript && foot && !image) {
      customEmbed = new EmbedBuilder()
        .setDescription(descript)
        .setColor(`#${eColor}`)
        .setFooter({ text: foot });
    } else if (title && descript && foot && !image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setDescription(descript)
        .setFooter({ text: foot });
    } else if (!title && !descript && !foot && image) {
      customEmbed = new EmbedBuilder().setImage(image);
    } else if (title && !descript && !foot && image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setImage(image);
    } else if (!title && descript && !foot && image) {
      customEmbed = new EmbedBuilder()
        .setDescription(descript)
        .setColor(`#${eColor}`)
        .setImage(image);
    } else if (!title && !descript && foot && image) {
      customEmbed = new EmbedBuilder()
        .setFooter({ text: foot })
        .setColor(`#${eColor}`)
        .setImage(image);
    } else if (title && descript && !foot && image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setDescription(descript)
        .setImage(image);
    } else if (title && !descript && foot && image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setFooter({ text: foot })
        .setImage(image);
    } else if (!title && descript && foot && image) {
      customEmbed = new EmbedBuilder()
        .setDescription(descript)
        .setColor(`#${eColor}`)
        .setFooter({ text: foot })
        .setImage(image);
    } else if (title && descript && foot && image) {
      customEmbed = new EmbedBuilder()
        .setTitle(title)
        .setColor(`#${eColor}`)
        .setDescription(descript)
        .setFooter({ text: foot })
        .setImage(image);
    }

    cmd.reply({ embeds: [customEmbed] });
  },
};
