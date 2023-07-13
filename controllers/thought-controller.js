// Dependencies
const { Thought, User } = require('../models');

const thoughtController = {
  // An asyncrounous function that fetches all thoughts
  async getThoughts(req, res) {
    try {
      const databaseThoughtData = await Thought.find()
        .sort({ createdAt: -1 });

      res.json(databaseThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // An asyncrounous function that fetches a single thought using its id
  async getSingleThought(req, res) {
    try {
      // Creates a variable that stores the thought with the given id provided by the user in the request parameters
      const databaseThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

      // Conditional Statement that checks if there is a thought with the given id, resulting in a 404 error if there is not
      if (!databaseThoughtData) {
        return res.status(404).json({ message: 'There is no thought in the database with that id!' });
      }

      res.json(databaseThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // An asyncrounous function that creates a thought
  async createThought(req, res) {
    try {
      // Creates a variable that stores the thought created by the user in the request body
      const databaseThoughtData = await Thought.create(req.body);

      // Creates a variable that stores the user with the given id provided by the user in the request body
      // Before pushing the thought into the user's thoughts array and saving the user's data
      const databaseUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: databaseThoughtData._id } },
        { new: true }
      );
      
      // A conditional statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'The thought was succesfully created, but there is no user in the database with that id!' });
      }

      res.json({ message: 'The thought was successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  // An asyncrounous function that updates a thought
  async updateThought(req, res) {
    // Creates a variable that stores the thought with the given id provided by the user in the request parameters
    const databaseThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

    // Conditional Statement that checks if there is a thought with the given id, resulting in a 404 error if there is not
    if (!databaseThoughtData) {
      return res.status(404).json({ message: 'There is no thought in the database with that id!' });
    }

    res.json(databaseThoughtData);

    console.log(err);
    res.status(500).json(err);
  },
  
  // An asyncrounous function that deletes a thought
  async deleteThought(req, res) {
    try {
      // Creates a variable that stores the thought with the given id provided by the user in the request parameters
      const databaseThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

      // Conditional Statement that checks if there is a thought with the given id, resulting in a 404 error if there is not
      if (!databaseThoughtData) {
        return res.status(404).json({ message: 'There is no thought in the database with that id!' });
      }

      // Creates a variable that stores the user with the given id provided by the user in the request parameters
      // And removes the thought from the user's thoughts array and saves the user's data
      const databaseUserData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      // Conditional Statement that checks if there is a user with the given id, resulting in a 404 error if there is not
      if (!databaseUserData) {
        return res.status(404).json({ message: 'There is no user in the database with that id!' });
      }

      res.json({ message: 'The thought has successfully been deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // An asyncrounous function that adds a reaction to a thought
  async addReaction(req, res) {
    try {
      // Creates a variable that stores the thought with the given id provided by the user in the request parameters
      // And adds the reaction to the thought's reactions array and saves the thought's data
      const databaseThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      
      // Conditional Statement that checks if there is a thought with the given id, resulting in a 404 error if there is not
      if (!databaseThoughtData) {
        return res.status(404).json({ message: 'There is no thought in the database with that id!' });
      }

      res.json(databaseThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // An asyncrounous function that removes a reaction from a thought
  async removeReaction(req, res) {
    try {
      // Creates a variable that stores the thought with the given id provided by the user in the request parameters
      // And removes the reaction from the thought's reactions array and saves the thought's data
      const databaseThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      
      // A conditional statement that checks if there is a thought with the given id, resulting in a 404 error if there is not
      if (!databaseThoughtData) {
        return res.status(404).json({ message: 'There is no thought in the database with that id!' });
      }

      res.json(databaseThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
