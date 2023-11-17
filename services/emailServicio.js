// services/emailService.js
import { transporter } from "../config/mailer.js";

const sendEmail = async (to, subject, text) => {
    try {
    const mailOptions = {
        from: transporter.options.auth.user,
        to,
        subject,
        text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export { sendEmail };
