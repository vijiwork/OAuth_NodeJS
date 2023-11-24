const express=require('express');
const passport = require('passport');
const router=express.Router();
const userModel=require('../model/user-model');

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login-failure', 
    successRedirect: '/auth/login-success'
  }), (err, req, res, next) => {
    if (err) next(err);
  });
  
  router.get('/login-failure', (req, res, next) => {
    res.send('Login Attempt Failed.');
  });
  
  router.get('/login-success', (req, res, next) => {
    res.render('dashboard',{user: req.session.passport.user});
  });

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/signup', (req, res) => {
 //   Creates and saves a new user with a salt and hashed password
    userModel.register(new userModel({username: req.body.username,email:req.body.email}), req.body.password, function(err, user) {
        if (err) {
            return res.render('register');
        } else {
            res.render('login');
            // passport.authenticate('local')(req, res, function() {
            //     res.redirect('/dashboard');
            // });
        }
    });
    
});

function isLoggedIn(req, res, next) {
    // passport adds this to the req object
    if (req.isAuthenticated()) {
        return next();
    }
    else{
      res.render('login');
    }
}

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

router.post('/logout', (req, res, next) =>{
  req.logout((err) =>{
    if (err) { 
      return next(err); 
    }
    else{
      res.render('login');
    }
   
  });
});


module.exports = router;