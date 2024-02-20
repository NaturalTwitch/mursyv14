require("dotenv").config();
const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const clc = require('cli-color');
const fs = require('fs');
const errorLog = require('../Modules/errorlog.js');

const cooldowns = new Discord.Collection();
const ms = require("ms");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const levels = require("../Client/level.js");
const newDate = require("./newDate.js");
const { user } = require("../Client/DiscordClient.js");
const fetch = require('node-fetch');
const userCooldowns = new Map();

// const currentDate = new Date()

module.exports = {
  async execute(message) {

    const { client } = message;


    const revengePing = [
      '318453143476371456',
      '682493974845718538'
    ]
    if (revengePing.includes(message.author.id) && message.mentions.users.has('513413045251342336')) {
      message.channel.send(`<@${message.author.id}>`)
    }

    const userBlacklistTrue = await userBlacklist(message);

    if (message.author.id === userBlacklistTrue) return;

    leveling(message, client)

    if (message.content === "<@882458361663213599>") {
      const prefix = await getCustomPrefix(message, client);
      if (!prefix) {
        message.channel.send(`My Current Prefix is ${client.prefix}`);
      } else {
        message.channel.send(`My Current Prefix is ${prefix}`);
      }
    }


    this.commandHandler(message, client);
    this.messageHandler(message, client);
  },
  async commandHandler(message, client) {
    const customPrefix = await getCustomPrefix(message, client);
    const { prefix } = client;
    if (customPrefix) {
      if (!message.content.startsWith(customPrefix) || message.author.bot) {
        return;
      }
    } else if (!message.content.startsWith(prefix) || message.author.bot)
      return;

    const usedPrefix = message.content.startsWith(prefix)
      ? prefix
      : customPrefix;
    const args = message.content.slice(usedPrefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
      client.commands.get(cmd) ||
      client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

    const moderation = [
      "help",
      "ban",
      "kick",
      "mute",
      "unmute",
      "whois",
      "clear",
      "play",
      "evaluate",
      "reload",
      "join",
      "leave",
      "work",
      "suggest",
      "balance",
      "deposit",
      "withdraw",
      "alert",
      "treasurechest"
    ];


    if (command) {
      const alert = await userAlert(message, client);



      try {
        if (
          !moderation.includes(command.name) &&
          message.author.id !== "513413045251342336" &&
          message.author.id !== "318453143476371456"
        ) {
          const reject = () => {
            const cooldown = cooldowns.get(message.channel.id);
            const cooldownEmbed = new EmbedBuilder().setDescription(
              `Please Wait, **${(Number(cooldown) - Date.now(ms(1000)) + Number(10000)) / 1000
              }**s before you can use this command again`
            );
            console.log(clc.yellow(
              `[Mursy Prefix] The ${command.name} command is in cooldown for ${(Number(cooldown) - Date.now(ms(1000)) + Number(10000)) / 1000
              }s`
            ));
            message.reply({ embeds: [cooldownEmbed] });
          };

          // your command handler
          if (cooldowns.has(message.channel.id)) return reject();
          cooldowns.set(message.channel.id, Date.now());
          setTimeout(() => {
            cooldowns.delete(message.channel.id);
          }, 10000);

          command.execute(client, message, cmd, args, Discord);
          const currentDate = new Date();
          console.log(clc.green(
            `[${currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })}][Mursy Prefix] ${command.name
            } command was accessed by ${message.author.tag} in ${message.guild.name
            }....`
          ));
        } else {
          command.execute(client, message, cmd, args, Discord);
          const currentDate = new Date();
          console.log(
            `[${currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' })}][Mursy Prefix] ${command.name
            } command was accessed by ${message.author.tag} in ${message.guild.name
            }....`
          );
        }
      } catch (err) {
        console.log(clc.red(`Error while running Command ${command.name}:`, err));
        errorLog(err)
      }

      if (command.name === "alert") return;

      if (!alert) {
        setTimeout(function () {
          message.channel.send(
            "You have a new alert do `.alert` to view the alert"
          );
        }, 1000);
      }
    }
  },
  async messageHandler(message, client, args) {
    try {
      client.db.query(
        `insert into user_cache (user_id, user_tag) values ($1, $2) on conflict do nothing`,
        [message.author.id, message.author.tag]
      );
    } catch (err) {
      console.log(clc.red(err));
      errorLog(err)
    }

    disboardBumpHandler(message);
    blacklistedWordsHandler(message);
    DMhandler(message, args);
  },
};

const dailyFactsHandler = async (message) => {

}

const disboardBumpHandler = async (message) => {
  const guildID = await getDbumpGuild(message, message.client);

  const role = await getDbumpRole(message);

  if (message.embeds) {
    const embed = message.embeds[0];
    const dbump = "`/bump`";
    const mursyImage =
      "https://cdn.discordapp.com/icons/882449110806982667/bc97472a79a846aecbdb53cba68105bc.webp";
    if (message.author.id === "302050872383242240") {
      if (guildID) {
        const currentDate = new Date();
        if (embed.image) {
          message.react("✅");

          if (!role) {
            setTimeout(() => {
              const reminderEmbed = new EmbedBuilder()

                .setColor("#000000")
                .setAuthor({
                  name: "Mursy DISBOARD Bump Reminder 🎉",
                  iconURL: `${mursyImage}`,
                })
                .setThumbnail(message.guild.iconURL())
                .addFields({
                  name: `Your Server Is Ready To Be **Bumped** again!!`,
                  value: `${dbump}`
                });

              message.channel.send({
                embeds: [reminderEmbed],
              });
            }, 7200000);
          } else {
            setTimeout(() => {
              const reminderEmbed = new EmbedBuilder()

                .setColor("#000000")
                .setAuthor({
                  name: "Mursy DISBOARD Bump Reminder 🎉",
                  iconURL: `${mursyImage}`,
                })
                .setThumbnail(message.guild.iconURL())
                .addFields({
                  name: `Your Server Is Ready To Be **Bumped** again!!`,
                  value: `${dbump}`
                });

              message.channel.send({
                content: `<@&${role}>`,
                embeds: [reminderEmbed],
              });
            }, 7200000);
          }
        }
      }
    }
  }
};

const blacklistedWordsHandler = async (message) => {
  const blacklistedWords = await getBlacklistedWords(message);
  if (
    blacklistedWords &&
    blacklistedWords.some((word) =>
      message.content.toLowerCase().split(/ +/).includes(word)
    )
  ) {
    if (message.author.bot) {
      return;
    }
    message.delete().catch(() => { });
    message.channel
      .send({
        content: `${message.author} Please do not use blacklisted words!`,
      })
      .catch(() => { });
  }
};

const DMhandler = async (message, args) => {
  if (message.inGuild() === true || message.author.bot) return;

  const dmUserReply = await getUserCache(message, args);
  const dmUserReplyTrue = await getUserCacheDm(message, args);
  try {
    if (message.author.id !== "513413045251342336") {
      const dmUser = message.author.id;
      if (!dmUserReplyTrue) {
        message.client.db.query(
          `insert into user_dm (user_id) values ($1) on conflict do nothing`,
          [message.author.id]
        );

        message.client.users.cache
          .get(dmUser)
          .send(
            `**${message.author.username}**, Your message was successfully sent to the owner!`
          );
        message.react("✅");
      } else {
        message.react("✅");
      }

      const contactEmbed = new EmbedBuilder()

        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: `${message.author.avatarURL()}`,
        })
        .addFields({ name: "__New Message__", value: `${message.content}` })
        .setFooter(`${message.author.id}`)
        .setTimestamp();

      message.client.users.cache
        .get("513413045251342336")
        .send({ embeds: [contactEmbed] });

      console.log(`[${message.author.tag}] ${message.content}`);
    }
  } catch (err) {
    errorLog(err)
  }

  if (message.author.id === "513413045251342336") {
    console.log(dmUserReply);
    try {
      message.client.users.cache.get(dmUserReply).send(`${message.content}`);
    } catch (err) { }
  }
};

