module.exports = {
    name: 'birthday',
    description: '',
    async execute(client, message, cmd, args, Discord) {

        function generateRandomPIN() {
            const randomNum = Math.floor(Math.random() * 10000);
            const pin = String(randomNum).padStart(1, '0');
            return pin;
        }

        const birthdayID = generateRandomPIN()

        console.log(birthdayID)

        const birthdate = args[0];

        if (!birthdate) return message.channel.send('Please specify a birthdate! \`.birthday mm/dd\`');


        const birthdateMs = Date.parse(birthdate + '/' + new Date().getFullYear());

        console.log(birthdateMs);

        try {
            await client.db.query('INSERT INTO birthday_reminder (guild_id, user_id, birthdate, timeout_id) VALUES ($1, $2, $3, $4) RETURNING *', [message.guild.id, message.author.id, birthdateMs, birthdayID]);
        } catch (err) {
            console.log(err);
            return message.channel.send('There was an error saving your birthday to the database.');
        }

        const birthdateObj = new Date(birthdateMs);
        const monthName = birthdateObj.toLocaleString('default', { month: 'long' });
        const day = birthdateObj.getDate();
        const year = birthdateObj.getFullYear();
        console.log(`User ${message.author.id} birthday: ${monthName} ${day}, ${year}`);


        const today = new Date();
        const nextBirthday = new Date(today.getFullYear(), birthdateObj.getMonth(), birthdateObj.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const timeUntilBirthday = nextBirthday - today;
        const daysUntilBirthday = Math.ceil(timeUntilBirthday / (1000 * 60 * 60 * 24));

        message.channel.send(`Your birthday has been saved! Your next birthday is in ${daysUntilBirthday} days.`);
    }
}