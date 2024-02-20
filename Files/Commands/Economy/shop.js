const Discord = require('discord.js');

module.exports = {
  name: 'shop',
  description: 'This is the test command!',
  async execute(client, message, cmd, args) {
    const menu = new Discord.StringSelectMenuBuilder()
      .setCustomId('Shop_Menu')
      .setPlaceholder('Shop Catergories...')
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        {
          label: 'Food',
          value: 'food',
          emoji: '🥫',
        },
        {
          label: 'Packs',
          value: 'packs',
          emoji: '💼',
        },
        {
          label: 'Misc Items',
          value: 'items',
          emoji: '💵',
        },
      );

    const defaultEmbed = new Discord.EmbedBuilder()
      .setColor('#000000')
      .setTitle('Mursy Convenience')
      .setDescription(
        `Hello **${message.author.username}**, Welcome to Mursy Convenience, a place to buy every little trinket your heart desires!`,
      )
      .addFields({
        name: '__How to use:__',
        value: `To Switch between shop caterogries use drop down menu below.
  In Order to **BUY** item do ${client.prefix}buy.
  In Order to **VIEW** your inventory do ${client.prefix}bag.
  In Order to **USE** your items do ${client.prefix}use.**Temporarily Unavailable**`,
      });

    const m = await message.channel.send({
      content: 'Welcome to Mursy Convenience',
      embeds: [defaultEmbed],
      components: [new Discord.ActionRowBuilder().setComponents([menu])],
    });

    const collector = m.createMessageComponentCollector({ time: 60000 });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        menu.setDisabled(true);
        m.edit({ components: [new Discord.ActionRowBuilder().setComponents([menu])] });
      }
    });

    collector.on('collect', (cmd) => {
      if (cmd.user.id !== message.author.id) {
        cmd.reply({ content: 'This is not your store!', ephemeral: true });
        return;
      }

      const foodEmbed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setTitle('Mursy Convenience')
        .setDescription('🥫 **__Food__** - Boosts Wages - ***Last 12 Hours***')
        .addFields(
          {
            name: `Smurf's Coffee | 1500<:MursyCoin:970535071528394807>`,
            value: `A Simple homebrewed coffee made for NFT_Smurf **Instant 50xp**`,
            inline: true
          },
          {
            name: 'Sandwich | 5000<:MursyCoin:970535071528394807>',
            value: 'x1.3 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'HotDog | 5000<:MursyCoin:970535071528394807>',
            value: 'x1.3 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Fries | 5100<:MursyCoin:970535071528394807>',
            value: 'x1.4 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Pizza | 5100<:MursyCoin:970535071528394807>',
            value: 'x1.4 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Chips | 4500<:MursyCoin:970535071528394807>',
            value: 'x1.1 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Burger | 5600<:MursyCoin:970535071528394807>',
            value: 'x1.5 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Poutine | 6000<:MursyCoin:970535071528394807>',
            value: 'x2 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Pierogies | 5600<:MursyCoin:970535071528394807>',
            value: 'x1.2 Multipler Wage Boost',
            inline: true,
          },
          {
            name: 'Popcorn | 5000<:MursyCoin:970535071528394807>',
            value: 'x1.3 Multiplier Wage Boost',
            inline: true,
          },
          {
            name: 'Taco | 6000<:MursyCoin:970535071528394807>',
            value: 'x2 Multiplier Wage Boost',
            inline: true,
          },
        );

      const packsEmbed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setTitle('Mursy Convenience')
        .setDescription('💼 **__Packs__**')
        .addFields({
          name: 'Currently No Items Listed',
          value: `
      **${message.author.username}**, Unfortantely there no packs listed at this time, we are however looking for suggestion for purcashable packs.
      If you have one in mind feel free to DM me, with your suggestion and my creator will be happy to take a look at it 🙂`,
        });

      const itemEmbed = new Discord.EmbedBuilder()
        .setColor('#000000')
        .setTitle('Mursy Convenience')
        .setDescription('💵 **__Misc Items__**')
        .addFields(
          {
            name: 'Wallet Chain | 250000<:MursyCoin:970535071528394807>',
            value: '**1 Use**, Prevents you from getting pickpocketed',
            inline: true,
          },
          {
            name: '<:MursyFigurine:970839568335110154>  MursyFigurine | 3500000<:MursyCoin:970535071528394807>',
            value: '**COLLECTIBLE** You Can Only Buy 1 Ever.',
            inline: true,
          },
        );

      let embedToUse;

      switch (cmd.values[0]) {
        default: {
          break;
        }
        case 'food': {
          embedToUse = foodEmbed;
          break;
        }
        case 'packs': {
          embedToUse = packsEmbed;
          break;
        }
        case 'items': {
          embedToUse = itemEmbed;
          break;
        }
      }

      collector.resetTimer();

      cmd.update({ embeds: [embedToUse] });
    });
  },
};
