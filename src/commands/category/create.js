const { Interaction, EmbedBuilder, Colors } = require('discord.js');
const Category = require('../../database/schema/Category');
const SubCategory = require('../../database/schema/SubCategory');
const Source = require('../../database/schema/Source');
const Income = require('../../database/schema/Income');
const Venue = require('../../database/schema/Venue');
const Outcome = require('../../database/schema/Outcome');


module.exports = {
  data:{
  "name": "create",
  "description": "Creation command ",
  "options": [ 
    { //category
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
      ]
    },
    { //sub-category
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
    { //source
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
    { //income
      "name": "income",
      "description": "Create an Income",
      "type": 1,
      'options': [
        {
          "name": "date-type",
          "description": "1 - today. 2 - any",
          "type": 3,
          "required": true,
        },
        {
          "name": "income-date",
          "description": "income date",
          "type": 3,
          "required": false,
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
        },
        {
          "name": "income-comment",
          "description": "income Comment",
          "type": 3,
          "required": true,
        }
      ]
    },
    { //venue
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
    { //outcome
      "name": "outcome",
      "description": "Create an outcome",
      "type": 1,
      'options': [
        {
          "name": "date-type",
          "description": "1 - today. 2 - any",
          "type": 3,
          "required": true,
        },
        {
          "name": "outcome-date",
          "description": "outcome date",
          "type": 3,
          "required": false,
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
        },
        {
          "name": "outcome-comment",
          "description": "outcome Comment",
          "type": 3,
          "required": false,
        }
      ]
    },
  ]},

  /**
   * @param {Interaction} interaction
   */
   run: async ({ interaction }) => {
    const subcommand = interaction.options.getSubcommand();

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
      optList.push(interaction.options.get("source-name").value);
      optList.push(interaction.options.get('sub-category-name').value);
      retVal = await Source.createSource(optList[0], optList[1]);
    }
    else if (subcommand === 'venue') {
      optList.push(interaction.options.get("venue-name").value);
      optList.push(interaction.options.get('sub-category-name').value);
      retVal = await Venue.createVenue(optList[0], optList[1]);
    }
    else if (subcommand === 'income') {
      const dateType = interaction.options.get("date-type").value;
      var incomeDate;
      if (dateType === 1)
        incomeDate = new Date().toJSON().slice(0, 10);
      else incomeDate = interaction.options.get("income-date").value;
      optList.push(incomeDate);
      optList.push(interaction.options.get('source-name').value);
      optList.push(interaction.options.get('income-ammount').value);
      optList.push(interaction.options.get('income-comment').value);
      retVal = await Income.createIncome(optList[0], optList[2], optList[1], optList[3]);
    }
    else if (subcommand === 'outcome') {
      const dateType = interaction.options.get("date-type").value;
      var outcomeDate;
      if (dateType === 1)
        outcomeDate = new Date().toJSON().slice(0, 10);
      else outcomeDate = interaction.options.get("outcome-date").value;
      optList.push(outcomeDate);
      optList.push(interaction.options.get('venue-name').value);
      optList.push(interaction.options.get('outcome-ammount').value);
      optList.push(interaction.options.get('outcome-comment').value);
      retVal = await Outcome.createOutcome(optList[0], optList[2], optList[1], optList[3]);
    }
    
    console.log(`retVal: (${retVal})`);

    if (retVal !== null) {
      if (retVal === 'exists')
        strCat = 'Creation failed!\nName already exist.';
      else if (retVal === 'notFound')
        strCat = `Creation failed!\n${optList[1]} not found!`;
      else
        if (optList.length === 3)
          strCat = `New ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)} - ${optList[0]}\n${optList[1]}  ${optList[2]}`;
        else
          strCat = `${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)} named ${optList[0]} created!`;
      console.log(`strCat: (${strCat})`);
      const embed = new EmbedBuilder().setDescription(`${strCat}`).setColor(Colors.Blurple);
      await interaction.editReply({ embeds: [embed] });
    }
  },

};