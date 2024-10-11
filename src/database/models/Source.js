const { Schema, model } = require('mongoose');

const sourceSchema = new Schema({
  sourceName: {
    type: String,
    required: true,
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model('Source', sourceSchema); 