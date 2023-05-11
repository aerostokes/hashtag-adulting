const schedule = require('node-schedule');

// accepts a `Date` object and an `action` callback function
function scheduleJob(jobName, date, action) {
    cancelJob(jobName);
    schedule.scheduleJob(jobName, date, action);
}

function cancelJob(jobName) {
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) existingJob.cancel();
}


module.exports = { scheduleJob, cancelJob };
