const { EmbedBuilder } = require("discord.js");
const userCooldowns = new Map();

module.exports = {
  name: "work",
  execute: async (cmd) => {
    let client = cmd.client;

    //if(cmd.user.id !== '513413045251342336' && cmd.user.id !== '645703827655360578') return

    let worked = await syncWork(cmd, client);

    if (worked) {
      console.log("using database");
      const cooldownEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Pay Day")
        .setDescription(
          `Sorry **${cmd.user.username}**, You have worked within the last 3 hours.`
        );
      cmd.reply({ embeds: [cooldownEmbed], ephemeral: true });
      return;
    }

    if (userCooldowns.has(cmd.user.id)) {
      console.log("using collection");
      const cooldownEmbed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Pay Day")
        .setDescription(
          `Sorry **${cmd.user.username}**, You have worked within the last 3 hours.`
        );
      cmd.reply({ embeds: [cooldownEmbed], ephemeral: true });
      return;
    }
    userCooldowns.set(cmd.user.id);

    setTimeout(() => {
      userCooldowns.delete(cmd.user.id);
      client.db.query(`delete from worked where user_id = $1`, [cmd.user.id]);
    }, 10800000);

    client.db.query(`insert into worked (user_id) values ($1)`, [cmd.user.id]);

    let workBalance = Math.floor(Math.random() * 10000 + 1);

    var walletBalance = await getBalance(cmd, client);
    if (!walletBalance) {
      walletBalance = "0";
    }

    await client.db.query(
      `INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;`,
      [cmd.user.id, Number(workBalance) + Number(walletBalance)]
    );

    const workedEmbed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Pay Day")
      .setDescription("You have successfully completed some work")
      .addFields({ name: `Your payout:`, value: `<:MursyCoin:970535071528394807>${workBalance}` })
      .addFields({
        name: `Your Wallet Value:`,
        value: `<:MursyCoin:970535071528394807>${Number(walletBalance) + Number(workBalance)
          }`
      });

    cmd.reply({ embeds: [workedEmbed], ephemeral: false });
  },
};

async function checkUser(cmd, client) {
  const response = await client.db.query(
    `select user_id from user_worked where user_id = $1`,
    [cmd.user.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}

async function getBalance(cmd, client) {
  const response = await client.db.query(
    `select balance from balance where user_id = $1`,
    [cmd.user.id]
  );
  if (response && response.rowCount) return response.rows[0].balance;
  return null;
}

async function syncWork(cmd, client) {
  const response = await client.db.query(
    `select user_id from worked where user_id = $1`,
    [cmd.user.id]
  );
  if (response && response.rowCount) return response.rows[0].user_id;
  return null;
}
