import {createTransport} from "nodemailer"
import {forgotPasswordEmailType} from "../schemas/email.schema";

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
    },
    tls: {
        rejectUnauthorized: false,

    }
})

export function sendEmail(data: forgotPasswordEmailType): void {
    const {to, message} = data
    console.log('mail')
    transport.sendMail({
        from: "Link shorter",
        to,
        text: message,
        subject: "Link to reset your password"
    }).then((result) => {
        console.log(result.accepted && result.messageId)
    }).catch(err => {
        console.log(err)
        throw new Error(err)
    })
}
