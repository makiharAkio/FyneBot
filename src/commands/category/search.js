const { Interaction, EmbedBuilder, Colors } = require('discord.js');
const Category = require('../../database/schema/Category');
const SubCategory = require('../../database/schema/SubCategory');

module.exports = {
  data:{
  "name": "show",
  "description": "Show command",
  
  "options": [
    {
      "name": "categories",
      "description": "Show a Category List",
      "type": 1,
      // 'options': [
      //   {
      //     "name": "category-name",
      //     "description": "Category Name",
      //     "type": 3,
      //     "required": true,
      //   },
      //   // {
      //   //   "name": "trx-name",
      //   //   "description": "Transaction Name",
      //   //   "type": 3,
      //   //   "required": true,
      //   //   "choices": [
      //   //     {
      //   //         "name": "Income",
      //   //         "value": "income"
      //   //     },
      //   //     {
      //   //         "name": "Outcome",
      //   //         "value": "outcome"
      //   //     },
      //   //   ]
      //   // }
      // ]
    },
    {
      "name": "sub-category",
      "description": "Search a Sub-Category by Category",
      "type": 1,
      'options': [
        // {
        //   "name": "sub-category-name",
        //   "description": "Sub-Category Name",
        //   "type": 3,
        //   "required": true,
        // },
        {
          "name": "category-name",
          "description": "Category Name",
          "type": 3,
          "required": true,
        }
      ]},
    {
      "name": "source",
      "description": "Search a Sub-Category",
      "type": 1,
      'options': [
        {
          "name": "source-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        },
        {
          "name": "sub-category-name",
          "description": "Sub-Category Name",
          "type": 3,
          "required": true,
        }
      ]}
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

    if (subcommand === 'categories') {
      qryList = await Category.getAllCategory();
      strCat = "All Categories: \n";
    }
    else if (subcommand === 'sub-category')  {
      const categoryName = interaction.options.get("category-name").value;
      qryList = await SubCategory.getAllSubCategorybyCat(categoryName);
      strCat = "All Sub-Categories: \n";
    }
    else if (subcommand === 'source')  {
      qryList = await Category.getAllCategory();
      strCat = "All Sources: \n";
    }
    else if (subcommand === 'income')  {
      qryList = await Category.getAllCategory();
      strCat = "All Incomes: \n";
    }
    else if (subcommand === 'venue')  {
      qryList = await Category.getAllCategory();
      strCat = "All Venues: \n";
    }
    else if (subcommand === 'outcome')  {
      qryList = await Category.getAllCategory();
      strCat = "All Outcomes: \n";
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