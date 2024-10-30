import React, { useState } from 'react';
import './ArticlePage.css';
import axios from 'axios';

const ArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePublish = async () => {
    if (title && content) {
      try {
        const response = await axios.post('https://to_do_App-backend.cloud-stacks.com/api/articles', {
          title,
          content,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          setIsPublished(true);
          setErrorMessage('');
        }
      } catch (error) {
        setErrorMessage('An error occurred while creating the article.');
      }
    } else {
      setErrorMessage('Title and content are required.');
    }
  };

  return (
    <div className="article-page">
      <h1>Create and Publish Article</h1>
      <div className="editor">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={handleTitleChange}
          className="title-input"
        />
        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={handleContentChange}
          className="content-textarea"
        />
        <button onClick={handlePublish} className="publish-button">
          Publish
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {isPublished && (
        <div className="published-message">
          <h2>Your article has been published!</h2>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
