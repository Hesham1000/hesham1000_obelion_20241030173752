import React, { useState, useEffect } from 'react';
import './Comment.css';
import axios from 'axios';

function Comment({ articleId, user }) {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://to_do_App-backend.cloud-stacks.com/api/articles/${articleId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post('https://to_do_App-backend.cloud-stacks.com/api/comments', {
          articleId,
          text: newComment,
          userId: user.id
        });
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  const handleSaveEdit = async (commentId) => {
    if (editingText.trim()) {
      try {
        const response = await axios.put('https://to_do_App-backend.cloud-stacks.com/api/comments', {
          commentId,
          text: editingText
        });
        setComments(comments.map(comment => (comment.id === commentId ? response.data : comment)));
        setEditingCommentId(null);
        setEditingText('');
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://to_do_App-backend.cloud-stacks.com/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  return (
    <div className="comment-section">
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            {editingCommentId === comment.id ? (
              <div className="edit-comment">
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="comment-content">
                <p>{comment.text}</p>
                {user.id === comment.userId && (
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(comment.id, comment.text)}>Edit</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
