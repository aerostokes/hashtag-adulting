const schedule = require('node-schedule');

// accepts a `Date` object and an `action` callback function
function scheduleJob(jobName, date, action) {
    // cancel the existing job if it exists
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) existingJob.cancel();

    schedule.scheduleJob(jobName, date, action);
}

module.exports = { scheduleJob };