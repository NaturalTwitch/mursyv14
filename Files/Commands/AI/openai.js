require('dotenv').config();
const OpenAI = require('openai');

module.exports = {
    name: 'ask',
    aliases: ['ai'],
    description: 'OpenAI',
    async execute(client, message, cmd, args, Discord) {

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_TOKEN
        })

        if (!args[0]) return message.reply(`Cannot read an empty prompt.`)

        const prompt = `User: ${message.content}\n`;
        await message.channel.sendTyping();
        const gptResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `${message.content}` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 500
        });
        let response = gptResponse.choices[0].message.content;
        if (response.length > 2000) {
            response = response.substring(0, 2000);
        }
        message.reply(`${response}`);


    },
};
