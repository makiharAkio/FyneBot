const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  // trxName: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = model('Category', categorySchema); 