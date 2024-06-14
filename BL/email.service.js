const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "gmail",
    // secure:false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

//needs email address, title=title of the email, html=component with all data end css ,text=text or html
async function sendEmail({ email, title, html, text }) {
    const mailOptions = {
        from: "Merry Botanics ",
        to: email,
        subject: title,
        html: html,
        text: text
    }

    // -----------------



    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) { throw err }
        else { res.send("email send to -" + info.response) }
    })
}

module.exports = { sendEmail }
