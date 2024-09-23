module.exports = {
    name: 'remind',
    description: '',
    async execute(client, message, cmd, args, Discord) {
        const time = args[0];
        if (!time) return message.channel.send('Please specify a time to remind you! \`.remind 1h Eat Food\`');

        const reminder = args.slice(1).join(' ');
        if (!reminder) return message.channel.send('Please specify a reminder! \`.remind 1h Eat Food\`');

        const ms = require('ms');
        const timeMs = ms(time);

        const reminderEmbed = new Discord.EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle('Reminder')
            .setDescription(`I will remind you in ${time}!`);

        message.delete();
        message.channel.send({ embeds: [reminderEmbed] }).then((m) => setTimeout(() => { m.delete() }, 5000));

        setTimeout(() => {
            const reminderSuccessEmbed = new Discord.EmbedBuilder()
                .setColor('#FFFFFF')
                .setTitle('Reminder')
                .setDescription(`You asked me to remind you ${time} ago!`)
                .addFields({ name: 'Reminder:', value: reminder });

            message.channel.send({ embeds: [reminderSuccessEmbed], content: `<@${message.author.id}>` });
        }, ms(time));
    }
}