const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
  venueName: {
    type: String,
    required: true,
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model('Venue', venueSchema); 