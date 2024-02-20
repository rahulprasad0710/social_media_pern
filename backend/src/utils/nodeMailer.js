import nodemailer from "nodemailer";
import EmailConfig from "../config/email.config.js";

const emailSender = nodemailer.createTransport({
    host: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: EmailConfig.NODEMAILER_EMAIL,
        pass: EmailConfig.NODEMAILER_PASSWORD,
    },
});

export default emailSender;
