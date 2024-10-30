CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    articleId INT NOT NULL,
    parentId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (articleId) REFERENCES articles(id),
    FOREIGN KEY (parentId) REFERENCES comments(id)
);
