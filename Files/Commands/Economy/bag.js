const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: 'bag',
  description: 'view your current inventory',
  async execute(client, message, cmd, args, Discord) {
    const inventory = await getInventory(message, client);
    const user = message.mentions.users.first() || message.author;

    const map = new Discord.Collection();

    inventory.forEach((item) => {
      if (map.has(item)) map.get(item).count += 1;
      else {
        map.set(item, { count: 1, name: item });
      }
    });

    const content = map.map(({ name, count }) => `${count}x ${name}`).join('\n');

    if (!content) {
      const bagEmbed = new EmbedBuilder()
        .setColor('#ffffff') // Color in hex format
        .setTitle(`${user.username}'s Bag`)
        .setDescription(`Welcome to your inventory. Here you can view all your items.`)
        .addFields({
          name: 'Items:', value: 'Your Bag is Currently Empty!'
        })
      await message.channel.send({ embeds: [bagEmbed] });
    } else {
      const bagEmbed = new EmbedBuilder()
        .setColor('ffffff')
        .setTitle(`${user.username}'s Bag`)
        .setDescription(`Welcome to your inventory. here is a place to view all your items.`)
        .addFields({
          name: `Items:`, value: `${content}`
        });
      await message.channel.send({ embeds: [bagEmbed] });
    }
  },
};

async function getInventory(message, client, args) {
  const user = message.mentions.users.first() || message.author;
  const response = await client.db.query('select bag from inventory where user_id = $1', [user.id]);
  if (response && response.rowCount) return response.rows[0].bag;
  return [];
}
