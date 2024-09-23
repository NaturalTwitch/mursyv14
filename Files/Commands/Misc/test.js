const { EmbedBuilder } = require("discord.js");
const canvacord = require("canvacord");
const { time } = require("console");
const urlVerifer = require("C:/Users/aweso/Desktop/mursyv14/Files/Modules/urlVerifier.js")

module.exports = {
  name: "test",
  description: "Test Commands",
  async execute(client, message, cmd, args, Discord) {

    message.client.channels.cache.get('1269421507524952094').send(`Not as complicated as you may think :)`)

  },
};
