const { Schema, model } = require('mongoose');

const outcomeSchema = new Schema({
  outcomeDate: {
    type: Date,
    required: true,
  },
  outcomeAmmount: {
    type: Number,
    required: true,
  },
  outcomeComment: {
    type: String,
    required: false,
  },
  venueId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model('Outcome', outcomeSchema); 