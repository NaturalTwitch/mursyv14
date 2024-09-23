const io = require('@pm2/io');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js')
require('dotenv').config();
const readline = require('readline');
const prompt = require('prompt-sync')();
const client = require('./Files/Client/DiscordClient.js');
const moment = require('moment');
require('moment-duration-format');
const errorLog = require('./Files/Modules/errorlog.js');

const { Player } = require('discord-player');
const { ExtractorModel } = require('@discord-player/extractor');

const { YoutubeiExtractor } = require("discord-player-youtubei")



client.config = require('./config');
client.player = new Player(client, {
  ...client.config.opt.discordPlayer,
  extractorModel: ExtractorModel,
});
const player = client.player;
player.extractors.register(YoutubeiExtractor, {
  authentication: process.env.YOUTUBE_TOKEN
})
client.player.extractors.loadDefault();

player.events.on('error', (queue, error) => {
  console.log(`There was a problem with the song queue => ${error.message}`);
});

player.events.on('connectionError', (queue, error) => {
  console.log(`I'm having trouble connecting => ${error.message}`);
  queue.metadata.channel.send('An Error has Occured Please Try Again')

  const success = queue.skip();
});


player.events.on('playerStart', (queue, track) => {
  const trackStart = new EmbedBuilder()
    .setDescription(`🎵 Now Playing: **${track.title}**🎧`)
    .setImage(`${track.thumbnail}`)
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
  queue.metadata.channel.send({ embeds: [trackStart] });
});

player.events.on('audioTracksAdd', (queue, tracks) => {
  const trackTitles = tracks.map(track => `**${track.title}**`).join(', ');
  const tracksAdd = new EmbedBuilder()
    .setDescription(`Added ${trackTitles} to the queue.`)
  queue.metadata.channel.send({ embeds: [tracksAdd] });
});


player.events.on('audioTrackAdd', (queue, track) => {
  const trackAdd = new EmbedBuilder()
    .setDescription(`Added **${track.title}** to the queue.`)
  queue.metadata.channel.send({ embeds: [trackAdd] });
});


player.events.on('channelEmpty', (queue) => {
  queue.metadata.channel.send('The voice channel was empty, so I left');
});

player.events.on('emptyQueue', (queue) => {
  const guildId = queue.metadata.guildId
  client.db.query(`insert into loop_toggle (guild_id, toggled) values ($1, $2) on conflict (guild_id) do update set toggled = $2`, [guildId, 'false'])
});


io.init({
  metrics: {
    network: {
      ports: true,
    },
  },
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on('line', async (msg) => {
  if (msg === 'help') {
    console.log(`
      login --- brings up the login to the owner section
      help --- shows this menu
      time --- shows system current time
      ping --- shows current latency of this project
    `);
  }
  if (msg === 'ping') {
    console.log(`Current Latency is ${Math.round(client.ws.ping)}MS`)
  }
  if (msg === 'time') {
    const realTime = new Date();
    console.log(realTime.toLocaleString());
  }
  if (msg === 'login') {
    const name = prompt('What is the password?  ');

    if (name === '54626') {
      //password acceptance
      console.log('Welcome Boss!');
      //information for both discord and console
      console.log(`You are logged into: %c${client.user.tag}`, 'colour: red');
      runOpt(client);
    } else {
      console.log(`Incorrect Password`);
    }
  }
  // // eslint-disable-next-line no-eval, no-console
  // console.log(msg.includes('await') ? await eval(`(async () => {${msg}})()`) : eval(msg));
});

// eslint-disable-next-line no-undef
process.setMaxListeners(3);

for (const rawevent of [...client.events.entries()]) {
  const event = client.events.get(rawevent[0]);
  if (event.once) client.once(rawevent[0], (...args) => event.execute(...args));
  else client.on(rawevent[0], (...args) => event.execute(...args));
}

// eslint-disable-next-line no-undef
process.on('unhandledRejection', (error) => {
  errorLog(error);
});
// eslint-disable-next-line no-undef
process.on('uncaughtException', (error) => {
  errorLog(error)
});

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

const timeDate = () => {
  setInterval(function () {
    const dateTime = new Date();
  }, 500);
};


/*
  🎒 Mursy | Norm Development 🧪
  🎨 @NaturalTwitch#8920 🔍
  🎋 Unauthorized Duplication is Prohibited 🥏
*/
