const { Interaction, EmbedBuilder, Colors } = require('discord.js');
const Category = require('../../database/schema/Category');
const SubCategory = require('../../database/schema/SubCategory');
// const Source = require('../../database/schema/Source');
// const Income = require('../../database/schema/Income');
// const Venue = require('../../database/schema/Venue');
// const Outcome = require('../../database/schema/Outcome');


module.exports = {
  data:{
  "name": "create",
  "description": "Creation command ",
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

    var retVal = null;
    const optList = [];
    await interaction.deferReply();

    if (subcommand === 'category') {
      optList.push(interaction.options.get('category-name').value);
      retVal = await Category.createCategory(optList[0]);
    }
    else if (subcommand === 'sub-category') {
      optList.push(interaction.options.get("sub-category-name").value);
      optList.push(interaction.options.get('category-name').value);
      retVal = await SubCategory.createSubCategory(optList[0], optList[1]);
    }
    else if (subcommand === 'source') {
      interaction.reply('creating a source...');
    }
    else if (subcommand === 'venue') interaction.reply('creating a venue...');
    else if (subcommand === 'income') interaction.reply('creating a income...');
    else if (subcommand === 'outcome') interaction.reply('creating a outcome...');
    
    console.log(`retVal: (${retVal})`);

    if (retVal !== null) {
      if (retVal === 'exists')
        strCat = 'Creation failed!\nName already exist.';
      else if (retVal === 'notFound')
        strCat = `Creation failed!\n${optList[1]} not found!`;
      else
        strCat = `${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)} named ${optList[0]} created!`;
      console.log(`strCat: (${strCat})`);
      const embed = new EmbedBuilder().setDescription(`${strCat}`).setColor(Colors.Blurple);
      await interaction.editReply({ embeds: [embed] });
    }
  },

};