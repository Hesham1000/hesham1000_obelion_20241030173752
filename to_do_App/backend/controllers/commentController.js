const { CommentModel } = require('../models/CommentModel');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('to_do_App', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'comments',
  timestamps: false
});

const addComment = async (req, res) => {
  try {
    const { articleId, text, userId } = req.body;
    if (!articleId || !text || !userId) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const newComment = await Comment.create({ articleId, text, userId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId, text } = req.body;
    if (!commentId || !text) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = {
  addComment,
  editComment,
  deleteComment,
};