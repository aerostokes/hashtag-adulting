const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Category extends Model {}

module.exports = Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emoji: {
            type: DataTypes.STRING(5),
        },
        color: {
            type: DataTypes.STRING,
        },
    }, 
    { sequelize },
);
