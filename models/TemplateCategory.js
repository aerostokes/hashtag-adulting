const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TemplateCategory extends Model {}

module.exports = TemplateCategory.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emoji: {
            type: DataTypes.STRING(2),
        },
        color: {
            type: DataTypes.STRING,
        },
    }, 
    { sequelize },
);
