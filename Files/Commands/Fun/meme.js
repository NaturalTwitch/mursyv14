const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'sends meme',
    execute(client, message, cmd, args, Discord) {
        const url = 'https://www.reddit.com/r/memes/random/.json';

        axios.get(url)
            .then(response => {
                const [list] = response.data;
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                const embed = new Discord.EmbedBuilder()
                    .setTitle(memeTitle)
                    .setURL(memeUrl)
                    .setColor(randomColor)
                    .setImage(memeImage)
                    .setFooter({text: `👍 ${memeUpvotes} 💬 ${memeNumComments}` });

                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {
                console.log(error);
            });
    }
};
