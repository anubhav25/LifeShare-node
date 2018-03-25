function requireLogin(req, res, next) {
    if (!req.user) {
        console.log("not found");
        res.redirect('/login');
    } else {
        console.log("found");
        next();
    }
}

var express = require('express');
var app = express.Router();
var adminLogin = require('../models/adminLogin');
var donorRequest = require('../models/donorRequest');
var bloodBankRequest = require('../models/bloodBankRequest');
var donor = require('../models/donor');
var sendMail = require('./email');
var bloodBank = require('../models/bloodBank');

app.get('/', requireLogin, (req, res) => {
    donorRequest.find({}, { _id: 0 }).limit(20).exec((err, donors) => {
        if (err) {
            res.json({ resp: false, error: 'server error' });
        } else {
            bloodBankRequest.find({}, { _id: 0 }).limit(20).exec((err, banks) => {
                if (err) {
                    res.json({ resp: false, error: 'server error' });
                } else {
                    res.render('admin', { users: donors, banks: banks });
                }
            })
        }
    })
})
app.get('/login', function(req, res) {
    res.render('login');
});
app.get('/logout', function(req, res) {
    req.session_state.reset();
    res.redirect('/');
});
app.get('/profile/:id', (req, res, next) => {

    donor.findOne({ email: req.params.id }, { _id: 0 }, (err, donor) => {
        if (err) {
            throw err;
        } else if (donor) {
            res.render('profileDonor', { user: donor });
        } else {
            bloodBank.findOne({ email: req.params.id }, { _id: 0 }, (err, bank) => {
                if (err) {
                    throw err;
                } else if (bank) {
                    res.render('profileBank', { user: bank });
                } else {
                    donorRequest.findOne({ email: req.params.id }, { _id: 0 }, (err, donor) => {
                        if (err) {
                            throw err;
                        } else if (donor) {
                            res.render('profileDonor', { user: donor });
                        } else {
                            bloodBankRequest.findOne({ email: req.params.id }, { _id: 0 }, (err, bank) => {
                                console.log(bank)
                                if (err) {
                                    throw err;
                                } else if (bank) {

                                    res.render('profileBank', { user: bank });
                                } else {
                                    var err = new Error('Not Found');
                                    next(err);
                                }
                            })
                        }
                    })
                }
            })
        }
    })

});


app.get('/acceptDonor/:email', (req, res) => {
    var email = req.params.email;
    console.log(email);
    
    donorRequest.findOne({ email: email },{_id : 0, __v : 0},(err, data) => {
        if (err) {
            res.json({ resp: false, error: 'server 1 error!!' });
        } else {

            (new donor({
 email: data.email,
    phoneNo :data.phoneNo,
    name: data.name,

    DOB: {
        date : data.DOB.date,
        month : data.DOB.month,
        year : data.DOB.year
    },
    BloodGroup : data.BloodGroup,
    documentFront :data.documentFront,
    documentBack :data.documentBack,
    longitude : data.longitude,
    latitude : data.latitude
            })).save((err, dbdonor) => {
                if (err) {
                    console.log(err);
                    res.json({ resp: false, error: 'server 2 error!!' , err: err, obj: data});
                } else {
                    donorRequest.remove({ email: dbdonor.email }, (err) => {
                        if (err) {
                            res.json({ resp: false, error: 'server 3 error!!' });
                        } else {
                            sendMail('registration successful at LifeShare', `
                            <h4>Congratulations!, Your LifeShare account was accepted.</h4>
                            <h4>Now you can use the app.</h4>`, dbdonor.email)
                            res.redirect('/');
                        }
                    })
                }
            })

        }
    })
})



app.get('/rejectDonor/:id', (req, res) => {
    donorRequest.remove({ email: req.params.id }, (err) => {
        if (err) {
            res.json({ resp: false, error: 'server error!!' });
        } else {
            sendMail('registration declined from LifeShare', `
                            <h4>Your LifeShare account was not accepted.</h4>
                            <h4>You can always try again</h4>`, req.params.id)
            res.redirect('/');
        }
    })
})



app.get('/acceptBank/:email', (req, res) => {
    var email = req.params.email;
    bloodBankRequest.findOne({ email: email },{_id : 0, __v : 0},(err, data) => {
        if (err) {
            res.json({ resp: false, error: 'server 1 error!!' });
        } else {

            (new bloodBank({
                 email:data.email,
    phoneNo :data.phoneNo,
    name: data.name,
    document :data.document,
    longitude : data.longitude,
    latitude : data.latitude

            })).save((err, dbdonor) => {
                if (err) {
                    console.log(err);
                    res.json({ resp: false, error: 'server 2 error!!' , err: err, obj: data});
                } else {
                    bloodBankRequest.remove({ email: dbdonor.email }, (err) => {
                        if (err) {
                            res.json({ resp: false, error: 'server 3 error!!' });
                        } else {
                            sendMail('registration successful at LifeShare', `
                            <h4>Congratulations!, Your LifeShare account was accepted.</h4>
                            <h4>Now you can use the app.</h4>`, dbdonor.email)
                            res.redirect('/');
                        }
                    })
                }
            })

        }
    })
})



app.get('/rejectBank/:id', (req, res) => {
    bloodBankRequest.remove({ email: req.params.id }, (err) => {
        if (err) {
            res.json({ resp: false, error: 'server error!!' });
        } else {
                        sendMail('registration declined from LifeShare', `
                            <h4>Your LifeShare account was not accepted.</h4>
                            <h4>You can always try again</h4>`, req.params.id)
           res.redirect('/');
        }
    })
})



app.post('/login', function(req, res) {
    adminLogin.findOne({ username: req.body.username }, function(err, obj) {

        if (err) {
            res.json({ resp: false, error: 'server error' });
        }
        if (obj) {

            if (obj.password === req.body.password) {
                req.session_state.user = obj;
                res.json({ resp: true });
            } else {
                res.json({ resp: false, error: 'password do not match' });
            }


        } else {
            res.json({ resp: false, error: 'user name does not exists' });
        }
    });
    /*(new adminLogin({username : 'anubhav' , password : 'anubhav'})).save((err,a)=>{
    	console.log(err||a)
    });*/
});
app.get('/getDonorsRequest', (req, res) => {
    donorRequest.find({}, { _id: 0 }).limit(20).exec((err, resp) => {
        if (err) {
            res.json({ resp: false, error: 'server error' });
        } else {
            res.json(resp);
        }
    })
});
app.get('/getBloodBankRequest', (req, res) => {
    bloodBankRequest.find({}, { _id: 0 }).limit(20).exec((err, resp) => {
        if (err) {
            res.json({ resp: false, error: 'server error' });
        } else {
            res.json(resp);
        }
    })
})

module.exports = app;
