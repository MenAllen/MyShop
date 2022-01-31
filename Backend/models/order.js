const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {}
  
    Order.init({
        username: {
          type: DataTypes.STRING
        },
        date: {
          type: DataTypes.DATE          
        },
        totalprice: {
          type: DataTypes.INTEGER
        },
        type: {
          type: DataTypes.STRING
        },
        titre: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.INTEGER
        },
        quantity: {
          type: DataTypes.INTEGER
        }
    }, 
    {
        sequelize,
        modelName: "Order"
    })
    return Order
}