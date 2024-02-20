const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
  name: 'disboardremind',
  aliases: ['bumpreminder', 'dbumpremind'],
  description: 'sets reminder for disboard',
  async execute(client, message, cmd, args, Discord) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`You don't have enough permissions to do this`);

    let guild_id = await getDbumpGuild(message, client)

    if (args[0] === 'disable' || args[0] === 'Disable') {
      if (guild_id) {
        client.db.query(`delete from dbump where guild_id = $1`, [message.guild.id])
        client.db.query(`delete from dbump_role where guild_id = $1`, [message.guild.id])
        message.channel.send(`\`DBump Reminders\` Have been disabled`)
      } else {
        message.channel.send(`\`DBump Reminders\` are already disabled for this guild`)
      }
    } else if (args[0] === 'enable' || args[0] === 'Enable') {
      try {
        await client.db.query(`insert into dbump (guild_id, guild_name) values ($1, $2)`, [message.guild.id, message.guild.name])

        message.channel.send(`\`DBump Reminders\` Have been enabled`)
        message.channel.send(`\`DBump Reminders\` What role would you like to ping? If None response with N`)

        const returnedMessageContent = await new Promise((resolve) => {
          const messageCollector = message.channel.createMessageCollector({ time: 10000 });



          messageCollector.on('collect', async (msg) => {
            if (msg.author.id !== message.author.id) return;
            if (msg.content === 'N') return message.channel.send('Enabled without Ping')
            console.log(msg.mentions.roles.first())
            const role = msg.mentions.roles.first()
            if (msg.content.replace(/\D+/g, '') !== role.id) {
              message.channel.send(`No Role was Found`)
              return;
            }
            message.channel.send(`${role} was set as the bump ping`)
            await client.db.query(`insert into dbump_role (guild_id, role_id) values ($1, $2)`, [msg.guild.id, role.id])

            messageCollector.stop();
            resolve(msg.content);
          });

          messageCollector.on('end', (collected, reason) => {
            if (reason === 'time') {
              resolve(null);
            }
          });
        });

        if (!returnedMessageContent) return;

        console.log('Answer was: ' + returnedMessageContent);



      } catch (err) {
        message.channel.send(`\`DBump Reminders\` are already enabled for this guild`)
      }
    } else {
      message.channel.send(`Please ensure you say \`Enable\` or \`Disable\``)
    }



  }
}

async function getDbumpGuild(message, client) {
  const response = await client.db.query(`select guild_id from dbump where guild_id = $1`, [message.guild.id])
  if (response && response.rowCount) return response.rows[0].guild_id
  return null;
}
