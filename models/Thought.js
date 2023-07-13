// Dependencies
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Definition of Collumns for the Category Model, named thoughtText, createdAt, username, and reactions respectively

// thoughtText is a string, cannot be null, is required, and has a minimum length of 1 and max length of 250 characters

// createdAt is a date and defaults to the current date

// username is a string, cannot be null, and is required

// reactions is an array of reactionSchema objects defined in the Reaction model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You cannot create an empty thought!',
      minlength: 1,
      maxlength: 250
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
