const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "diyoraharsh6@gmail.com",
        pass: "msqt ibfu qevt tlwo"
    }
})
const sendingMail = (to, subject, html) => {
const mailOptions = {
        from: "diyoraharsh6@gmail.com",
        to: to,
        subject,
        html
    }
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    })
}


module.exports = sendingMail