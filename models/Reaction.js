// Dependencies
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Definition of Collumns for the Category Model, named reactionId, reactionBody,
// username, and createdAt respectively

// reactionID is an objectID generated upon creation of a reaction and defaults to a new objectID
// reactionBody is a string, cannot be null, and has a max length of 280 characters
// username is a string and cannot be null
// createdAt is a date and defaults to the current date

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
