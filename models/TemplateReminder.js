const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TemplateReminder extends Model{};
TemplateReminder.init({
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastDone: {
        type: DataTypes.DATEONLY,
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    numIntervals: {
        type: DataTypes.INTEGER,
    },
    timeInterval: {
        type: DataTypes.STRING,
    },
    nextDue: {
        type: DataTypes.DATEONLY,
    },
    note: {
        type: DataTypes.TEXT,
    },
},{
    sequelize,
});

module.exports = TemplateReminder;