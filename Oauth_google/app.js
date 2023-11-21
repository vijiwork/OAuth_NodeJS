const express=require('express');
const cors=require('cors');
const path=require('path');
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./services/passport-setup');
const dotenv=require('dotenv');
const db=require('./config/mongodb');
const cookieSession=require('cookie-session');
const passport=require('passport');
const profileRoutes=require('./routes/profile-routes');
dotenv.config();

const app=express();

app.set('port',process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 1000 * 24 * 60 * 60,
    keys: [process.env.COOKIE_SECRET_KEY]
}));

//initilaize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.listen(app.get('port'),()=>{
    console.log(`Server listening on Port ${app.get('port')}`);
});
