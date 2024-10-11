// const { EmbedBuilder } = require('discord.js');


// module.exports = {
//   name: 'ping',
//   description: 'Replies with the bot ping!',

//   callback: async (client, interaction) => {
//     await interaction.deferReply();

//     const reply = await interaction.fetchReply();

//     const ping = reply.createdTimestamp - interaction.createdTimestamp;

//     interaction.editReply(
//       `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
//     );
//   },
// };

// client.on('interactionCreate', (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'embed') {
//     const embed = new EmbedBuilder()
//       .setTitle('Embed title')
//       .setDescription('This is an embed description')
//       .setColor('Random')
//       .addFields(
//         {
//           name: 'Field title',
//           value: 'Some random value',
//           inline: true,
//         },
//         {
//           name: '2nd Field title',
//           value: 'Some random value',
//           inline: true,
//         }
//       );

//     interaction.reply({ embeds: [embed] });
//   }
// });

// client.on('messageCreate', (message) => {
//   if (message.content === 'embed') {
//     const embed = new EmbedBuilder()
//       .setTitle('Embed title')
//       .setDescription('This is an embed description')
//       .setColor('Random')
//       .addFields(
//         {
//           name: 'Field title',
//           value: 'Some random value',
//           inline: true,
//         },
//         {
//           name: '2nd Field title',
//           value: 'Some random value',
//           inline: true,
//         }
//       );

//     message.channel.send({ embeds: [embed] });
//   }
// });
