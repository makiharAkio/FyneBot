const { Schema, model } = require('mongoose');

const subCategorySchema = new Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model('SubCategory', subCategorySchema); 