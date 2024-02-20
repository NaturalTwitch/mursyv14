module.exports = (client) => {

    const runOpt = (client) => {
        const Guilds = client.guilds.cache.map((guild) => guild.name);
        setTimeout(function () {
            const option = prompt(`What would you like to see? `);
            if (option === 'guilds' || option === 'guild') {
                console.log(Guilds);
                console.log(`Currently in ${client.guilds.cache.size} Guilds`);
            } else if (option === 'uptime') {
                let runtime = moment
                    .duration(client.uptime)
                    .format(`y [Years], M [Months], W [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`);
                console.log(runtime);
            } else if (option === 'logout') {
                console.log('Signing Off...');
                return;
            } else if (option === 'help') {
                console.log(`
                  guild --- Shows guild list and current amount of guilds this bot is in
                  uptime --- view bot current uptime
                  reload --- Reloads a selected file
                  help --- shows this menu
                  logout --- logs you out of owner options
                  shutdown --- shuts down the bot 
                  userblacklist --- blacklists a user from using the bot
                  guildblacklist --- blacklists a guild from using the bot
              `);
            } else if (option === 'userblacklist') {
                const userBlacklist = prompt(`What user do you want to blacklist? `)
                try {
                    client.db.query(
                        'INSERT INTO mursy_user_blacklist (user_id) VALUES ($1)',
                        [userBlacklist],
                    );
                } catch (e) {
                    console.log(`The user could not be blacklisted an error occurred`)
                    return;
                }

                console.log(`You have successfully Blacklisted ${userBlacklist}`)
            } else if (option === 'reload') {
                const rCommand = prompt(`Which file do you want to reload? `);
                try {
                    delete require.cache[require.resolve(`./Files/Commands/${rCommand}`)];
                    const newCommand = require(`./Files/Commands/${rCommand}`);
                    client.commands.set(newCommand.name, newCommand);
                } catch (e) {
                    console.warn(`No File Was Found....`);
                    return runOpt(client);
                }

                console.log(`${rCommand} was successfully reloaded.`);
            } else if (option === 'shutdown') {
                const confirm = prompt(`Are you sure you want to shut down the bot? `);
                if (confirm === 'Y') {
                    console.log(`Shutting down...`);
                    setTimeout(function () {
                        process.exit();
                        return;
                    }, 5000);
                } else if (confirm === 'N') {
                    console.log('Logging out of owner options.');
                    return;
                }
            } else {
                console.error(`404: Value Not Found!`);
            }
            setTimeout(function () {
                const cont = prompt(`Would you like to view something else? `);
                if (cont === 'Y' || cont === 'y') {
                    return runOpt(client);
                } else if (cont === 'N' || cont === 'n') {
                    console.log(`Signing Off...`);
                    return;
                } else {
                    console.warn(`Invalid Input.`);
                    console.log(`Signing Off...`);
                }
            }, 200);
        }, 200);
    };

}