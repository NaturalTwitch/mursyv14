const { EmbedBuilder, PermissionsBitField } = require("discord.js")


module.exports = {
  name: 'xpsystem',
  description: "configures the state of which the xp system rests",
async execute(client, message, cmd, args, Discord){
  if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`You don't have enough permissions to do this`);

  let disabledForGuild = await getGuildId(message, client)


  if(args[0] === 'disable'){
if(disabledForGuild){
  const alreadyDisabled = new EmbedBuilder()
    .setColor(`#ff0000`)
    .setTitle(`XP System`)
    .setDescription(`**${message.author.username}**, The XP System is already disabled for **${message.guild.name}**`)

    message.reply({ embeds: [alreadyDisabled] })
} else {
  const disableMessage = new EmbedBuilder()
    .setColor(randomColor)
    .setTitle(`XP System`)
    .setDescription(`**${message.author.username}**, You have successfully disabled the XP System for **${message.guild.name}**`)

  client.db.query(`insert into levelsystem (guild_id) values ($1) on conflict do nothing`, [message.guild.id])
  message.reply({ embeds: [disableMessage]})
}

  } else if(args[0] === 'enable'){

if(!disabledForGuild){
  const alreadyEnabled = new EmbedBuilder()
    .setColor(`#ff0000`)
    .setTitle(`XP System`)
    .setDescription(`**${message.author.username}**, The XP System has already been enabled for **${message.guild.name}**`)

  message.reply({ embeds: [alreadyEnabled] })
} else {
  const enableMessage = new EmbedBuilder()
    .setColor(randomColor)
    .setTitle(`XP System`)
    .setDescription(`**${message.author.username}**, You have successfully enabled the XP System for **${message.guild.name}**`)

  client.db.query(`delete from levelsystem where guild_id = $1`, [message.guild.id])
  message.reply({ embeds: [enableMessage] })
}
      } else {
        const noPharse = new EmbedBuilder()
          .setColor(`#ff0000`)
          .setTitle(`XP System`)
          .setDescription(`**${message.author.username}**, Please ensure you state \`enable\` or \`disable \``)

        message.reply({ embeds: [noPharse]})
    }
  }
}

//Database Searching
async function getGuildId(message, client){
   const response = await client.db.query(`select guild_id from levelsystem where guild_id = $1`, [message.guild.id])
   if(response && response.rowCount) return response.rows[0].guild_id
   return null;
}
