const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
  name: 'prefix',
  aliases: ['setprefix'],
  description: "Set & Edit Guild Prefixs",
  async execute(client, message, cmd, args, Discord){
    if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`You don't have enough permissions to do this`);

    if(args[0] === 'disable' || args[0] === 'Disable'){

       client.db.query(`delete from prefix where guild_id = $1`, [message.guild.id])
        message.channel.send(`Your prefix was set back to default \`.\``)
        return
    }else if(!args[0]){
      const response = await client.db.query(`select prefix from prefix where guild_id = $1`, [message.guild.id])
     if(response && response.rowCount){
      const row = response.rows[0]

      const customPrefix = new EmbedBuilder()
        .setColor('#000000')
        .setDescription(`**Your Current Prefix is** \`${row.prefix}\``)
      message.channel.send({embeds: [customPrefix]})
    } else {
      const defaultPrefix = new EmbedBuilder()
        .setColor('#000000')
        .setDescription(`**The Default Prefix is** \`${client.prefix}\``)
    //  .addField('The Default Prefix is', `\`${client.prefix}\``)
      message.channel.send({embeds: [defaultPrefix]})
      }
    }else{
      client.db.query(`insert into prefix (guild_id, prefix, guild_name) values ($1, $2, $3) on conflict (guild_id) do update set prefix = $2`, [message.guild.id, args[0], message.guild.name])

      const customPrefix = new EmbedBuilder()
        .setColor('#000000')
        .setDescription(`**Prefix is now set to** \`${args[0]}\``)
      message.channel.send({embeds: [customPrefix]})
    }

  }
}
