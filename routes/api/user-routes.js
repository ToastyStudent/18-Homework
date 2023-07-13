// Dependencies
const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// The route at /api/users is used to create a new user when written to with a POST request 
// and to return all users when accessed with a GET request using their respective controller methods
// imported from the user-controller.js file above.
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId is used for getting a single user by their _id when accessed with a GET request, 
// updating a user by their _id when accessed with a PUT request, and deleting a user by their _id when accessed with a DELETE request
// using their respective controller methods imported from the user-controller.js file above.
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId is used for adding a new friend to a user's friend list when accessed with a POST request
// and for removing a friend from a user's friend list when accessed with a DELETE request using their respective controller methods
// imported from the user-controller.js file above.
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
