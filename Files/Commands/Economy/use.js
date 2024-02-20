module.exports = {
  name: 'use',
  description: 'This command uses an item in your inventory',
  async execute(client, message, cmd, args, Discord) {
    const inventory = await getInventory(message, client);
    console.log(inventory);
    const foodMultiplerTrue = await getMultiplier(message, client);

    //Food Multipler Section
    let foodItem = [
      {
        name: 'Burger',
        id: `burger`,
        multiplier: 1.5,
      },
      {
        name: 'HotDog',
        id: `hotdog`,
        multiplier: 1.3,
      },
      {
        name: 'Fries',
        id: `fries`,
        multiplier: 1.4,
      },
      {
        name: 'Pizza',
        id: `pizza`,
        multiplier: 1.4,
      },
      {
        name: 'Chips',
        id: `chips`,
        multiplier: 1.1,
      },
      {
        name: 'Sandwich',
        id: `sandwich`,
        multiplier: 1.3,
      },
      {
        name: 'Poutine',
        id: `poutine`,
        multiplier: 2,
      },
      {
        name: 'Pierogies',
        id: `pierogies`,
        multiplier: 1.2,
      },
      {
        name: 'Popcorn',
        id: `popcorn`,
        multiplier: 1.3,
      },
      {
        name: 'Taco',
        id: `taco`,
        multiplier: 2,
      },
    ];

    let miscItems = [
      {
        name: 'Lucky Coin',
        id: `luckycoin`,
        multiplier: Math.floor(Math.random() * 100 + 1),
      },
      {
        name: 'Wallet Chain',
        id: `walletchain`,
        multiplier: '0'
      },
      {
        name: `Smurf's Coffee`,
        id: `smurfscoffee`,
        multiplier: '0'
      }
    ];

    const inventoryID = inventory.map(itemName => {
      // Find the item with the matching name in foodItem and miscItems
      const item = foodItem.find(item => item.name === itemName) || miscItems.find(item => item.name === itemName);

      // Return the item's id
      return item ? item.id : null;
    });

    console.log(inventoryID)

    const item = foodItem.find(item => item.id === args[0]) || miscItems.find(item => item.id === args[0]);
    console.log(args[0])

    console.log(inventory.map((e) => e.toLowerCase()).includes(inventoryID))

    if (!inventoryID.includes(args[0]))
      return message.channel.send('You do not have this item');

    // Check if the item is a food item
    const isFoodItem = foodItem.some((food) => food.id.toLowerCase() === item);

    // Check if the item is a miscellaneous item
    const isMiscItem = miscItems.some((misc) => misc.id.toLowerCase() === item);

    if (foodMultiplerTrue && isFoodItem) return message.channel.send(`There's already a multiplier enabled!`);
    if (foodMultiplerTrue && item === 'luckycoin') return message.channel.send(`There's already a multiplier enabled!`);

    foodItem.forEach(async (item) => {
      if (args[0].toLowerCase() === item.id) {
        console.log(`${item.name} has a mutlipier of ${item.multiplier}`);

        //Adds Multiplier to user
        if(item.multiplier !== '0'){
        await client.db.query(
          'INSERT INTO food_multipler (user_id, multipler) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [message.author.id, item.multiplier],
        );

        message.reply(
          `You have successfully eaten a ${item.name}, you now have a wage mutlipier of x${item.multiplier}!`,
        );
        }

        const result = await client.db.query(
          `SELECT bag FROM inventory WHERE user_id = $1;`,
          [message.author.id]
        );

        const bag = result.rows[0].bag;
        const index = bag.indexOf(item.name);
        if (index > -1) {
          bag.splice(index, 1);
        }

        await client.db.query(
          `UPDATE inventory SET bag = $1 WHERE user_id = $2;`,
          [bag, message.author.id]
        );

        
        setTimeout(async function () {
          await client.db.query(`delete from food_multipler where user_id = $1`, [
            message.author.id,
          ]);
        }, 43200000);
      }
    });

    const protect = await getProtection(message, client)

    //Bonus Items


    miscItems.forEach(async (item) => {
      if (args[0].toLowerCase() === item.id) {
        console.log(`${item.name} has a mutlipier of ${item.multiplier}`);

        const result = await client.db.query(
          `SELECT bag FROM inventory WHERE user_id = $1;`,
          [message.author.id]
        );

        const bag = result.rows[0].bag;
        const index = bag.indexOf(item.name);
        if (index > -1) {
          bag.splice(index, 1);
        }

        await client.db.query(
          `UPDATE inventory SET bag = $1 WHERE user_id = $2;`,
          [bag, message.author.id]
        );

        console.log(item)

        if (item.id === 'walletchain') {
          if (protect === `0`) {
            message.channel.send(`You have successfully added a chain to your wallet, You are now protected from getting robbed once`)
            await client.db.query(`
            INSERT INTO balance (user_id, protection)
            VALUES ($1, $2)
            ON CONFLICT (user_id)
            DO UPDATE SET protection = $2
        `,
              [message.author.id, `1`])
            return;
          } else if (protect === `1`) {
            message.channel.send(`You already have a Wallet Chain activated`)
            return;
          }
        } else if (item.id === 'smurfscoffee') {
          message.channel.send(`You Drank Smurf's Coffee, you have received 50 xp Points`)
          await client.db.query(
            `insert into xp (guild_id, user_id, xp, level, lifetime_xp) values ($1, $2, $3, $4, $5) on conflict (guild_id, user_id) do update set xp = xp.xp + 50, lifetime_xp = xp.lifetime_xp + 50`,
            [message.guild.id, message.author.id, 50, 1, 50],
          );
          return;
        };

        await client.db.query(
          'INSERT INTO food_multipler (user_id, multipler) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [message.author.id, item.multiplier],
        );

        message.reply(
          `You have successfully used a ${item.name}, you now have a wage mutlipier of x${item.multiplier}!`,
        );

        setTimeout(async function () {
          await client.db.query(`delete from food_multipler where user_id = $1`, [
            message.author.id,
          ]);
        }, 43200000);
      }
    });
  },
};

async function getInventory(message, client) {
  const user = message.author;
  const response = await client.db.query('select bag from inventory where user_id = $1', [user.id]);
  if (response && response.rowCount) return response.rows[0].bag;
  return [];
}

async function getMultiplier(message, client) {
  const user = message.author;
  const response = await client.db.query(
    'select multipler from food_multipler where user_id = $1',
    [user.id],
  );
  if (response && response.rowCount) return response.rows[0].multipler;
  return null;
}
async function getProtection(message, client) {
  const response = await client.db.query(
    `select protection from balance where user_id = $1`,
    [message.author.id]
  );
  if (response && response.rowCount) return response.rows[0].protection;
  return null;
}

/*
  🎒 Mursy | Norm Development 🧪
  🎨 @NaturalTwitch#8920 🔍
  🎋 Unauthorized Duplication is Prohibited 🥏
*/