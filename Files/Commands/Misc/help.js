const Discord = require("discord.js");
const prefix = ".";
module.exports = {
  name: "help",
  aliases: ["cmd", "command"],
  description: "shows command list",
  async execute(client, message, cmd, args) {
    const menu = new Discord.StringSelectMenuBuilder()
      .setCustomId(`Help_Menu`)
      .setPlaceholder("Help Catergories...")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        {
          label: "Home",
          value: "default",
        },
        {
          label: "Moderation",
          value: "moderation",
        },
        {
          label: "Fun",
          value: `fun`,
        },
        {
          label: "Music",
          value: "music",
        },
        {
          label: "Bot Settings",
          value: "settings",
        },
        {
          label: "Economy",
          value: "economy",
        },
        {
          label: "Games",
          value: "games"
        },
        {
          label: "AI",
          value: 'ai'
        }
      );

    const defaultEmbed = new Discord.EmbedBuilder()
      .setColor("#000000")
      .setTitle("Mursy Help")
      .setDescription(
        "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
      )
      .addFields({
        name: `**__How to use:__**`,
        value: `To select your help catergory use the drop down menu, this embed will change to match that catergory.`,
      })
      .addFields(
        {
          name: "`invite`",
          value: "Invite Mursy to your server",
          inline: true,
        },
        { name: "`vote`", value: "Vote for Mursy", inline: true },
        {
          name: "Need Support?",
          value:
            "Have a suggestion or issue? Just shoot this bot a dm and it will be sent directly to the bot owner. 🙂",
        }
      )
      .setFooter({
        text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
      });

    const m = await message.channel.send({
      embeds: [defaultEmbed],
      components: [new Discord.ActionRowBuilder().setComponents([menu])],
    });

    const collector = m.createMessageComponentCollector({ time: 60000 });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        menu.setDisabled(true);
        m.edit({
          components: [new Discord.ActionRowBuilder().setComponents([menu])],
        });
      }
    });

    const member = message.author.username;

    collector.on("collect", (cmd) => {
      if (cmd.user.id !== message.author.id) {
        cmd.reply({
          content: `You didn't request this help menu!`,
          ephemeral: true,
        });
        return;
      }

      //moderation help menu

      const moderationEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | MODERATION COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`whois <member>`",
            value: "Gives you Information on a user",
            inline: true,
          },
          {
            name: "`ban <member>`",
            value: "Bans unwanted people",
            inline: true,
          },
          {
            name: "`kick <member>`",
            value: "kicks unwanted people",
            inline: true,
          },
          {
            name: "`mute <member>`",
            value: "Applys a timeout to a user",
            inline: true,
          },
          { name: "`unmute <member>`", value: "unmutes members", inline: true },
          {
            name: "`clear <value>`",
            value: "Clears up to 100 messages",
            inline: true,
          },
          {
            name: "`giveaway <time> <item>`",
            value: "Allows Admins to host giveaways",
            inline: true,
          },
          { name: "`ticket`", value: "Creates Ticket Channels", inline: true },
          {
            name: "`suggest`",
            value: "creates a voteable suggestion for the server",
            inline: true,
          },
          {
            name: "`warn <member>`",
            value: "Gives a member a warning",
            inline: true,
          }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord`,
        });

      //fun help menu

      const funEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | FUN COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`8ball`",
            value: "Ask The Bot a question and it shall reply",
            inline: true,
          },
          { name: "`meme`", value: "Get a meme generated", inline: true },
          { name: "`coinflip`", value: "Flip a Coin", inline: true },
          { name: "`kiss`", value: "Kiss a Fellow User", inline: true },
          { name: "`hug`", value: "Hug a Fellow User", inline: true },
          { name: "`slap`", value: "Slap a Fellow User", inline: true },
          { name: "`eat`", value: "Bite a fellow user", inline: true },
          {
            name: "`assimilate`",
            value: "Assimilate a Fellow user",
            inline: true,
          },
          { name: "`punch`", value: "Punch A Fellow User", inline: true },
          { name: "`tackle`", value: "Tackle a fellow user", inline: true },
          { name: "`pat`", value: "Pat a fellow user", inline: true },
          { name: "`cuddle`", value: "Cuddle a fellow user", inline: true }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });

      //music help menu

      const musicEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | MUSIC COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          //  { name: "Unavailable", value: "**STILL UNDER DEVELOPMENT**", inline: true }
          {
            name: "`play <songname>`",
            value: "Plays Music in Voice Chat",
            inline: true,
          },
          { name: "`stop`", value: "Stops music playback", inline: true },
          { name: "`back`", value: "replays last song", inline: true },
          { name: "`skip`", value: "Skips to next song", inline: true },
          {
            name: "`nowplaying`",
            value: "Displays the current song playing",
            inline: true,
          },
          {
            name: "`pause`",
            value: "pauses current music playing",
            inline: true,
          },
          { name: "`resume`", value: "resumes paused music", inline: true },
          {
            name: "`progress`",
            value: "shows the music timeline",
            inline: true,
          },
          { name: "`queue`", value: "shows the song queue", inline: true }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });

      const settingEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | BOT SETTINGS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`prefix`",
            value: "Displays current prefix & sets a new prefix",
            inline: true,
          },
          {
            name: "`modlog <channel>`",
            value: "Sets the modlog channel",
            inline: true,
          },
          {
            name: "`messagelog <channel>`",
            value: "sets the message log channel",
            inline: true,
          },
          {
            name: "`suggestchannel <channel>`",
            value: "Sets the suggestion channel",
            inline: true,
          },
          {
            name: "`welcome <channel>`",
            value: "Sets a channel to send Join and Leave Messages",
            inline: true,
          },
          {
            name: "`suggest#000000list <member>`",
            value: "#000000lists a member from suggestions",
            inline: true,
          },
          {
            name: "`suggest#000000list <member> Remove`",
            value: "Removes a suggestion #000000list from a member",
            inline: true,
          },
          {
            name: "`#000000listword <word>`",
            value: "Adds a word to #000000list",
            inline: true,
          },
          {
            name: "`#000000listword <word> remove`",
            value: "Removes a word from #000000list",
            inline: true,
          },
          {
            name: "`bumpreminder <enable/disable>`",
            value: `Enable Disboard Bump Reminders for your server`,
            inline: true,
          }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });

      const economyEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | ECONOMY COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`work`",
            value: "Earn some money by doing some honest work",
            inline: true,
          },
          {
            name: "`balance`",
            value: "View your wallet and bank balance",
            inline: true,
          },
          {
            name: "`deposit`",
            value: "Deposit your wallet balance into your bank",
            inline: true,
          },
          {
            name: "`withdraw`",
            value: "Withdraw your bank balance into your wallet",
            inline: true,
          },
          {
            name: "`rob`",
            value: `Rob a fellow user's wallet`,
            inline: true,
          },
          {
            name: "`give`",
            value: `Give money to a fellow user`,
            inline: true,
          },
          {
            name: "`shop`",
            value: `Buy Items from Mursy Convenience`,
            inline: true,
          },
          {
            name: "`bag`",
            value: "Shows current items inside your inventory",
            inline: true,
          }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });
      const gameEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | GAME COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`2048`",
            value: `The game's objective is to slide numbered tiles on a grid to combine them to create a tile with the number 2048.`,
            inline: true
          },
          {
            name: "`guessthatpokemon`",
            value: `Guess the correct pokemon name`,
            inline: true,
          },
          {
            name: "`tictactoe`",
            value: `Connect 3`,
            inline: true,
          },
          {
            name: "`minesweeper`",
            value: `Grid-based puzzle game involving logic and mine avoidance.`,
            inline: true
          },
          {
            name: "`trivia`",
            value: `choose a difficulty { easy | medium | hard }`,
            inline: true
          },
          {
            name: "`rps`",
            value: "play rock paper scissors",
            inline: true
          }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });

      const aiEmbed = new Discord.EmbedBuilder()
        .setColor("#000000")
        .setTitle("Mursy Help | AI COMMANDS")
        .setDescription(
          "[Invite Mursy](https://www.mursybot.com/invite) | [Support Server](https://discord.gg/dFBKKPB8Y3) | [Mursy's Website](https://www.mursybot.com) | Prefix `.`"
        )
        .addFields(
          {
            name: "`ask`",
            value: "Ask OpenAI anything",
            inline: true
          },
          {
            name: "`imagine`",
            value: "Create an AI generated image use Prompts",
            inline: false
          }
        )
        .setFooter({
          text: `Support Mursy on Patreon https://www.patreon.com/MursyDiscord `,
        });

      let embedToUse;

      switch (cmd.values[0]) {
        default: {
          break;
        }
        case "default": {
          embedToUse = defaultEmbed;
          break;
        }
        case "moderation": {
          embedToUse = moderationEmbed;
          break;
        }
        case "fun": {
          embedToUse = funEmbed;
          break;
        }
        case "music": {
          embedToUse = musicEmbed;
          break;
        }
        case "settings": {
          embedToUse = settingEmbed;
          break;
        }
        case "economy": {
          embedToUse = economyEmbed;
          break;
        }
        case "games": {
          embedToUse = gameEmbed;
          break;
        }
        case "ai": {
          embedToUse = aiEmbed;
          break;
        }
      }

      collector.resetTimer();

      cmd.update({ embeds: [embedToUse] });
    });
  },
};

/*
  🎒 Mursy | Norm Development 🧪
  🎨 @NaturalTwitch#8920 🔍
  🎋 Unauthorized Duplication is Prohibited 🥏
*/