
var express = require('express');
var sendMail = require('./email');
var donor = require('../models/donor')
var bloodBank = require('../models/bloodBank')
var donorRequest = require('../models/donorRequest');
var bloodBankRequest = require('../models/bloodBankRequest');
var app = express.Router();
    var fcm = require('./fcm');


app.post('/registerDonor', (req, res) => {
/*    bloodBank.findOne({ email: req.body.email }, (err, bank) => {
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
    })*/
    bloodBankRequest.findOne({ email: req.body.email }, (err, bank) => {
        console.log(req.body)
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (bank) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            donorRequest.findOne({ email: req.body.email }, (err, donorReq) => {
                if (err) {
                    res.json({ error: 'server error!!', resp: false });
                } else if (donorReq) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
                    bloodBank.findOne({ email: req.body.email }, (err, bank) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (bank) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            donor.findOne({ email: req.body.email }, (err, mydonor) => {
                if (err) {
                    console.log(err);
                    res.json({ error: 'server error!!', resp: false });
                } else if (mydonor) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
                    (new donorRequest(req.body)).save((err, donor) => {
                        if (donor) {
                            res.json({ resp: true });
                        } else {
                            console.log(err);
                    res.json({ error: 'Invalid Details', resp: false });

                        }
                    });
                }
            })
        }
    })
              /*      (new donor(req.body)).save((err, donor) => {
                        if (donor) {
                            res.json({ resp: true });
                        } else {
                            res.json({ error: 'server error!!', resp: false });
                        }
                    });*/
                }
            })
        }
    })
})

app.post('/registerBank', (req, res) => {
    donorRequest.findOne({ email: req.body.email }, (err, mydonor) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (mydonor) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            bloodBankRequest.findOne({ email: req.body.email }, (err, bank) => {
                if (err) {
                    res.json({ error: 'server 1 error!!', resp: false });
                } else if (bank) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
donor.findOne({ email: req.body.email }, (err, mydonor) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false });
        } else if (mydonor) {
            res.json({ error: 'email already exists.', resp: false });
        } else {
            bloodBank.findOne({ email: req.body.email }, (err, bank) => {
                if (err) {
                    res.json({ error: 'server 3 error!!', resp: false });
                } else if (bank) {
                    res.json({ error: 'email already exists.', resp: false });
                } else {
                    (new bloodBankRequest(req.body)).save((err, bank) => {
                        if (bank) {
                            res.json({ resp: true });
                        } else {
                        		console.log(err);
                            res.json({ error: 'Invalid Details', resp: false });
                        }
                    });
                }
            })
        }
    })
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
app.get('/isOldUser/:email',(req,res)=>{
    bloodBank.findOne({email : req.params.email},(err,bank)=>{
         if (err) {
            res.json({ error: 'server error!!', respCode: 0 });
        } else if(bank){
            res.json({respCode : 1,user : bank})
        } else {
                donor.findOne({email : req.params.email},(err,bank)=>{
         if (err) {
            res.json({ error: 'server error!!', respCode: 0 });
        } else if(bank){
            res.json({respCode : 2,user : bank})
        } else {
    bloodBankRequest.findOne({email : req.params.email},(err,bank)=>{
         if (err) {
            res.json({ error: 'server error!!', respCode: 0 });
        } else if(bank){
            res.json({respCode : 3,user : bank})
        } else {

    donorRequest.findOne({email : req.params.email},(err,bank)=>{
         if (err) {
            res.json({ error: 'server error!!', respCode: 0 });
        } else if(bank){
            res.json({respCode : 4,user : bank})
        } else {
 res.json({respCode : 5})

        }
    });
        }
    });

        }
    });

        }
    });
})

app.get('/isDonorAccepted/:email',(req,res)=>{
    donor.findOne({ email: req.params.email }, (err, mydonor) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false,errorCode : 0 });
        } else if (mydonor) {
            res.json({ resp: true });
        } else {
            donorRequest.findOne({ email: req.params.email }, (err, mydonor) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false,errorCode : 0 });
        } else if(mydonor) {
            res.json({ resp : false , error : "still waiting for response from user",errorCode : 2 });
        } else {
            res.json({ error: 'request not found', resp: false,errorCode : 1 });
        }

            });
}
})})

app.get('/isBankAccepted/:email',(req,res)=>{
    bloodBank.findOne({ email: req.params.email }, (err, bank) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false ,errorCode : 0});
        } else if (bank) {
            res.json({ resp: true });
        } else {
            bloodBankRequest.findOne({ email: req.params.email }, (err, bank) => {
        if (err) {
            res.json({ error: 'server error!!', resp: false ,errorCode : 0 });
        } else if(bank) {
            res.json({ resp : false , error : "still waiting for response from user" ,errorCode : 2 });
        } else {
            res.json({ error: 'request not found', resp: false ,errorCode : 1});
        }

            })
}
})
})

app.get('/requireBlood/:email/:group',(req,res)=>{
    var email = req.params.email;
    var group = req.params.group;
    bloodBank.findOne({email : email},(err,bank)=>{
        if(err) {
            res.json({resp : false , error : 'server error!!'});
        } else {
            fcm(` ${group} Blood required`,{ name : bank.name ,
                                            longitude : ""+bank.longitude ,
                                            latitude : ""+bank.latitude ,
                                            phoneNo : ""+bank.phoneNo ,
                                            email : email },email,res);
        }

    })
})

app.get('/subscribeMe/:log/:lat',(req,res)=>{
    var longitude = parseFloat(req.params.log);
    var latitude = parseFloat(req.params.lat);
    bank.findOne({})
    .where('longitude').gt(longitude - 0.5).lt(longitude + 0.5)
    .where('latitude').gt(latitude - 0.5).lt(latitude + 0.5)
    .exec((err,resp)=>{
        if(err){
            res.json({resp:false, error : 'server error!!'});
        } else {
            res.json({resp : true,data : resp});
        }
    })

})
module.exports = app;