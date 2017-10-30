const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const EventSchema = new Schema({
  owner: {
    _id: { type: Schema.Types.ObjectId },
    first: { type: String },
    last: {type: String},
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  hexColor: {
    type: String
  },
  hashtags: {
    type: Object
  },
  calendarId: [{
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
  }],
  people: [{
    _id: {type: Schema.Types.ObjectId, ref: 'User'},
    firstName: {type: String},
    lastName: {type: String},
  }],
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('Event', EventSchema);
