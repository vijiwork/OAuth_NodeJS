const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dotenv = require('dotenv');
const User=require('../model/user-model');
dotenv.config();

//used to create cookie with client id
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//decrypt the cookie and get user data
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL:'/auth/google/redirect',
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //check user is already exist or not
        User.findOne({googleid:profile.id}).then((currentUser)=>{
            if(currentUser){
                //User already exists 
                console.log('User already exists');
                done(null,currentUser);
            }
            else{
                //create new user
                new User({username:profile.displayName,
                    googleid:profile.id})
                    .save().then((newUser)=>{
                        console.log('New user created' +newUser);
                        done(null,newUser);
                })
            }
        })
        
    })
);