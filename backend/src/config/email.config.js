import dotenv from "dotenv";

dotenv.config();

const EmailConfig = {
    NODEMAILER_EMAIL: process.env.MAIL_EMAIL,
    NODEMAILER_PASSWORD: process.env.MAIL_PASSWORD,
    HOST: process.env.MAIL_HOST,
};

export default EmailConfig;
