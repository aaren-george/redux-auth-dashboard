const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const CalendarSchema = new Schema({
  calName: {
    type: String,
    required: true
  },
  owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User'
  }
});

module.exports = mongoose.model('Calendar', CalendarSchema);