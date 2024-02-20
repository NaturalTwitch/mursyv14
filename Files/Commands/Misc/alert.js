const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'alert',
  description: 'This is the test command!',
  async execute(client, message, cmd, args, Discord) {
    const alertEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setTitle(`Mursy Alerts`)
      .setDescription(
        `
        Attention all users,

I am thrilled to share some exciting news with you today. We are pleased to announce that Mursy has been officially verified! This milestone signifies the trust and reliability of our platform.

But that's not all; we have plenty more in store for you. Our dedicated team has been hard at work, and we are ready to unveil two brand new AI features: /imagine and /ask.

With the /imagine feature, you will now have the ability to generate stunning and imaginative photos effortlessly. Explore new artistic possibilities and let your creativity soar with this incredible tool.

Additionally, we are introducing the /ask feature, designed to provide you with accurate and insightful text responses. Whether you need quick information or want to engage in stimulating conversations, /ask has got you covered.

We are committed to continuously improving our platform and adding innovative features that enrich your experience. Your feedback and support have been invaluable in shaping Mursy into what it is today.

Thank you for being a part of our community, and stay tuned for further updates as we continue to bring you cutting-edge advancements.

Warm regards,
The Mursy Team
         `,
      )
      .setFooter({ text: `Thanks for your Continued Support` });

    message.channel.send({ embeds: [alertEmbed] });

    await client.db.query(
      `INSERT INTO alert (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING;`,
      [message.author.id],
    );
  },
};
