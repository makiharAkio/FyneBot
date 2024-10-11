const { Interaction, ClientVoiceManager } = require('discord.js');
const Category = require('../../database/schema/Category');
const SubCategory = require('../../database/schema/SubCategory');
// const Source = require('../../database/schema/Source');
// const Income = require('../../database/schema/Income');
// const Venue = require('../../database/schema/Venue');
// const Outcome = require('../../database/schema/Outcome');


module.exports = {
  data:{
  "name": "create",
  "description": "Creation command",
  "options": [ 
    {
      "name": "category",
      "description": "Create a Category",
      "type": 1,
      'options': [
        {
          "name": "category-name",
          "description": "Category Name",
          "type": 3,
          "required": true,
        },
        // {
        //   "name": "trx-name",
        //   "description": "Transaction Name",
        //   "type": 3,
        //   "required": true,
        //   "choices": [
        //     {
        //         "name": "Income",
        //         "value": "income"
        //     },
        //     {
        //         "name": "Outcome",
        //         "value": "outcome"
        //     },
        //   ]
        // }
      ]
    },
    {
      "name": "sub-category",
      "description": "Create a Sub-Category",
      "type": 1,
      'options': [
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        },
        {
          "name": "category-name",
          "description": "Category Name",
          "type": 3,
          "required": true
        }
      ]
    },
    {
      "name": "source",
      "description": "Create a Source",
      "type": 1,
      'options': [
        {
          "name": "source-name",
          "description": "source Name",
          "type": 3,
          "required": true,
        },
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        }
      ]
    },
    {
      "name": "income",
      "description": "Create an Income",
      "type": 1,
      'options': [
        {
          "name": "income-date",
          "description": "income date",
          "type": 3,
          "required": true,
        },
        {
          "name": "income-ammount",
          "description": "income ammount",
          "type": 4,
          "required": true,
        },
        {
          "name": "source-name",
          "description": "source Name",
          "type": 3,
          "required": true,
        }
      ]
    },
    {
      "name": "venue",
      "description": "Create a venue",
      "type": 1,
      'options': [
        {
          "name": "venue-name",
          "description": "venue Name",
          "type": 3,
          "required": true,
        },
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        }
      ]
    },
    {
      "name": "outcome",
      "description": "Create an outcome",
      "type": 1,
      'options': [
        {
          "name": "outcome-date",
          "description": "outcome date",
          "type": 3,
          "required": true,
        },
        {
          "name": "outcome-ammount",
          "description": "outcome ammount",
          "type": 4,
          "required": true,
        },
        {
          "name": "venue-name",
          "description": "venue Name",
          "type": 3,
          "required": true,
        }
      ]
    },
  ]},

  /**
   * @param {Interaction} interaction
   */
   run: async ({ interaction }) => {
    const subcommand = interaction.options.getSubcommand();
    //const AllCategory = await Category.getAllCategory();

    await interaction.deferReply();

    if (subcommand === 'category') {
      const categoryName = interaction.options.get('category-name').value;
      //const transactionName = interaction.options.get("trx-name").value;
      // const category = await Category.createCategory(categoryName, transactionName);
      const category = await Category.createCategory(categoryName);
      // console.log(category);
      // if (category !== null) await interaction.editReply(`Category named ${category['categoryName']} created!`);
      // else await interaction.editReply(`Category named ${categoryName} creation failed!\nName already exists!`);
      if (category === 'catExists') await interaction.editReply(`Category named ${categoryName} creation failed!\nName already exists!`);
      else await interaction.editReply(`Category named ${category['categoryName']} created!`);
    }
    else if (subcommand === 'sub-category') {
      const categoryName = interaction.options.get('category-name').value;
      const subCategoryName = interaction.options.get("sub-category-name").value;
      //interaction.reply(`creating a category named ${categoryName}`);
      const subcategory = await SubCategory.createSubCategory(subCategoryName, categoryName);
      //console.log(subcategory);
      //await interaction.editReply(JSON.stringify(category));
      // if (subcategory !== null) await interaction.editReply(`Category named ${subcategory['subCategoryName']} created!`);
      // else await interaction.editReply(`Category named ${subcategory} creation failed!\nName already exists!`)
      if (subcategory === 'catNotFound') await interaction.editReply(`Category named ${subCategoryName} creation failed!\nCategory named ${categoryName} not found!`);
      else if (subcategory === 'subCatExists') await interaction.editReply(`Category named ${subCategoryName} creation failed!\nName already exists!`);
      else await interaction.editReply(`Category named ${subcategory['subCategoryName']} created!`);
    }
    else if (subcommand === 'source') {
      interaction.reply('creating a source...');
    }
    else if (subcommand === 'venue') interaction.reply('creating a venue...');
    else if (subcommand === 'income') interaction.reply('creating a income...');
    else if (subcommand === 'outcome') interaction.reply('creating a outcome...');
    
  },

};