const { EmbedBuilder } = require('discord.js')
const currentDate = new Date()
const errorLog = require('../Modules/errorlog.js');

module.exports = {
  async execute(message){
    try{
    if(message.author.bot){
      return
    }
  } catch (err){
    return
  }

    const client = message.client;

   const customChannel = await getCustomChannel(message, client)
    let channel = message.guild.channels.cache.find((x) => (x.id === `${customChannel}`));
    if(!channel){
      return;
    }
    console.log(`[${currentDate.toLocaleString()}][Mursy Systems] a message has been deleted in ${message.guild.name}....`)
try {
  let messageDelete = new EmbedBuilder()
    .setColor('#ff0000')
    .setThumbnail(`${message.author.displayAvatarURL()}`)
    .setDescription(`<@${message.author.id}> Deleted a Message in <#${message.channel.id}>`)
    .addFields({name: 'Deleted Message:', value: `${message}` })
    .setTimestamp()


        channel.send({ embeds: [messageDelete] })
      } catch (err) {
        return
        }
    }

}

async function getCustomChannel(message, client){
  const response = await client.db.query(`select channel_id from messagelog where guild_id = $1`, [message.guild.id])
  if(response && response.rowCount) return response.rows[0].channel_id
  return null;
}
