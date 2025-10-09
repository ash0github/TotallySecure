const mailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

//transporter configured with auth credentials for the emailer accn
const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
    },
});

//OTP function
exports.sendEmail = async (email, code) => {
    const mailOptions = {
        from: '"TotallySecure"<no-reply@totallysecure.com>',
        to: email,
        subject: 'Your one-time verification code',
        text: `Your verification code is: ${code}\n\nThis code will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

//Reg function
exports.confirmRegMail = async (email, accountNumber) => {
    const mailOptions = {
        from: '"TotallySecure"<no-reply@totallysecure.com>',
        to: email,
        subject: 'Welcome to TotallySecure!',
        text: `Your account: ${accountNumber} , has been registered successfully.\n\nWe look forward to having you on board. Enjoy your stay!`,
    };

    await transporter.sendMail(mailOptions);
}