module.exports = {
  name: 'buy',
  description: 'Buy an item from Mursy Convenience',
  async execute(client, message, cmd, args, Discord) {
    if (!args[0])
      return message.channel.send(
        `Please ensure you add what to you want to buy \`example: .buy Burger\``,
      );
    const user = message.author;

    const wallet = await getBalance(message, client, args);

    const inventory = await getInventory(message, client);
    
    if(args[0].toLowerCase() === 'mursyfigurine'){
    const hasMursyFigurine = inventory.includes('MursyFigurine');
    if (hasMursyFigurine) {
      return message.reply('You already have a Mursy Figurine. You cannot buy another one.');
    }
  }

    let shopItem = [
      {
        name: 'Sandwich',
        id: `sandwich`,
        price: 5000,
      },
      {
        name: 'HotDog',
        id: `hotdog`,
        price: 5000,
      },
      {
        name: 'Fries',
        id: `fries`,
        price: 5100,
      },
      {
        name: 'Pizza',
        id: `pizza`,
        price: 5100,
      },
      {
        name: 'Chips',
        id: `chips`,
        price: 4500,
      },
      {
        name: 'Burger',
        id: `burger`,
        price: 5600,
      },
      {
        name: 'Poutine',
        id: `poutine`,
        price: 6000,
      },
      {
        name: 'Pierogies',
        id: `pierogies`,
        price: 4750,
      },
      {
        name: 'Popcorn',
        id: `popcorn`,
        price: 5000,
      },
      {
        name: 'Taco',
        id: `taco`,
        price: 6000,
      },
      {
        name: 'Mursy Figurine',
        id: `mursyfigurine`,
        price: 3500000,
      },
      {
        name: 'Wallet Chain',
        id: `walletchain`,
        price: 250000,
      },
      {
        name: `Smurf's Coffee`,
        id: `smurfscoffee`,
        price: 1500
      }
    ];

    try{
      shopItem.forEach(async (item) => {
        if (item.id.toLowerCase() === args[0].toLowerCase()) {
          if (wallet < item.price) return message.reply('Not enough money!');
  
          await client.db.query(
            'INSERT INTO balance (user_id, balance) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET balance = $2;',
            [message.author.id, Number(wallet) - item.price],
          );
  
          inventory.push(item.name);
  
          await client.db.query(
            'INSERT INTO inventory (user_id, bag) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET bag = $2',
            [user.id, inventory],
          );
  
          message.channel.send(`${item.name} was added to your bag, the item costed ${item.price}`);
        }
      });
    } catch (e) {
      console.log(e)
    }
  },
};

async function getBalance(message, client) {
  const user = message.author;
  const response = await client.db.query('select balance from balance where user_id = $1', [
    user.id,
  ]);
  if (response && response.rowCount) return response.rows[0].balance;
  return null;
}

async function getInventory(message, client) {
  const user = message.author;
  const response = await client.db.query('select bag from inventory where user_id = $1', [user.id]);
  if (response && response.rowCount) return response.rows[0].bag;
  return [];
}
