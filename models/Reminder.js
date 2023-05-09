const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reminder extends Model{};
Reminder.init({
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
    numPeriods: {
        type: DataTypes.INTEGER,
    },
    timePeriod: {
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

module.exports = Reminder;