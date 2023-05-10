const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { sendMail, scheduleJob } = require("../services");

class Reminder extends Model {}

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
    hooks: {
        afterCreate: async (reminder) => {
            const category = await reminder.getCategory();
            const user = category.getUser();

            scheduleJob(
                new Date(reminder.nextDue),
                () => sendMail(user.email, reminder.note),
            );
        }
    }
});

module.exports = Reminder;