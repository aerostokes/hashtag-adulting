const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to, text) {
    const msg = {
        to,
        from: 'adultingdoesnthavetobehard@gmail.com',
        subject: 'Adulting Reminder!',
        text: text,
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