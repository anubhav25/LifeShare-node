var express = require('express');
var sendMail = require('./email');
var donor = require('../models/donor')
var bloodBank = require('../models/bloodBank')
var app = express.Router();

app.post('/registerDonor', (req, res) => {
    bloodBank.findOne({ email: req.body.email }, (err, bank) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (bank) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            donor.findOne({ email: req.body.email }, (err, donor) => {
                if (err) {
                    res.json({ error: 'server error!!', resp: false });
                } else if (bank) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
                    (new donor(req.body)).save((err, donor) => {
                        if (donor) {
                            res.json({ resp: true });
                        } else {
                            res.json({ error: 'server error!!', resp: false });
                        }
                    });
                }
            })
        }
    })
})
app.post('/registerBank', (req, res) => {
    donor.findOne({ email: req.body.email }, (err, donor) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (donor) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            bloodBank.findOne({ email: req.body.email }, (err, bank) => {
                if (err) {
                    res.json({ error: 'server error!!', resp: false });
                } else if (bank) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
                    (new bloodBank(req.body)).save((err, bank) => {
                        if (bank) {
                            res.json({ resp: true });
                        } else {
                            res.json({ error: 'server error!!', resp: false });
                        }
                    });
                }
            })
        }
    })
})
app.post('/verifyemail', (req, res) => {
    var email = req.body.email;
    var otp = req.body.otp;
    console.log(otp + email);
    if (email && otp) {
        sendMail('OTP for login in LifeShare', `
		<h2> Welcome to lifeshare</h2>
		<h3> Your OTP for LifeShare App is </h3>
		<h2> ${ otp } </h2>
		`, email, res);
    } else {
        res.json({ error: 'email or OTP not found', resp: false });
    }
});


module.exports = app;