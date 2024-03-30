const { EmbedBuilder } = require('discord.js');
const canvacord = require('canvacord');
const { time } = require('console');
const items = require('../../Modules/items.json')

module.exports = {
  name: 'test',
  description: 'Test Commands',
  async execute(client, message, cmd, args, Discord) {

    console.log(items.miscItems)

  }
}
