module.exports = {
    name: 'passwordGenerator',
    aliases: ["pg", "password"],
    description: "Generate a secure password with 1 to 2000 characters",
    execute(client, message, cmd, args, Discord) {


        let length = args[0];


        if (args[0] === 'random') {
            length = Math.floor(Math.random() * 30 + 1)
        }


        if (isNaN(length) || length <= 0 || length > 2000) {
            return message.channel.send(`Please select a number between 1-2000`);
        }

        const passwordKeys = [
            ...Array(26).fill().map((_, i) => String.fromCharCode(i + 65)),  // A-Z
            ...Array(26).fill().map((_, i) => String.fromCharCode(i + 97)),  // a-z
            ...Array(10).fill().map((_, i) => String(i)),  // 0-9
            "!", "@", "#", "$", "%", "^", "&", "(", ")", "."
        ];

        const password = Array.from({ length }, () => passwordKeys[Math.floor(Math.random() * passwordKeys.length)]).join('');

        message.channel.send(password);
    }
}