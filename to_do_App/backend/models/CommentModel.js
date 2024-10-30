const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('to_do_App', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Comment extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
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
      sequelize,
      modelName: 'comments', // Matches the table name in the database
      timestamps: false // Disable timestamps
    });
  }
}

module.exports = Comment;