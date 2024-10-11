// const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
// const Category = require('../../models/Category');

// module.exports = {
//   name: 'createCategory',
//   description: 'Create a Category.',
//   options: [
//     {
//       name: 'category-name',
//       description: 'The user you want to timeout.',
//       type: ApplicationCommandOptionType.String,
//       required: true,
//     },
//     {
//       name: 'transaction-name',
//       description: 'The user you want to timeout.',
//       type: ApplicationCommandOptionType.String,
//       required: true,
//     },
//   ],
//   permissionsRequired: [PermissionFlagsBits.MuteMembers],
//   botPermissions: [PermissionFlagsBits.MuteMembers],
  
//   /**
//    *
//    * @param {Client} client
//    * @param {Interaction} interaction
//    */
//   callback: async (client, interaction) => {
//     const categoryName = interaction.options.get('category-name').value;
//     const transactionName = interaction.options.get("transaction-name").value;

//     await interaction.deferReply();

//     try {
//       let category = await Category.find();
//       let 
//     } catch (error) {
//       console.log(`There was an error : ${error}`);
//     }
//   },

  
//   };