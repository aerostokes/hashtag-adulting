const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const brcrypt = require("bcrypt");

class User extends Model{};
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    mobile: {
        type: DataTypes.STRING,
        validate: {
            //TODO: add regexp for phone number
        },
    },
    contactEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    contactText: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},{
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = brcrypt.hashSync(userObj.password, 3);
            return userObj;
        },
    },
});

module.exports = User;