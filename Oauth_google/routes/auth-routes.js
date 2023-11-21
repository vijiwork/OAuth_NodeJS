const express=require('express');
const router = express.Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login.html');
});

//auth logout
router.get('/logout',(req,res)=>{
   //handle with passport
   //res.send('logging out'); 
   req.logOut();
   res.redirect('/index.html');
});


//auth with google auth

router.get('/google',passport.authenticate('google',{
    //handle with passport
    scope:['profile']
    })
);

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;
