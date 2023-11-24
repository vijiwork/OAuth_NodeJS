const express=require('express');
const session=require('express-session');
const cors=require('cors');
const path=require('path');
const dotenv=require('dotenv');
const mongoDb=require('./config');
const mongoStore=require('connect-mongo');
const passport=require('passport');
const passportSetup=require('./services/passport-setup');
const authRoute=require('./routes/auth-routes');
const appRoute=require('./routes/profile_routes');
const { truncate } = require('fs');
dotenv.config();

const app=express();

app.set('port',process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:true,
    store: new mongoStore({ mongoUrl: process.env.CONNECTION_STRING}),
    cookie: {
        httpOnly: true,
        maxAge: 1*60*60*1000
      }
}))

app.use((req, res, next) =>{
    if(req.session.passport){
        res.locals.user = req.session.passport.user;
        next();
    }
    else{
        next();
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoute);
app.use('/api',appRoute);

app.get('/', function(req, res) {
    res.render('login');
});

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

