import { createTransport, Transporter } from 'nodemailer';
import { environmentConfig } from '../constants/index';

export const sendMail = async (email: string, verificationCode: any) => {
    let html;
    const transporter: Transporter = createTransport({
        service: 'gmail',
        auth: {
            user: environmentConfig.EMAIL_ID,
            pass: environmentConfig.password
        }
    });

    const isOtp = /^[0-9]{6}$/.test(verificationCode);
    if (isOtp) {
        html = `<h2>OTP : ${verificationCode}</h2>`
    }
    else {
        const hostName = environmentConfig?.NODE_ENV == "development" ?
            `http://localhost:${environmentConfig.PORT}/auth/verifyOTP/${verificationCode}` : ""

        html = `code  : <a href=${hostName}>${hostName}</a>`;
    }

    const mailOptions = {
        from: environmentConfig.EMAIL_ID,
        to: email,
        subject: 'Welcome to Test Dev',
        html: html
    };

    const emailStatus = await transporter.sendMail(mailOptions).catch(() => false).then(info => info ? true : false)
    return emailStatus
}
