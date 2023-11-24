const mongoStore=require('connect-mongo');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.CONNECTION_STRING;


mongoose.set('strictQuery', false);
 async function connect() {

  await mongoose.connect(uri);
    const db = mongoose.connection;
    // console.log(db.client.s.url);
 }


module.exports=connect();