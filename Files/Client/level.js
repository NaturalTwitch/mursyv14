const { MessageEmbed } = require('discord.js');
const userCooldowns = new Map();

module.exports = async (client, message, cmd, args, Discord) => {
  client.on('messageCreate', async (message) => {
    if (message.inGuild() === false) return;
    const currentDate = new Date();

    let disabledForGuild = await getGuildId(message, client);
    if (!disabledForGuild) {
      if (userCooldowns.has(message.author.id)) {
        return;
      }

      userCooldowns.set(message.author.id);

      setTimeout(() => {
        userCooldowns.delete(message.author.id);
      }, 60000);

      if (message.inGuild() === false) return;

      if (message.author.bot) {
        return;
      }

      try {
        const data = await getData(message, client);

        // Crystal Raven Roles
        if (message.guild.id === '1091901052141453372') {
          const novice = message.guild.roles.cache.find((role) => {
            return role.id === '1149026562646233318';
          });
          const apprentice = message.guild.roles.cache.find((role) => {
            return role.id === '1149027064247234611';
          });
          const spellbound = message.guild.roles.cache.find((role) => {
            return role.id === '1149027339615879258';
          });
          const cauldron = message.guild.roles.cache.find((role) => {
            return role.id === '1149027466103488592';
          });
          if (data.xp > 500) {
            try {
              message.member.roles.add(novice)
              console.log('Yes Level "4"')
            } catch (e) {
              errorLog(e)
            }
          }  if (data.xp > 1500) {
            message.member.roles.add(apprentice)
          }  if (data.xp > 2500) {
            message.member.roles.add(spellbound)
          }  if (data.xp > 3500) {
            message.member.roles.add(cauldron)
          }
        }

        //Mursy's Server
        if (message.guild.id === '882449110806982667') {
          if (data.xp > 300) {
            const verifiedRole = message.guild.roles.cache.find((role) => {
              return role.id === '986333076189761556';
            });
            try {
              console.log(
                `[${currentDate.toLocaleString()}][Mursy Server] The Verified Role was added`,
              );
              message.member.roles.add(verifiedRole);
            } catch (err) {
              console.log(
                `[${currentDate.toLocaleString()}][Mursy Server] The Verifed Role could not be added`,
              );
              console.log(err);
            }
          }
        }

        if (data.xp > Math.floor(100 * data.level)) {
          console.log(
            `[${currentDate.toLocaleString()}][Mursy Level System] ${message.author.tag
            } has Levelled up in ${message.guild.name}`,
          );

          await client.db.query(
            `insert into xp (guild_id, user_id) values ($1, $2) on conflict (guild_id, user_id) do update set xp = 0, level = xp.level + 1`,
            [message.guild.id, message.author.id],
          );
          const levelUP = new MessageEmbed()
            .setColor('BLACK')
            .setTitle('Rank Up 🎉')
            .setDescription(`Congrats <@${message.author.id}>, You levelled up!`)
            .addField('Rank', `${Math.floor(data.level - 1)} => ${data.level}`);
          message.channel.send({ embeds: [levelUP] });
        }
      } catch (err) { }

      await client.db.query(
        `insert into xp (guild_id, user_id, xp, level, lifetime_xp) values ($1, $2, $3, $4, $5) on conflict (guild_id, user_id) do update set xp = xp.xp + 5, lifetime_xp = xp.lifetime_xp + 5`,
        [message.guild.id, message.author.id, 5, 1, 5],
      );
    } else {
      return;
    }
  });
};

async function getData(message, client) {
  try {
    const response = await client.db.query(
      `select xp, level from xp where guild_id = $1 and user_id = $2`,
      [message.guild.id, message.author.id],
    );
    if (response && response.rowCount)
      return { xp: response.rows[0].xp, level: response.rows[0].level };
    return null;
  } catch (err) { }
}

async function getGuildId(message, client) {
  const response = await client.db.query(`select guild_id from levelsystem where guild_id = $1`, [
    message.guild.id,
  ]);
  if (response && response.rowCount) return response.rows[0].guild_id;
  return null;
}
