const express=require('express');
const router=express.Router();

const authCheck=(req,res,next)=>{
    if(!req.user){
        res.redirect('login.html');
    }
    else{
        next();
    }
}

router.get('/',authCheck,(req,res)=>{
   // res.send(`Welcome ${req.user.username},this is your home page`);
    res.render('profile',{user:req.user});
});

module.exports=router;