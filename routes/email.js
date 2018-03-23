/**
 * Created by ANUBHAV on 20-Sep-17.
 */

var nodemailer = require('nodemailer');

var mymail = 'uietkuk.erp@gmail.com';
var mypass = 'anubhavsunil';

function sendMail(sub, data, to, res) {
    console.log("sending mail");
    var mailOptions = {
        from: mymail,
        to: to,
        subject: sub,
        html: data
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mymail,
            pass: mypass
        }
    });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ error: 'email not sent', resp: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ resp: true });
        }
    });


}

module.exports = sendMail;