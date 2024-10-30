const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const { ArticleController } = require('../controllers/ArticleController');

const db = new Sequelize('to_do_App', 'root', 'root', {
    host: 'db',
    port: 3306,
    dialect: 'mysql'
});

const Article = db.define('Article', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

router.post('/articles', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        const article = await ArticleController.createArticle(title, content);
        return res.status(201).json(article);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the article.' });
    }
});

router.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleController.getAllArticles();
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while retrieving articles.' });
    }
});

router.get('/articles/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await ArticleController.getArticleById(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while retrieving the article.' });
    }
});

router.put('/articles/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        const updatedArticle = await ArticleController.updateArticle(articleId, title, content);
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(200).json(updatedArticle);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the article.' });
    }
});

router.delete('/articles/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const deleted = await ArticleController.deleteArticle(articleId);
        if (!deleted) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the article.' });
    }
});

module.exports = router;