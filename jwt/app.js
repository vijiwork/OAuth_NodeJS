const express=require('express');
const cors=require('cors');
const path=require('path');
const config=require('./config');
const dotenv=require('dotenv');
const userModel=require('./model/user-model');
const jwt=require('jsonwebtoken');
dotenv.config();

const app=express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());



app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

  var routes = require('./route/user-route');
  routes(app);

app.use(function(req, res) {
 res.status(404);
});

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')} `);
})

