import { constant } from "../constants/index";

export const otpGenerator = async () => {
    const { OTP_CHARACTERS, OTP_LENGTH } = constant;
    try {
        let OTP = "";

        for (let i = 0; i < OTP_LENGTH; i++) {
            const randomIndex = Math.floor(Math.random() * OTP_CHARACTERS.length);
            OTP += OTP_CHARACTERS[randomIndex];
        }
        return parseInt(OTP);
    } catch (error) {
        const currentDate = new Date().getTime().toString()
        const OTP = currentDate.substring(currentDate?.length - OTP_LENGTH, currentDate?.length)
        return parseInt(OTP);
    }
}

export const validateOTP = async (expiresIn: any) => {
    try {
        const currentTime = new Date().getTime();
        const otpExpiresTime = new Date(expiresIn).getTime();
        if (currentTime < otpExpiresTime) {
            return true
        }
        return false
    } catch (error) {
        return false;
    }
}