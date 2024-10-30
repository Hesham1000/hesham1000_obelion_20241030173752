const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('to_do_App', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Article extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      modelName: 'articles',
      timestamps: false
    });
  }
}

Article.init(sequelize);

module.exports = Article;