const getBlacklistedWords = async (message) => {
  try {
    const res = await message.client.db.query(
      `SELECT blacklisted_word FROM blacklisted_words WHERE guild_id = $1;`,
      [message.guild.id]
    );
    if (res && res.rowCount) return res.rows[0].blacklisted_word;
    return null;
  } catch (err) {
    return null;
  }
};

async function getCustomPrefix(message, client) {
  try {
    const response = await client.db.query(
      `select prefix from prefix where guild_id = $1`,
      [message.guild.id]
    );
    if (response && response.rowCount) return response.rows[0].prefix;
    return null;
  } catch (err) {
    return null;
  }
}

async function getUserCache(message, args) {
  try {
    const response = await message.client.db.query(
      `select user_id from user_cache where user_id = $1`,
      [args[0]]
    );
    if (response && response.rowCount) return response.rows[0].user_id;
    return null;
  } catch (err) {
    return null;
  }
}

async function getUserCacheDm(message) {
  try {
    const response = await message.client.db.query(
      `select user_id from user_dm where user_id = $1`,
      [message.author.id]
    );
    if (response && response.rowCount) return response.rows[0].user_id;
    return null;
  } catch (err) {
    return null;
  }
}

async function getDbumpGuild(message) {
  try {
    const response = await message.client.db.query(
      `select guild_id from dbump where guild_id = $1`,
      [message.guild.id]
    );
    if (response && response.rowCount) return response.rows[0].guild_id;
    return null;
  } catch (err) { }
}

