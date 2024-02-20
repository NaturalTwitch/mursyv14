// Importing required modules
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Replicate = require("replicate");
const fetch = require("cross-fetch");
const fs = require('fs')
const path = require('path');

//Importing BlackJack Game
const blackjack = require('discord-blackjack');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription(`Play a game of blackjack.`)
        .addStringOption(option =>
            option.setName('bet')
                .setDescription(`Place your bet. Use your hard earned Mursy Coin.`)
                .setRequired(true)
        ),
    name: 'blackjack',
    description: 'Play a game of blackjack.',
    async execute(cmd) {
        // imports client for database usages
        let client = cmd.client;

        // Detailed Checks
        // checks user balances, make sure the bet is a number and that the user has enough money to make the bet

        const userBalance = await getBalance(cmd, client)
        const bet = cmd.options.getString('bet')

        if (isNaN(bet)) {
            cmd.reply(`The bet has to be a number.`)
            return;
        }

        if (Number(bet) === Number(0)) {
            cmd.reply(`You can't bet <:MursyCoin:970535071528394807>0`)
            return;
        }
        if (Number(bet) > userBalance) {
            cmd.reply(`Sadly you do not have enough to make this bet, Please try a lower amount.`)
            return;
        }

        // Blackjack Game once done should return one of the following 
        // [WIN, LOSE, TIE, DOUBLE WIN, DOUBLE LOSE, DOUBLE TIE, TIMEOUT, CANCEL]

        let game = await blackjack(cmd, { resultEmbed: true }, bet);

        if (game.result === 'WIN') {
            const payout = bet * 2;
            await client.db.query(
                `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
                [cmd.user.id, Number(userBalance) - Number(bet) + Number(payout)],
            );
        }

        if (game.result === 'LOSE') {
            await client.db.query(
                `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
                [cmd.user.id, Number(userBalance) - Number(bet)],
            );
        }

        if (game.result === 'CANCEL') {
            return;
        }

    }
}



async function getBalance(cmd, client) {
    const user = cmd.user;
    const response = await client.db.query(`select balance from balance where user_id = $1`, [
        user.id,
    ]);
    if (response && response.rowCount) return response.rows[0].balance;
    return null;
}