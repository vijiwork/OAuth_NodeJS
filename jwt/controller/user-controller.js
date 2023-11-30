const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel=require('../model/user-model');
const jwt=require('jsonwebtoken');
const auth_config=require('../config/auth_config');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, auth_config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

exports.register =async function(req, res) {
    var newUser = new userModel(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    try{
   let resp= await newUser.save();
   resp.hash_password = undefined;
    return res.json(resp);
} catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
  };
  
  exports.sign_in = async function(req, res) {
    try {
        let resp= await userModel.findOne({email: req.body.email});
        const matchedPassword = await bcrypt.compare(req.body.password, resp.hash_password );
        console.log(matchedPassword);
        if (!matchedPassword) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
          return res.json({ token: jwt.sign({ email: resp.email, fullname: resp.fullname, _id: resp._id }, 'RESTFULAPIs') });
    }
    catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
  };

exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
  };
  exports.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
  };