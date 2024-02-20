import emailSender from "../utils/nodeMailer.js";

const sendMail = async (toEmail, fromEmail, subject, text, html) => {
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject,
        text,
        html,
    };
    emailSender.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error;
        }
        console.log("Email sent: " + info.response);
        return info.response;
    });
};

const testEmail = async () => {
    emailSender.sendMail(
        {
            from: fromEmail,
            to: toEmail,
            subject,
            text,
            html,
        },
        (error, info) => {
            if (error) {
                console.log(error);
                return error;
            }
            console.log("Email sent: " + info.response);
            return info.response;
        }
    );
};

export default {
    sendMail,
};