async function getDbumpRole(message) {
  try {
    const response = await message.client.db.query(
      `select role_id from dbump_role where guild_id = $1`,
      [message.guild.id]
    );
    if (response && response.rowCount) return response.rows[0].role_id;
    return null;
  } catch (err) { }
}

async function userAlert(message) {
  const response = await message.client.db.query(
    `select user_id from alert where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}

async function userBlacklist(message) {
  const response = await message.client.db.query(
    `select user_id from mursy_user_blacklist where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}

async function leveling(message, client) {


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
        } if (data.xp > 1500) {
          message.member.roles.add(apprentice)
        } if (data.xp > 2500) {
          message.member.roles.add(spellbound)
        } if (data.xp > 3500) {
          message.member.roles.add(cauldron)
        }
      }

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
            console.log(clc.red(err));
            errorLog(err)
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
        const levelUP = new EmbedBuilder()

          .setColor('#000000')
          .setTitle('Rank Up 🎉')
          .setDescription(`Congrats <@${message.author.id}>, You levelled up!`)
          .addFields({ name: 'Rank', value: `${Math.floor(data.level - 1)} => ${data.level}` });
        message.channel.send({ embeds: [levelUP] });
      }
    } catch (err) {
      errorLog(err)
    }

    await client.db.query(
      `insert into xp (guild_id, user_id, xp, level, lifetime_xp) values ($1, $2, $3, $4, $5) on conflict (guild_id, user_id) do update set xp = xp.xp + 5, lifetime_xp = xp.lifetime_xp + 5`,
      [message.guild.id, message.author.id, 5, 1, 5],
    );
  } else {
    return;
  }

  async function getData(message, client) {
    try {
      const response = await client.db.query(
        `select xp, level from xp where guild_id = $1 and user_id = $2`,
        [message.guild.id, message.author.id],
      );
      if (response && response.rowCount)
        return { xp: response.rows[0].xp, level: response.rows[0].level };
      return null;
    } catch (err) {
      errorLog(err)
    }
  }

  async function getGuildId(message, client) {
    const response = await client.db.query(`select guild_id from levelsystem where guild_id = $1`, [
      message.guild.id,
    ]);
    if (response && response.rowCount) return response.rows[0].guild_id;
    return null;
  }

  async function getFactToggle(message, client) {
    const response = await client.db.query(`select guild_id from daily_facts where guild_id = $1`, [
      message.guild.id,
    ]);
    if (response && response.rowCount) return response.rows[0].guild_id;
    return null;
  }

  async function getFactChannel(message, client) {
    const response = await client.db.query(`select channel_id from daily_facts where guild_id = $1`, [
      message.guild.id,
    ]);
    if (response && response.rowCount) return response.rows[0].channel_id;
    return null;
  }

}
