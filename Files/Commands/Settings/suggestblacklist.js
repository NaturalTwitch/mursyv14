const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
  name: 'suggestblacklist',
  description: "Blacklists Users from posting a suggestion",
async execute(client, message, cmd, args, Discord){
    const member = message.mentions.members.first();
if(!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`Not Enough Permissions to Execute Command`)
let blacklistedUser = await getBlacklist(message, client, member)

    if(member){
      if(args[1] === 'remove' || args[1] === 'Remove'){
        if(blacklistedUser){
        client.db.query(`delete from suggestion_blacklist where guild_id = $1 and user_id = $2`, [message.guild.id, member.user.id])
        message.channel.send(`${member} Has Been Removed from suggestion blacklist`)
      } else {
        message.channel.send(`${member} was not blacklisted from suggestions`)
      }
        return
      }

      try{
        await client.db.query(`insert into suggestion_blacklist (guild_id, user_id, user_tag, guild_name) values ($1, $2, $3, $4)`, [message.guild.id, member.user.id, member.user.tag, message.guild.name])
        message.channel.send(`${member} has been blacklisted from suggestions`)
      } catch (err) {
          message.channel.send(`${member} is already blacklisted from Suggestions`)
      }

    } else {
      message.channel.send('Please Mention a Name to blacklist')
    }
  }
}


async function getBlacklist(message, client, member){
  const response = await client.db.query(`select user_id from suggestion_blacklist where guild_id = $1 and user_id = $2`, [message.guild.id, member.user.id])
  if(response && response.rowCount) return response.rows[0].user_id
  return null;
}
