require("dotenv").config();
const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const stp = require("../Modules/stp.js");
const errorLog = require("../Modules/errorlog.js");

module.exports = {
  async execute(member) {
    const client = member.client;

    const welcomeChannel = await getWelcomeChannel(member, client);
    const welcomeMessage = await getWelcomeMessage(member, client);
    const channel = member.guild.channels.cache.find(
      (x) => x.id === `${welcomeChannel}`
    );

    const welcomeEmbedNoMessage = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle(`Welcome👋`)
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setDescription(
        `<@${member.user.id}> thanks for joining **${member.guild.name}**`
      )
      .addFields({
        name: `Member Count`,
        value: `${member.guild.memberCount}`,
        inline: false,
      })
      .setTimestamp();

    if (!channel) {
      return;
    } else {
      if (welcomeMessage) {
        const welcomeEmbedWithMessage = new EmbedBuilder()
          .setColor("#00ff00")
          .setTitle(`Welcome👋`)
          .setThumbnail(`${member.user.displayAvatarURL()}`)
          .setDescription(stp(welcomeMessage, { member }))
          .addFields({
            name: `Member Count`,
            value: `${member.guild.memberCount}`,
            inline: false,
          })
          .setTimestamp();

        channel.send({ embeds: [welcomeEmbedWithMessage] });
      } else {
        channel.send({ embeds: [welcomeEmbedNoMessage] });
      }
    }

    //Crystal Raven
    if (member.guild.id === "1091901052141453372") {
      const baby = member.guild.roles.cache.find((role) => {
        return role.id === "1149026277395812403";
      });
      try {
        member.roles.add(baby);
      } catch (e) {
        errorLog(e);
      }
    }

    //Mursy's Server
    if (member.guild.id === "882449110806982667") {
      // guild_protect_join guild_id
      // Limit joins to 3 every 30 seconds

      let guildJoins = await getGuildJoins(member, client);

      if(!guildJoins){
        guildJoins = 0
      }

      console.log(guildJoins)

      client.db.query(
        `
      INSERT INTO guild_protect_join(guild_id, joins)
      VALUES ($1, $2)
      ON CONFLICT (guild_id)
      DO UPDATE SET joins = $2
      `,
        [member.guild.id, Number(guildJoins) + Number(1)]
      );

      setTimeout(() => {
        client.db.query(`
        INSERT INTO guild_protect_join(guild_id, joins)
        VALUES ($1, $2)
        ON CONFLICT (guild_id)
        DO UPDATE SET joins = $2`,
        [member.guild.id, Number(0)])
      }, 30000)

      if (guildJoins >= 3) {
        const raidProtectActive = new EmbedBuilder()
          .setColor("FF0000")
          .setTitle(`Raid Prevention System`)
          .setDescription(`
          **Possible Raid Detected**
You've been kicked from the server. Retry in 30 seconds if you believe this is an error.
          `);

          member.send({ embeds: [raidProtectActive]})
          setTimeout(() => {
            member.kick('Possible Raid')
          }, 1000)
      }

      const welcomeRole = member.guild.roles.cache.find((role) => {
        return role.name === "Members";
      });
      try {
        console.log("[Mursy] The Role was added");
        member.roles.add(welcomeRole);

        //Partner Embed
        //   const partner = new EmbedBuilder()
        //     .setColor('#00ff00')
        //     .setTitle(`Mursy's Partnerships`)
        //     .setDescription(`Welcome to Mursy's Community || Feel free to check out some of our sponsored servers`)
        //     .addField("Empty", "Empty")

        //   member.send({ embeds: [partner] })
      } catch (err) {
        console.log(err);
        errorLog(err);
      }
    } else {
      return;
    }
  },
};

async function getWelcomeChannel(member, client) {
  const response = await client.db.query(
    `select channel_id from welcome where guild_id = $1`,
    [member.guild.id]
  );
  if (response && response.rowCount) return response.rows[0].channel_id;
  return null;
}

async function getWelcomeMessage(member, client) {
  const response = await client.db.query(
    `select welcome_message from welcome where guild_id = $1`,
    [member.guild.id]
  );
  if (response && response.rowCount) return response.rows[0].welcome_message;
  return null;
}

async function getGuildJoins(member, client) {
  const response = await client.db.query(
    `
  SELECT joins
  FROM guild_protect_join
  WHERE guild_id
  = $1
  `,
    [member.guild.id]
  );
  if (response && response.rowCount) return response.rows[0].joins;
  return null;
}
