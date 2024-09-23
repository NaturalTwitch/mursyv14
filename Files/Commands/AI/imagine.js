const Replicate = require("replicate");
const fetch = require("cross-fetch");
const fs = require('fs')
const path = require('path');


module.exports = {
    name: 'imagine',
    aliases: ['photogen'],
    description: 'AI image gen',
    async execute(client, message, cmd, args, Discord) {
        message.reply('Imagine Command is current disabled by bot owner')
        return;

        try {
            const replicate = new Replicate({
                auth: process.env.REPLICATE_TOKEN,
                fetch: fetch,
            });

            if (!args[0]) return message.reply(`Cannot make a Image without a prompt`)

            const m = await message.reply(`Generating Photo...`)

            const model = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

            let input = { 
              prompt: `${args.slice(0).join(" ")}`
            }

            if (isValidUrl(args[0])){
             input = { 
              prompt: `${args.slice(1).join(" ")}`, 
              image: args[0].slice(0, -1)
            };
          } 

            // Step 1: Initialize Replicate
            let progress = 0; // 33% progress
            await m.edit(`Generating Photo... ${progress}%`);

            progress = 20; // 33% progress
            await m.edit(`Generating Photo... ${progress}%`);

            progress = 33; // 33% progress
            await m.edit(`Generating Photo... ${progress}%`);

            // Step 2: Run the model
            try {
                const output = await replicate.run(model, { input });
                const response = await fetch(output)
                const blobImage = await response.blob();
                const buffer = await blobImage.arrayBuffer();
                const bufferImage = Buffer.from(buffer);
                
                const userDir = `/root/website/CDN/users/${message.author.id}`;
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

                progress = 66; // 66% progress
                await m.edit(`Generating Photo... ${progress}%`);

                // Step 3: Edit the message
                progress = 100; // 100% progress
                await m.edit(`Generating Photo... ${progress}%`);

                console.log(input)

                m.edit(`https://cdn.mursybot.com/users/${message.author.id}/AI/${fileName}.png`);
            } catch (e) {
                m.edit(e)
                console.log(e)
            }
            //message.reply(`${output}`)
        } catch (e) {
            message.reply(`An Error has occured`)
            console.log(e)
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
