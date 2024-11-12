const { Interaction, EmbedBuilder, Colors } = require('discord.js');
const Category = require('../../database/schema/Category');
const SubCategory = require('../../database/schema/SubCategory');
const Source = require('../../database/schema/Source');
const Income = require('../../database/schema/Income');
const Venue = require('../../database/schema/Venue');
const Outcome = require('../../database/schema/Outcome');

module.exports = {
  data:{
  "name": "show",
  "description": "Show command",
  
  "options": [
    { //all-categories
      "name": "all-categories",
      "description": "Show All Categories",
      "type": 1,
    }, 
    { //all-sub-categories
      "name": "all-sub-categories",
      "description": "Show All Sub-Categories",
      "type": 1,
    }, 
    { //sub-category-by-category
      "name": "sub-category-by-category",
      "description": "Show Sub-Categories by Category",
      "type": 1,
      'options': [
        {
          "name": "category-name",
          "description": "Category Name",
          "type": 3,
          "required": true,
        }
      ]
    }, 
    { //all-sources
      "name": "all-sources",
      "description": "Show All Sources",
      "type": 1,
    }, 
    { //source-by-sub-category
      "name": "source-by-sub-category",
      "description": "Show Sources by Sub-Category",
      "type": 1,
      'options': [
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        }
      ]
    }, 
    { //all-incomes
      "name": "all-incomes",
      "description": "Show All Incomes",
      "type": 1,
    }, 
    { //income-by-source
      "name": "income-by-source",
      "description": "Show Incomes by Source",
      "type": 1,
      'options': [
        {
          "name": "source-name",
          "description": "Source Name",
          "type": 3,
          "required": true,
        },
      ]
    }, 
    { //income-by-date
      "name": "income-by-date",
      "description": "Show Incomes by Date",
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
          "description": "Income Date (YYYY-MM-DD)",
          "type": 3,
          "required": false,
        },
      ]
    }, 
    { //all-venues
      "name": "all-venues",
      "description": "Show All Venues",
      "type": 1,
    }, 
    { //venue-by-sub-category
      "name": "venue-by-sub-category",
      "description": "Show Venues by Sub-Category",
      "type": 1,
      'options': [
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        }
      ]
    }, 
    { //all-outcomes
      "name": "all-outcomes",
      "description": "Show All Outcomes",
      "type": 1,
    }, 
    { //outcome-by-venue
      "name": "outcome-by-venue",
      "description": "Show Outcomes by Venue",
      "type": 1,
      'options': [
        {
          "name": "venue-name",
          "description": "Venue Name",
          "type": 3,
          "required": true,
        }
      ]
    }, 
    { //outcome-by-date
      "name": "outcome-by-date",
      "description": "Show Outcomes by Date",
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
          "description": "Outcome Date (YYYY-MM-DD)",
          "type": 3,
          "required": false,
        },
      ]
    } 
  ]},


  /**
   * @param {Interaction} interaction
   */
   run: async ({ interaction }) => {
    const subcommand = interaction.options.getSubcommand();

    //const defer = await interaction.deferReply();
    //const message = await interaction.fetch();

    //console.log('defer: ', defer);

    //const fetch = await interaction.fetchReply();


    //console.log('fetch: ', fetch);

    // if (subcommand === 'category') {
    //   const categoryName = interaction.options.get('category-name').value;
    //   //interaction.reply(`creating a category named ${categoryName}`);
    //   await interaction.deferReply();
    //   const teste = await Category.getCategoryId(categoryName);
    //   console.log(teste);
    //   //await interaction.editReply(`Category named ${teste['categoryName']} Searchd!`);
    //   await interaction.editReply(`finding a category named ${categoryName}`);
    //   if (teste.length > 0) await interaction.editReply(`category named ${categoryName} found`);
    //   else await interaction.editReply(`category named ${categoryName} NOT found`);
    // }

    var qryList = null;
    var strCat = null;
    await interaction.deferReply();

    if (subcommand === 'all-categories') {
      qryList = await Category.getAllCategory();
      strCat = "All Categories: \n";
    }
    else if (subcommand === 'all-sub-categories') {
      qryList = await SubCategory.getAllSubCategory();
      strCat = "All Sub-Categories: \n";
    }
    else if (subcommand === 'sub-category-by-category')  {
      const categoryName = interaction.options.get("category-name").value;
      qryList = await SubCategory.getAllSubCategorybyCat(categoryName);
      strCat = "All Sub-Categories: \n";
    }
    else if (subcommand === 'all-sources') {
      qryList = await Source.getAllSource();
      strCat = "All Sources: \n";
    }
    else if (subcommand === 'source-by-sub-category')  {
      const subCategoryName = interaction.options.get("sub-category-name").value;
      qryList = await SubCategory.getAllSubCategorybyCat(subCategoryName);
      strCat = `All Sources from ${subCategoryName}: \n`;
    }
    else if (subcommand === 'all-incomes') {
      qryList = await Income.getAllIncome();
      strCat = "All Incomes: \n";
    }
    else if (subcommand === 'income-by-source')  {
      const sourceName = interaction.options.get("source-name").value;
      qryList = await Income.getAllIncomebySource(sourceName);
      strCat = `All Sources from ${sourceName}: \n`;
    }
    else if (subcommand === 'income-by-date') {
      const dateType = interaction.options.get("date-type").value;
      var incomeDate;
      if (dateType === 1) incomeDate = new Date().toJSON().slice(0, 10);
      else incomeDate = interaction.options.get("income-date").value;
      qryList = await Income.getAllIncomebyDate(incomeDate);
      strCat = `All Sources at ${incomeDate}: \n`;
    }
    else if (subcommand === 'all-venues')  {
      qryList = await Venue.getAllVenue();
      strCat = "All Venues: \n";
    }
    else if (subcommand === 'venue-by-sub-category') {
      const subCategoryName = interaction.options.get("sub-category-name").value;
      qryList = await Venue.getAllVenuebySubCat(subCategoryName);
      strCat = `All Venues from ${subCategoryName}: \n`;
    }
    else if (subcommand === 'all-outcomes')  {
      qryList = await Outcome.getAllOutcome();
      strCat = "All Outcomes: \n";
    }
    else if (subcommand === 'outcome-by-venue') {
      const venueName = interaction.options.get("venue-name").value;
      qryList = await Outcome.getAllOutcomebyVenue(venueName);
      strCat = `All Outcomes from ${venueName}: \n`;
    }
    else if (subcommand === 'outcome-by-date')  {
      const dateType = interaction.options.get("date-type").value;
      var outcomeDate;
      if (dateType === 1) outcomeDate = new Date().toJSON().slice(0, 10);
      else
        outcomeDate = interaction.options.get("outcome-date").value;
      qryList = await Outcome.getAllOutcomebyDate(outcomeDate);
      strCat = `All Outcomes at ${outcomeDate}: \n`;
    }
    
    if (qryList !== null){
      qryList.forEach(async element =>  {
        strCat += "\n" + element
        console.log(`element: (${element}) added`);
      });
      console.log(`qryList: (${qryList})`);
      const embed = new EmbedBuilder().setDescription(`${strCat}`).setColor(Colors.Blurple);
      await interaction.editReply({ embeds: [embed] });
    }
    
  },

};