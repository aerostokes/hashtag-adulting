const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const { sendMail, scheduleJob, cancelJob } = require("../services");

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
        afterCreate: handleAfterCreateAndUpdate,
        afterUpdate: handleAfterCreateAndUpdate,
        beforeDestroy: handleBeforeDestroy,
    }
});

async function handleAfterCreateAndUpdate(reminder) {
    // gets User from Reminder's Category
    const category = await reminder.getCategory();
    const user = await category.getUser();

    // creates a job with the `jobName` that is the Reminder's ID
    scheduleJob(
        `${reminder.id}`,
        new Date(reminder.nextDue),
        () => sendMail(user.email, reminder.note),
    );
}

function handleBeforeDestroy(reminder) {
    cancelJob(`${reminder.id}`);
}

module.exports = Reminder;