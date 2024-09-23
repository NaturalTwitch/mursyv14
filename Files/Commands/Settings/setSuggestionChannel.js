const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
  name: 'suggestchannel',
  aliases: ['setsuggest'],
  description: "sets mod log channel",
  async execute(client, message, cmd, args, Discord) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`You don't have enough permissions to do this`);

    if (args[0] === 'disable' || args[0] === 'Disable') {

      client.db.query(`delete from suggestions where guild_id = $1`, [message.guild.id])
      message.channel.send(`<@${message.author.id}>, You successfully disabled the suggestion channel`)
    } else if (!args[0]) {

      const response = await client.db.query(`select channel_id from suggestions where guild_id = $1`, [message.guild.id])
      const row = response.rows[0]
      if (response && response.rowCount) {

        message.channel.send(`<@${message.author.id}>, Please ensure to mention channel name or \`disable\` to disable suggestion channel`)

      } else {
        message.channel.send(`<@${message.author.id}>, Please ensure you add a Channel Mention`)
      }
    } else {

      let checkChannel = message.mentions.channels.first().id;
      let channel = message.mentions.channels;



      client.db.query(`insert into suggestions (guild_id, channel_id, guild_name) values ($1, $2, $3) on conflict (guild_id) do update set channel_id = $2`, [message.guild.id, checkChannel, message.guild.name])


      message.channel.send(`<@${message.author.id}>, You have set the suggestion channel to <#${checkChannel}>`)


      channel.send(`<@${message.author.id}>, This is now your suggestion channel`)
    }
  }

}
