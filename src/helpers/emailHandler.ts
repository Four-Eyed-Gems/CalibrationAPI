import { createTransport, Transporter } from 'nodemailer';
import { environmentConfig } from '../constants/index';

export const sendMail = async (email: string, verificationCode: number) => {

    const transporter: Transporter = createTransport({
        service: 'gmail',
        auth: {
            user: environmentConfig.EMAIL_ID,
            pass: environmentConfig.password
        }
    });

    const mailOptions = {
        from: environmentConfig.EMAIL_ID,
        to: email,
        subject: 'Welcome to Test Dev',
        html: `<h2>OTP : ${verificationCode}</h2>`
    };

    const emailStatus = await transporter.sendMail(mailOptions).catch(() => false).then(() => true)
    return emailStatus
}
