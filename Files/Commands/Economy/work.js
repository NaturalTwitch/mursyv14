const { EmbedBuilder } = require("discord.js");
const userCooldowns = new Map();

module.exports = {
  name: "work",
  description: "This is the test command!",
  async execute(client, message, cmd, args, Discord) {
    let worked = await syncWork(message, client);
    const foodMultipler = await getMultiplier(message, client);
    const walletBalance = await getBalance(message, client);

    if (worked) {
      console.log("using database");
      const cooldownEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Pay Day")
        .setDescription(
          `Sorry **${message.author.username}**, You have worked within the last 3 hours.`
        );
      message.channel.send({ embeds: [cooldownEmbed] });
      return;
    }

    if (userCooldowns.has(message.author.id)) {
      console.log("using collection");
      const cooldownEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Pay Day")
        .setDescription(
          `Sorry **${message.author.username}**, You have worked within the last 3 hours.`
        );
      message.channel.send({ embeds: [cooldownEmbed] });
      return;
    }
    userCooldowns.set(message.author.id);

    setTimeout(() => {
      userCooldowns.delete(message.author.id);
      client.db.query(`delete from worked where user_id = $1`, [
        message.author.id,
      ]);
    }, 10800000);

    client.db.query(`insert into worked (user_id) values ($1)`, [
      message.author.id,
    ]);

    if (foodMultipler) {
      let workBalance = Math.floor(
        (Math.random() * 10000 + 1) * Number(foodMultipler)
      );

      if (!walletBalance) {
        walletBalance = "0";
      }

      await client.db.query(
        `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
        [message.author.id, Number(workBalance) + Number(walletBalance)]
      );

      const workedEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Pay Day")
        .setDescription(
          `You have successfully completed some work.
        Current Multipler: x${foodMultipler}`
        )
        .addFields(
          {
            name: `Your Payout`,
            value: `<:MursyCoin:970535071528394807>${workBalance}`,
            inline: false
          },
          {
            name: `Your Wallet Value:`,
            value: `<:MursyCoin:970535071528394807>${Number(walletBalance) + Number(workBalance)}`,
            inline: false
          }
        )


      message.channel.send({ embeds: [workedEmbed] });
    } else {
      console.log(`Current Mulitpler: ${foodMultipler} `);
      let workBalance = Math.floor(Math.random() * 10000 + 1);

      await client.db.query(
        `INSERT INTO balance(user_id, balance) VALUES($1, $2) ON CONFLICT(user_id) DO UPDATE SET balance = $2; `,
        [message.author.id, Number(workBalance) + Number(walletBalance)]
      );

      const workedEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Pay Day")
        .setDescription(
          `
          You have successfully completed some work.
        `
        )
        .addFields(
          {
            name: `Your Payout:`,
            value: `${mursyCoin}${workBalance}`,
            inline: false
          },
          {
            name: `Your Wallet Value:`,
            value: `${mursyCoin} ${Number(walletBalance) + Number(workBalance)}`
          }
        )

      message.channel.send({ embeds: [workedEmbed] });
    }

    //Random Item
    const inventory = await getInventory(message, client);

    let chance = Math.floor(Math.random() * 25 + 1);

    let randomItem = ["Lucky Coin", "SpeedPotion"];

    let choice = Math.floor(Math.random() * randomItem.length);

    let final = randomItem[choice];
    inventory.push(final);
    console.log(`${chance} | ${final} `);
    if (chance === 13) {
      await client.db.query(
        "INSERT INTO inventory (user_id, bag) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET bag = $2",
        [message.author.id, inventory]
      );
      message.channel.send(`You received a random item \`${final}\``);
    }
  },
};

async function checkUser(message, client) {
  const response = await client.db.query(
    `select user_id from user_worked where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}

async function getBalance(message, client) {
  const response = await client.db.query(
    `select balance from balance where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].balance;
  return null;
}

async function syncWork(message, client) {
  const response = await client.db.query(
    `select user_id from worked where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}

async function getInventory(message, client) {
  const user = message.author;
  const response = await client.db.query(
    "select bag from inventory where user_id = $1",
    [user.id]
  );
  if (response && response.rowCount) return response.rows[0].bag;
  return [];
}

async function getMultiplier(message, client) {
  const response = await client.db.query(
    "select multipler from food_multipler where user_id = $1",
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].multipler;
  return null;
}

/*
  🎒 Mursy | Norm Development 🧪
  🎨 @NaturalTwitch#8920 🔍
  🎋 Unauthorized Duplication is Prohibited 🥏
*/