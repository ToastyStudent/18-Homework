const { User, Thought } = require('../models');

const userController = {
  // An asyncrounous function that fetches all users
  async getUsers(req, res) {
    // Attempt to retrieve all users from the database
    try {
      const databaseUserData = await User.find()
        .select('-__v')

      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // An asyncrounous function that fetches a single user using its id
  async getSingleUser(req, res) {
    // Attempt to retrieve a single user from the database using the id provided by the user in the request parameters
    try {
      const databaseUserData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      // Conditional Statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user with this id in the database!' });
      }

      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // An asyncrounous function that creates a new user
  async createUser(req, res) {
    // Attempt to create a new user in the database using the data provided by the user in the request body
    try {
      const databaseUserData = await User.create(req.body);
      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // An asyncrounous function that updates a user by its id
  async updateUser(req, res) {
    // Creates a variable that stores the user with the given id provided by the user in the request parameters
    // Before updating the user's data
    try {
      const databaseUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      // Conditional Statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user in the database with this id!' });
      }

      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // An asyncrounous function that deletes a user by its id and its associated thoughts
  async deleteUser(req, res) {
    // Attempt to delete a user from the database using the id provided by the user in the request parameters
    try {
      const databaseUserData = await User.findOneAndDelete({ _id: req.params.userId })

      // A conditional statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user with this id in the database!' });
      }

      // Deletes all thoughts associated with the deleted user using the id provided by the user in the request parameters
      await Thought.deleteMany({ _id: { $in: databaseUserData.thoughts } });
      res.json({ message: 'The user and their associated thoughts have been deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Asyncrounous function for adding a friend to a user's friend list
  async addFriend(req, res) {
    // Attempt to add a friend to a user's friend list using the id of the other user provided by the user in the request parameters by
    // storing that potential friend's id in a variable
    try {
      const databaseUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

      // Conditional Statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user in the database with this id!' });
      }

      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Asyncrounous function for removing a friend from a user's friend list
  async removeFriend(req, res) {
    // Attempt to remove a friend from a user's friend list using the id of the other user provided by the user in the request parameters by
    // storing that potential friend's id in a variable
    try {
      const databaseUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

      // Conditional Statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user in the database with this id!' });
      }

      res.json(databaseUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
