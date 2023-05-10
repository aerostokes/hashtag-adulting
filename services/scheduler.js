const schedule = require('node-schedule');

// accepts a `Date` object and an `action` callback function
function scheduleJob(jobName, date, action) {
    cancleJob(jobName);
    schedule.scheduleJob(jobName, date, action);
}

function cancleJob(jobName) {
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) existingJob.cancel();
}


module.exports = { scheduleJob, cancleJob };
