const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Replicate = require("replicate");
const fetch = require("cross-fetch");
const fs = require('fs')
const path = require('path');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagine')
        .setDescription('ai generated photos')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt for the image generation')
                .setRequired(true)),
    name: 'imagine',
    description: 'ai generated photos',
    async execute(cmd) {

        let prompt = cmd.options.getString('prompt')

        const replicate = new Replicate({
            auth: process.env.REPLICATE_TOKEN,
            fetch: fetch,
        });

        let precentage = 0;

        const model = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

        let input = {
            prompt: `${prompt}`
        }

        const parts = prompt.split(' ')

        console.log(parts)
        let urlPart = parts.find(part => isValidUrl(part));
        

        console.log(urlPart ? urlPart : null)

        if (urlPart) {
            urlPart = urlPart.replace(/,$/, "");
            prompt = prompt.replace(urlPart, "");
            input = {
                prompt: `${prompt}`,
                image: urlPart
            }
        }

        
        await cmd.reply(`Generating Image... ${precentage}%`)

        precentage = 20;
        await cmd.editReply(`Generating Image... ${precentage}%`)

        precentage = 33;
        await cmd.editReply(`Generating Image... ${precentage}%`)
        try {
            const output = await replicate.run(model, { input });

            const response = await fetch(output)
            const blobImage = await response.blob();
            const buffer = await blobImage.arrayBuffer();
            const bufferImage = Buffer.from(buffer);

            const userDir = `/root/website/CDN/users/${cmd.user.id}`;
            const aiDir = path.join(userDir, 'AI');

            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir);
            }

            if (!fs.existsSync(aiDir)) {
                fs.mkdirSync(aiDir);
            }

            let fileName = generateToken(13);
            let filePath = path.join(aiDir, `${fileName}.png`);

            while (fs.existsSync(filePath)) {
                fileName = generateToken(13);
                filePath = path.join(aiDir, `${fileName}.png`);
            }

            fs.writeFileSync(filePath, bufferImage);

            precentage = 66;
            await cmd.editReply(`Generating Image... ${precentage}%`)

            precentage = 100;
            await cmd.editReply(`Generating Image... ${precentage}%`)


            console.log(input)

            await cmd.editReply(`https://cdn.mursybot.com/users/${cmd.user.id}/AI/${fileName}.png`);
        } catch (e) {
            cmd.editReply(`An error occured ${e}`)
        }
    }
}

function generateToken(length) {
    const passwordKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const token = Array.from({ length }, () => passwordKeys[Math.floor(Math.random() * passwordKeys.length)]).join('');
    return token;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false; 
    }
  }