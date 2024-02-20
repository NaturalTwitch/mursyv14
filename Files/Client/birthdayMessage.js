const { MessageEmbed } = require('discord.js');
const ms = require('ms');

let intervals = {};

module.exports = async (message, client, cmd, args, Discord) => {
    const birthdateInfoList = await getBirthdateList(message, client);

    birthdateInfoList.forEach(birthdateInfo => {
        console.log(birthdateInfo); // logs the timestamp in milliseconds

        const countdown = new Date(Number(birthdateInfo.birthdate)).getTime() - Date.now();
        const humanReadableTime = ms(countdown);
        console.log(humanReadableTime); // logs the countdown in human readable format
        console.log(countdown); // logs the countdown in milliseconds

        if (countdown > 0) { // add a check to make sure countdown is not negative
            const timeout = setTimeout(() => {
                const user = client.users.cache.get(birthdateInfo.user_id);
                if (user) {
                    const embed = new MessageEmbed()
                        .setTitle(`🎉 Happy Birthday! 🎉`)
                        .setDescription(`Wishing you a fantastic birthday, ${user.username}! 🎂🎁🎈`)
                        .setColor('#FF69B4')
                        .setThumbnail(user.displayAvatarURL());

                    user.send({ embeds: [embed] }).catch(err => {
                        console.log(err)
                    });
                }
            }, ms(countdown));
            intervals[birthdateInfo.user_id] = timeout;
        }
    });

    // Check if any of the timers have reached 0 every 24 hours
    setInterval(() => {
        birthdateInfoList.forEach(birthdateInfo => {
            const user_id = birthdateInfo.user_id;
            if (intervals[user_id] && Date.now() >= intervals[user_id]._idleStart + intervals[user_id]._idleTimeout) {
                const user = client.users.cache.get(user_id);
                if (user) {
                    const embed = new MessageEmbed()
                        .setTitle(`🎉 Happy Birthday! 🎉`)
                        .setDescription(`Wishing you a fantastic birthday, ${user.username}! 🎂🎁🎈`)
                        .setColor('#FF69B4')
                        .setThumbnail(user.displayAvatarURL());

                    user.send({ embeds: [embed] }).catch(err => {
                        console.log(err)
                    });
                }
                clearInterval(intervals[user_id]);
                delete intervals[user_id];
            }
        });
    }, 24 * 60 * 60 * 1000);
}

async function getBirthdateList(message, client) {
    const response = await client.db.query(`select * from birthday_reminder`);
    if (response && response.rowCount) {
        return response.rows;
    }
    return null;
}