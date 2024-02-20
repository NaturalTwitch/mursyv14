const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/dankmemes/hot/.json?limit=100'

module.exports = {
    name: 'meme',
    description: 'sends meme',
    execute(cmd) {

        cmd.reply(`Reddit has blocked Mursy from there API, we are currently in the process of looking for a new meme api`)
        return;

        const newUrl = url.replace('preview.redd.it', 'i.redd.it')

        https.get(newUrl, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                if (index.post_hint !== 'image') {
                    var text = index.selftext
                    const textembed = new Discord.EmbedBuilder()
                        .setColor('BLACK')
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    cmd.reply({ embeds: [textembed] })
                }

                var image = index.url
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    const richtextembed = new Discord.EmbedBuilder()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    cmd.reply({ embeds: [richtextembed] })
                }

                console.log(image);

                const imageembed = new Discord.EmbedBuilder()
                    .setTitle(`Memes From Reddit`)
                    .setImage(image)
                    .setColor('BLACK')
                    .setFooter(`Requested By ${cmd.user.username}`)
                    .setTimestamp()

                cmd.reply({ embeds: [imageembed] })
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    }
}
