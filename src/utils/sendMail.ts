import { transporter } from "../config/mailer.config";

export const sendMail = async (
    from: string,
    to: string,
    subject: string,
    html: string
) => {
    await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });
};
