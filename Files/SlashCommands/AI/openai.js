require('dotenv').config();
const OpenAI = require('openai');

module.exports = {
    name: 'ask',
    description: 'Open AI response',
    async execute(cmd) {

        cmd.reply('Imagine Command is currently disabled by bot owner')
        return;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_TOKEN
        })

        const prompt = cmd.options.getString('prompt')

        await cmd.reply('...')

        const gptResponse = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `${prompt}` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 525
        });

        await cmd.editReply(`${gptResponse.choices[0].message.content}`);
    }
}