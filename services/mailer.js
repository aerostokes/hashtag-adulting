const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to, html) {
    const msg = {
        to,
        from: 'adultingdoesnthavetobehard@gmail.com',
        subject: 'Adulting Reminder!',
        html: html,
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
        console.error(error.response.body)
        }
    }
}

module.exports = { sendMail };