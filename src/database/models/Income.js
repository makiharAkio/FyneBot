const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
  incomeDate: {
    type: Date,
    required: true,
  },
  incomeAmmount: {
    type: Number,
    required: true,
  },
  sourceId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = model('Income', incomeSchema); 