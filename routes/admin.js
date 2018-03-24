
function requireLogin (req, res, next) {
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
var bloodBank = require('../models/bloodBank');

app.get('/',requireLogin,(req,res)=>{
	donorRequest.find({},{_id : 0}).limit(20).exec((err,resp)=>{
        if(err){
            res.json({resp:false, error : 'server error'});
        } else {
        	console.log(resp);
        	res.render('admin',{users : resp});
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
app.get('/profile/:id',(req,res)=>{
	res.render('profile');
});


app.post('/login',function(req,res){
    adminLogin.findOne({username : req.body.username },function (err,obj)
    {

        if(err){
            res.json({resp:false, error : 'server error'});
        }
        if(obj ) {

        	if(obj.password === req.body.password){
        		req.session_state.user = obj;
        		res.json({resp:true});
        	}
            else {
            	res.json({resp:false, error : 'password do not match'});
            }


    }
    else {
    	res.json({resp:false, error : 'user name does not exists'});
    }
    });
/*(new adminLogin({username : 'anubhav' , password : 'anubhav'})).save((err,a)=>{
	console.log(err||a)
});*/
});
app.get('/getDonorsRequest',(req,res)=>{
	donorRequest.find({},{_id : 0}).limit(20).exec((err,resp)=>{
        if(err){
            res.json({resp:false, error : 'server error'});
        } else {
        	res.json(resp);
        }
	})
});
app.get('/getBloodBankRequest',(req,res)=>{
	bloodBankRequest.find({},{_id : 0}).limit(20).exec((err,resp)=>{
        if(err){
            res.json({resp:false, error : 'server error'});
        } else {
        	res.json(resp);
        }
	})
})

module.exports = app;
	