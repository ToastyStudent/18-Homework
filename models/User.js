// Dependencies
const { Schema, model } = require('mongoose');

// Definition of Collumns for the Category Model, named username, email, thoughts, and friends respectively

// username is a string, cannot be null, is required, and is unique, meaning only one user can have a given username

// email is a string, cannot be null, is required, and is unique, meaning only one user can have a given email

// thoughts is an array of objectIDs objects defined in the Thought model

// friends is an array of objectIDs objects defined in the User model

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'This must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
