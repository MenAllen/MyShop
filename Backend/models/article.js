const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Article extends Model {}
  
    Article.init({
        articleTitre: {
            type: DataTypes.STRING
        },
        articleDescription: {
            type: DataTypes.STRING
        },
        articleUrl: {
            type: DataTypes.STRING
        },
        articlePrice: {
            type: DataTypes.INTEGER
        },
        articleType: {
            type: DataTypes.STRING
        },
        articleQuantity: {
            type: DataTypes.INTEGER
        },
        articleUsername: {
            type: DataTypes.STRING
        }
    }, 
    {
        sequelize,
        modelName: "Article"
    })
    return Article
}