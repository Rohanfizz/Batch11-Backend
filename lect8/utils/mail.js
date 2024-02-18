const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1) Create trasporter

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        logger: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) DEFINE EMAIL OPTIONS
    const mailOptions = {
        from: "Rohan Sharma",
        to: options.email,
        subject: options.subject,
        text: options.message,
        pool: { maxSockets: 20 },
        // html:
    };

    //   3) Actually send the email
    console.log("now sending");
    await transporter.sendMail(mailOptions);
    console.log("sent");
};

module.exports = sendEmail;
