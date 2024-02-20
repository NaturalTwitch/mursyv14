const fetch = require('node-fetch');
const clc = require('cli-color');

module.exports = {
    name: 'dailyfacts',
    description: "mutes people in your server",
    async execute(client, message, cmd, args, Discord) {

        message.delete()

        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        const data = await response.json();

        // Now you can use the data from the API
        console.log(data);

        message.channel.send(data.text)

    }
}