const { EmbedBuilder } = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
  name: 'rank',
  aliases: ['level'],
  description: 'Shows Current Rank',
  async execute(client, message, cmd, args, Discord) {
    const user = message.mentions.users.first() || message.author;

    if (user.bot) {
      return message.reply(`<@${message.author.id}>, Bots can't have ranks`);
    }

    const data = await getData(message, client);
    const custom = await getPersonalization(message, client);

    let back1 = custom?.backcolor1 || '23272A';
    let back2 = custom?.backcolor2 || '';
    let levelcolor = custom?.levelcolor || 'EED327';
    const bannerLink = custom?.banner || '';

    console.log(back1, back2, levelcolor, bannerLink)

    try {
      if (bannerLink) {
        const rank = new canvacord.Rank()
          .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
          .setCurrentXP(Number(data.xp))
          .setRequiredXP(Math.floor(100 * data.level))
          .setProgressBar(`#${levelcolor}`, "COLOR")
          .setBackground("IMAGE", `https://cdn.mursybot.com/users/${user.id}/banners/${bannerLink}.png`)
          .setUsername(user.username)
          .setDiscriminator("0000")
          .setLevel(Number(Math.floor(Number(data.level) - 1)))
          .setRank(0, "nope", false)

        rank.build().then((img) => {
          const attachment = new Discord.AttachmentBuilder(img, 'Rank.png');
          message.channel.send({ files: [attachment] });
        });
        return;
      }
      if (!back2) {
        const rank = new canvacord.Rank()
          .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
          .setCurrentXP(Number(data.xp))
          .setRequiredXP(Math.floor(100 * data.level))
          .setProgressBar(`#${levelcolor}`, "COLOR")
          .setBackground("COLOR", `#${back1}`)
          .setUsername(user.username)
          .setDiscriminator("0000")
          .setLevel(Number(Math.floor(Number(data.level) - 1)))
          .setRank(0, "nope", false)

        rank.build().then((img) => {
          const attachment = new Discord.AttachmentBuilder(img, 'Rank.png');
          message.channel.send({ files: [attachment] });
        });

      } else {
        const rank = new canvacord.Rank()
          .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
          .setCurrentXP(Number(data.xp))
          .setRequiredXP(Math.floor(100 * data.level))
          .setProgressBar(`#${levelcolor}`, "COLOR")
          .setBackground("GRADIENT", [`#${back1}`, `#${custom.backcolor2}`])
          .setUsername(user.username)
          .setDiscriminator("0000")
          .setLevel(Number(Math.floor(Number(data.level) - 1)))
          .setRank(0, "nope", false)

        rank.build().then((img) => {
          const attachment = new Discord.AttachmentBuilder(img, 'Rank.png');
          message.channel.send({ files: [attachment] });
        });
      }
    } catch (err) {
      message.channel.send(`${err}`);
    }
  }
}

async function getData(message, client) {
  const user = message.mentions.users.first() || message.author;

  const response = await client.db.query(
    `select xp, level, lifetime_xp from xp where guild_id = $1 and user_id = $2`,
    [message.guild.id, user.id]
  );
  if (response && response.rowCount) return { xp: response.rows[0].xp, level: response.rows[0].level, lifetime: response.rows[0].lifetime_xp };
  return null;
}

async function getPersonalization(message, client) {
  const user = message.mentions.users.first() || message.author;

  const response = await client.db.query(
    `select levelcolor, backcolor1, backcolor2, banner from rank_personalization where user_id = $1`,
    [user.id]
  );
  if (response && response.rowCount) return { levelcolor: response.rows[0].levelcolor, backcolor1: response.rows[0].backcolor1, backcolor2: response.rows[0].backcolor2, banner: response.rows[0].banner };
  return null;
}