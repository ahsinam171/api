import {config} from 'dotenv';
import sgMail from "@sendgrid/mail";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (reciever, source, subject, content) => {
    try {
        const data = {
            to: reciever,
            from: source,
            subject,
            html: content,
        };
        return sgMail.send(data);
    } catch (e) {
        return new Error(e);
        
    }
}

export default sendEmail;

