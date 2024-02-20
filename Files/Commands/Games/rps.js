const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  name: 'rps',
  description: 'Play Rock Paper Scissors with a friend',
  async execute(client, message, args) {
    const opponent = message.mentions.users.first();

    if (opponent === message.author) return message.reply(`Get some friends, you can't play yourself!`)

    if (!opponent) {
      return message.reply('Please mention who you want to play with.');
    }

    const choices = ['rock', 'paper', 'scissors'];

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('rock')
          .setLabel('Rock')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('paper')
          .setLabel('Paper')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('scissors')
          .setLabel('Scissors')
          .setStyle(ButtonStyle.Primary)
      );

    const gameMessage = await message.reply({
      content: `Rock Paper Scissors: ${message.author.username} vs ${opponent.username}`,
      components: [row],
    });

    const filter = i => i.user.id === message.author.id || i.user.id === opponent.id;
    const collector = gameMessage.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 2, time: 60000 });

    const usersChoices = new Map();

    collector.on('collect', async (interaction) => {
      if (usersChoices.has(interaction.user.id)) {
        return interaction.reply({ content: 'You have already made your choice!', ephemeral: true });
      }

      usersChoices.set(interaction.user.id, interaction.customId);
      await interaction.reply({ content: `You chose ${interaction.customId}`, ephemeral: true });

      if (usersChoices.size === 2) {
        collector.stop();
      }
    });

    collector.on('end', collected => {
      if (usersChoices.size < 2) {
        return gameMessage.edit({ content: 'Game cancelled due to inactivity.', components: [] });
      }

      const user1Choice = usersChoices.get(message.author.id);
      const user2Choice = usersChoices.get(opponent.id);
      let result;

      if (user1Choice === user2Choice) {
        result = 'It\'s a draw!';
      } else if (
        (user1Choice === 'rock' && user2Choice === 'scissors') ||
        (user1Choice === 'paper' && user2Choice === 'rock') ||
        (user1Choice === 'scissors' && user2Choice === 'paper')
      ) {
        result = `${message.author.username} wins! ${message.author.username} chose ${user1Choice}, ${opponent.username} chose ${user2Choice}`;
      } else {
        result = `${opponent.username} wins! ${message.author.username} chose ${user1Choice}, ${opponent.username} chose ${user2Choice}`;
      }

      gameMessage.edit({ content: `Result: ${result}`, components: [] });
    });
  },
};
