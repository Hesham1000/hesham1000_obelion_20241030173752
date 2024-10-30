import React, { useState } from 'react';
import './Article.css';
import axios from 'axios';

function Article() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState([]);

  const handlePublish = async () => {
    if (title && content) {
      try {
        const response = await axios.post('https://to_do_App-backend.cloud-stacks.com/api/articles', {
          title,
          content,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setIsPublished(true);
        setArticles([...articles, response.data]);
      } catch (error) {
        setError('An error occurred while publishing the article.');
      }
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://to_do_App-backend.cloud-stacks.com/api/articles');
      setArticles(response.data);
    } catch (error) {
      setError('An error occurred while retrieving articles.');
    }
  };

  return (
    <div className="article-container">
      <h1>Create an Article</h1>
      <div className="article-form">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="article-title-input"
        />
        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="article-content-textarea"
        />
        <button onClick={handlePublish} className="publish-button">
          Publish
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {isPublished && (
        <div className="article-preview">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      )}
      <button onClick={fetchArticles} className="fetch-articles-button">
        Fetch Articles
      </button>
      <div className="article-list">
        {articles.map(article => (
          <div key={article.id} className="article-item">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Article;
