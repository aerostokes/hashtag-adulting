const { sendMail } = require("./mailer");
const { scheduleJob } = require("./scheduler");

module.exports = { sendMail, scheduleJob };