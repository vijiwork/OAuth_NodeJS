const router=require('express').Router();

function isLoggedIn(req, res, next) {
    // passport adds this to the req object
    if (req.isAuthenticated()) {
        return next();
    }
    else{
      res.render('login');
    }
}

router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile');
});

module.exports=router;