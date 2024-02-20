const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

const games = new Map();

const winConditions = [
  [0, 1, 2], // First row
  [3, 4, 5], // Second row
  [6, 7, 8], // Third row
  [0, 3, 6], // First column
  [1, 4, 7], // Second column
  [2, 5, 8], // Third column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

function checkWinner(board, symbol) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === symbol)
  );
}

function createButton(i, board = []) {
  const symbol = board[i] || '-';
  const disabled = !!board[i] || checkWinner(board, 'X') || checkWinner(board, 'O');
  return new ButtonBuilder()
    .setCustomId(String(i))
    .setLabel(symbol)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(disabled);
}

module.exports = {
  name: 'tictactoe',
  aliases: ['ttt'],
  description: 'Play Tic-Tac-Toe with a friend',
  async execute(client, message, cmd, args, Discord) {
    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send(`Please mention a user.`)
    if (opponent === message.author) {
      message.reply(`You can't play against yourself!`)
      return;
    }

    if (opponent.bot) {
      message.reply(`Bot's can't play tictactoe.`)
      return;
    }
    if (!opponent) {
      return message.reply('Please mention who you want to play with.');
    }

    const board = Array(9).fill(null);

    const gameData = {
      board,
      turn: message.author.id,
      X: message.author.id,
      O: opponent.id,
    };

    const rows = [
      new ActionRowBuilder().addComponents(board.slice(0, 3).map((_, i) => createButton(i, gameData.board))),
      new ActionRowBuilder().addComponents(board.slice(3, 6).map((_, i) => createButton(i + 3, gameData.board))),
      new ActionRowBuilder().addComponents(board.slice(6, 9).map((_, i) => createButton(i + 6, gameData.board))),
    ];

    const gameMessage = await message.reply({
      content: `Tic Tac Toe: <@${gameData.turn}>'s turn`,
      components: rows,
    });

    games.set(gameMessage.id, gameData);

    const filter = i => i.customId && games.has(i.message.id) && i.user.id === games.get(i.message.id).turn;
    const collector = gameMessage.createMessageComponentCollector({ filter, componentType: ComponentType.Button });

    const timeout = setTimeout(() => {
      collector.stop('timeout');
    }, 30000); // 30s

    collector.on('end', (_, reason) => {
      if (reason === 'timeout') {
        gameMessage.edit({
          content: 'Game over due to inactivity.',
          components: [],
        });
      }
    });

    collector.on('collect', async (interaction) => {
     console.log(interaction);
      clearTimeout(timeout);
      const gameData = games.get(interaction.message.id);
      if (![gameData.X, gameData.O].includes(interaction.user.id)) {
        return interaction.reply({ content: 'This is not your game', ephemeral: true });
      }
      const cell = interaction.customId;
      const symbol = gameData.turn === gameData.X ? 'X' : 'O';

      gameData.board[cell] = symbol;
      const winner = checkWinner(gameData.board, symbol);
      const isDraw = !gameData.board.includes(null) && !winner;
      if (winner) {
        gameData.turn = null;
      } else if (isDraw) {
        gameData.turn = null;
      } else {
        gameData.turn = gameData.turn === gameData.X ? gameData.O : gameData.X;
      }

      const rows = [
        new ActionRowBuilder().addComponents(gameData.board.slice(0, 3).map((_, i) => createButton(i, gameData.board))),
        new ActionRowBuilder().addComponents(gameData.board.slice(3, 6).map((_, i) => createButton(i + 3, gameData.board))),
        new ActionRowBuilder().addComponents(gameData.board.slice(6, 9).map((_, i) => createButton(i + 6, gameData.board))),
      ];

      let newMessage;
      if (winner) {
        newMessage = `Congratulations! <@${symbol === 'X' ? gameData.X : gameData.O}> is the winner!`;
      } else if (isDraw) {
        newMessage = `It's a draw!`;
      } else {
        newMessage = `Tic Tac Toe: <@${gameData.turn}>'s turn`;
      }

      await interaction.update({
        content: newMessage,
        components: rows,
      });

    });

  },
};

