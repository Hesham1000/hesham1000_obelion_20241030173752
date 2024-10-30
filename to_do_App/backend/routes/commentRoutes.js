const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Middleware to handle errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all comments for an article
router.get('/articles/:articleId/comments', asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const comments = await commentController.getCommentsByArticleId(articleId);
  res.status(200).json(comments);
}));

// Add a new comment to an article
router.post('/articles/:articleId/comments', asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { text, userId } = req.body;
  const newComment = await commentController.addComment(articleId, text, userId);
  res.status(201).json(newComment);
}));

// Edit an existing comment
router.put('/comments/:commentId', asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const updatedComment = await commentController.editComment(commentId, text);
  res.status(200).json(updatedComment);
}));

// Delete a comment
router.delete('/comments/:commentId', asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  await commentController.deleteComment(commentId);
  res.status(204).send();
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = router;