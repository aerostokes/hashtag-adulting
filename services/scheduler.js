const schedule = require('node-schedule');

// accepts a `Date` object and an `action` callback function
function scheduleJob(date, action) {
    schedule.scheduleJob(date, action);
}

module.exports = { scheduleJob };