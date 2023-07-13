// Dependencies
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// The route at /api/thoughts is used to create a new thought when written to with a POST request, 
// and to return all thoughts when accessed with a GET request.
router.route('/').get(getThoughts).post(createThought);

// The route at /api/thoughts/:thoughtId is used for getting a single thought by its _id when accessed with a GET request,
// updating a thought by its _id when accessed with a PUT request, and deleting a thought by its id when accessed with a DELETE request.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// The route at /api/thoughts/:thoughtId/reactions is used for creating a reaction stored in a single thought's reactions array field 
// by that thought's _id when accessed with a POST request.
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId is used for deleting a reaction by the reaction's reactionId 
// value when accessed with a DELETE request.
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
