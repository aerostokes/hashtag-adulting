const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { sendMail, scheduleJob } = require("../services");

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
    hooks: {
        afterCreate: (reminder) => {
            scheduleJob(
                // TODO: replace with actual date
                new Date(),
                // TODO: get user's actual email address
                () => sendMail('example@example.com', reminder.note),
            );
        }
    }
});

module.exports = Reminder;