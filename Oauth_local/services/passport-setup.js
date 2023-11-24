const passport=require('passport');
const LocalStrategy = require('passport-local');
const User=require('../model/user-model');

const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
