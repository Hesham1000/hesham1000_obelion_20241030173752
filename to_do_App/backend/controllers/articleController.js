const { Sequelize } = require('sequelize');
const ArticleModel = require('../models/ArticleModel');

// Database connection
const sequelize = new Sequelize('to_do_App', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

// Define functions to handle requests and interact with the database
async function createArticle(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const article = await ArticleModel.create({ title, content });
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function getArticles(req, res) {
  try {
    const articles = await ArticleModel.findAll();
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    
    await article.save();
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.destroy();
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};