const { SlashCommandBuilder } = require('@discordjs/builders');
const { AttachmentBuilder } = require('discord.js');
const Discord = require('discord.js');
const fetch = require("cross-fetch");
const fs = require('fs');
const path = require('path');
const canvacord = require('canvacord');

module.exports = {
    name: 'rankpersonalization',
    description: 'Personalize your rank card',

    async execute(cmd) {
        let client = cmd.client

        const color1 = cmd.options.getString('color1') || '23272A'
        const color2 = cmd.options.getString('color2') || ''
        const progressbar = cmd.options.getString('progressbar') || 'EED327'

        if (!isValidHexColor(color1)) {
            // Handle invalid color input
            cmd.reply('Invalid color input. Please provide valid hexadecimal color codes.');
            return;
        } else if (color2 && !isValidHexColor(color2)) {
            cmd.reply('Invalid color input. Please provide valid hexadecimal color codes.');
            return;
        } else if (progressbar && !isValidHexColor(progressbar)) {
            cmd.reply('Invalid color input. Please provide valid hexadecimal color codes.');
            return;
        }

        cmd.reply('Creating your card... 0%')

        if (!color2) {
            await client.db.query(
                `INSERT INTO rank_personalization (user_id, backcolor1, levelcolor) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET backcolor1 = $2, levelcolor = $3`,
                [cmd.user.id, color1, progressbar]
            )
            setTimeout(() => {
                cmd.editReply('Creating your card... 10%')
                cmd.editReply('Creating your card... 20%')
                cmd.editReply('Creating your card... 30%')
                cmd.editReply('Creating your card... 40%')
                cmd.editReply('Creating your card... 50%')
                cmd.editReply('Creating your card... 60%')
                cmd.editReply('Creating your card... 70%')
                cmd.editReply('Creating your card... 80%')
                cmd.editReply('Creating your card... 90%')

                const rank = new canvacord.Rank()
                    .setAvatar(cmd.user.displayAvatarURL({ dynamic: false, format: 'png' }))
                    .setCurrentXP(50)
                    .setRequiredXP(100)
                    .setProgressBar(`#${progressbar}`, "COLOR")
                    .setBackground("COLOR", `#${color1}`)
                    .setUsername(cmd.user.username)
                    .setDiscriminator("0000")
                    .setLevel(Number(1))
                    .setRank(0, "nope", false)

                rank.build().then((img) => {
                    const attachment = new Discord.AttachmentBuilder(img, 'Rank.png');
                    cmd.editReply({ files: [attachment], content: 'This is what your rank card will look like.' })
                })
            }, 5000)

        } else {
            await client.db.query(
                `INSERT INTO rank_personalization (user_id, backcolor1, backcolor2, levelcolor) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET backcolor1 = $2, backcolor2 = $3, levelcolor = $4`,
                [cmd.user.id, color1, color2, progressbar]
            )

            setTimeout(() => {
                cmd.editReply('Creating your card... 10%')
                cmd.editReply('Creating your card... 20%')
                cmd.editReply('Creating your card... 30%')
                cmd.editReply('Creating your card... 40%')
                cmd.editReply('Creating your card... 50%')
                cmd.editReply('Creating your card... 60%')
                cmd.editReply('Creating your card... 70%')
                cmd.editReply('Creating your card... 80%')
                cmd.editReply('Creating your card... 90%')

                const rank = new canvacord.Rank()
                    .setAvatar(cmd.user.displayAvatarURL({ dynamic: false, format: 'png' }))
                    .setCurrentXP(50)
                    .setRequiredXP(100)
                    .setProgressBar(`#${progressbar}`, "COLOR")
                    .setBackground("GRADIENT", [`#${color1}`, `#${color2}`])
                    .setUsername(cmd.user.username)
                    .setDiscriminator("0000")
                    .setLevel(Number(1))
                    .setRank(0, "nope", false)

                rank.build().then((img) => {
                    const attachment = new Discord.AttachmentBuilder(img, 'Rank.png');
                    cmd.editReply({ files: [attachment], content: 'This is what your rank card will look like.' })
                })
            }, 5000)
        }


        console.log(`${color1} + ${color2} + ${progressbar}`)
    }
}

function isValidHexColor(hex) {
    return /^[A-Fa-f0-9]{6}$/.test(hex);
}